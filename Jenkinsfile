pipeline {
    agent any

    // QA release flag: check "Deploy to QA" (or SCM-trigger default) to deploy the
    // freshly built image to the homelab Docker host.
    parameters {
        booleanParam(
            name: 'DEPLOY_QA',
            defaultValue: true,
            description: 'Deploy the built image to the homelab Docker host (QA). Uncheck to only build/test.'
        )
    }

    environment {
        APP_NAME = 'openmcbo-frontend'
        DEPLOY_ENV = 'qa'
        REPO_URL = 'git@github.com:ErwinJV/openmcbo-frontend.git'
        REPO_CREDS_ID = 'github-private-repo-ssh'     // SSH key credential in Jenkins
        ENV_FILE_CREDS_ID = '.envclient'  // Secret file credential with .env contents
        COMPOSE_FILE = 'docker-compose.qa.yml'
        IMAGE_NAME = "${APP_NAME}:${DEPLOY_ENV}"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
        disableConcurrentBuilds()
    }

    // Poll SCM every 5 minutes for new commits on qa-branch.
    // GitHub webhook can be added later for instant builds.
    triggers {
        pollSCM('H/5 * * * *')
    }

    stages {
        // ---------- 1. SOURCE ----------
        stage('Checkout') {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: '*/qa-branch']],
                        extensions: [[$class: 'CleanBeforeCheckout']],
                        userRemoteConfigs: [[url: "${REPO_URL}", credentialsId: "${REPO_CREDS_ID}"]]
                    ])
                    env.GIT_COMMIT_8 = env.GIT_COMMIT.take(8)
                    echo "Building qa-branch commit: ${GIT_COMMIT_8}"
                }
            }
        }

        // ---------- 2. PREPARE ENVIRONMENT ----------
        stage('Prepare Environment') {
            steps {
                script {
                    echo 'Injecting environment secrets...'
                    withCredentials([file(credentialsId: "${ENV_FILE_CREDS_ID}", variable: 'ENV_FILE')]) {
                        sh 'cp "$ENV_FILE" .env'
                        // Show loaded variables WITHOUT secrets
                        sh 'grep -ivE "PASSWORD|SECRET|KEY|TOKEN|DATABASE_URL|ENDPOINT" .env || true'
                    }
                }
            }
        }

        // ---------- 3. CI: INSTALL & TEST (inside node container) ----------
        stage('Install & Test') {
            steps {
                script {
                    // Run CI inside a node:22-alpine container so the agent does not
                    // need Node.js preinstalled. Failures are non-fatal (|| true).
                    docker.image('node:22-alpine').inside('-u 0') {
                        sh 'yarn install --frozen-lockfile || true'
                        sh 'yarn build || true'
                        sh 'yarn lint || true'
                        sh 'yarn test || true'
                    }
                }
            }
            post {
                always {
                    junit testResults: '**/junit.xml', allowEmptyResults: true
                    publishHTML(target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir: 'coverage/lcov-report',
                        reportFiles: 'index.html',
                        reportName: 'Coverage Report'
                    ])
                }
            }
        }

        // ---------- 4. BUILD DOCKER IMAGE ----------
        stage('Build Docker Image') {
            steps {
                script {
                    // GIT_COMMIT_8 is set at checkout, so compute the versioned tag here
                    env.DOCKER_IMAGE = "${APP_NAME}:${DEPLOY_ENV}-${BUILD_NUMBER}-${GIT_COMMIT_8}"
                    echo "Building Docker image: ${DOCKER_IMAGE}"
                    sh """
                        docker build -f Dockerfile \
                            -t ${DOCKER_IMAGE} \
                            -t ${IMAGE_NAME} \
                            --build-arg NEXT_PUBLIC_GRAPHQL_ENDPOINT="\$(grep -E '^NEXT_PUBLIC_GRAPHQL_ENDPOINT=' .env | head -1 | cut -d= -f2- | tr -d '\"')" \
                            --build-arg NEXT_PUBLIC_API="\$(grep -E '^NEXT_PUBLIC_API=' .env | head -1 | cut -d= -f2- | tr -d '\"')" \
                            --label 'built-by=jenkins' \
                            --label 'build-number=${BUILD_NUMBER}' \
                            --label 'git-commit=${GIT_COMMIT_8}' \
                            .
                    """
                }
            }
        }

        // ---------- 5. DEPLOY TO HOMELAB DOCKER (QA release) ----------
        stage('Deploy to Homelab (QA)') {
            when { expression { return params.DEPLOY_QA } }
            steps {
                script {
                    echo 'Deploying to homelab Docker (QA)...'
                    // IMAGE_NAME (openmcbo-frontend:qa) was tagged in the build stage, so
                    // 'docker compose up -d' reuses it (no rebuild).
                    sh """
                        export COMPOSE_PROJECT_NAME=${APP_NAME}-${DEPLOY_ENV}
                        docker compose -f ${COMPOSE_FILE} down || true
                        docker compose -f ${COMPOSE_FILE} up -d
                        docker image prune -f || true
                    """

                    sleep(time: 10, unit: 'SECONDS')

                    echo 'Running health check...'
                    sh '''
                        CONTAINER=${APP_NAME}-${DEPLOY_ENV}
                        echo "Verifying container ${CONTAINER} is running and healthy..."
                        for i in $(seq 1 30); do
                            RUNNING=$(docker inspect -f '{{.State.Running}}' "${CONTAINER}" 2>/dev/null || echo false)
                            HEALTH=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "${CONTAINER}" 2>/dev/null || echo none)
                            echo "attempt $i: running=$RUNNING health=$HEALTH"
                            if [ "${RUNNING}" != "true" ]; then
                                echo "ERROR: container ${CONTAINER} is not running (crash loop?). Failing deploy."
                                docker logs --tail 30 "${CONTAINER}" 2>&1 || true
                                exit 1
                            fi
                            if [ "${HEALTH}" = "healthy" ] || [ "${HEALTH}" = "none" ]; then
                                echo "Container ${CONTAINER} is up."
                                exit 0
                            fi
                            if [ "${HEALTH}" = "unhealthy" ]; then
                                echo "ERROR: container ${CONTAINER} is unhealthy. Failing deploy."
                                docker logs --tail 30 "${CONTAINER}" 2>&1 || true
                                exit 1
                            fi
                            sleep 5
                        done
                        echo "ERROR: container never became healthy. Failing deploy."
                        docker logs --tail 30 "${CONTAINER}" 2>&1 || true
                        exit 1
                    '''
                }
            }
        }
    }

    // ---------- POST-BUILD ----------
    post {
        always {
            script { echo 'Pipeline finished.' }
        }
        success {
            script {
                echo "Deployment successful: ${DOCKER_IMAGE ?: IMAGE_NAME} (DEPLOY_QA=${params.DEPLOY_QA})"
                // Optional email notification (email-ext plugin). Configure SMTP in
                // Jenkins first, then uncomment:
                // emailext(
                //     subject: "[Jenkins] ${APP_NAME} QA Deploy OK - Build #${BUILD_NUMBER}",
                //     body: "Build #${BUILD_NUMBER} (${GIT_COMMIT_8}) deployed to ${DEPLOY_ENV}.",
                //     to: 'you@example.com',
                //     mimeType: 'text/html'
                // )
            }
        }
        failure {
            script {
                echo "Deployment FAILED: ${DOCKER_IMAGE ?: IMAGE_NAME} - check console log"
            }
        }
    }
}
