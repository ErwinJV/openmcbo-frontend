# Usa Node.js 22.12
FROM node:24.10-alpine

# Establece el directorio de trabajo
WORKDIR /app



ENV NEXT_PUBLIC_API="http://localhost:3300"
ENV NEXT_PUBLIC_GRAPHQL_ENDPOINT="http://localhost:3300/graphql"


# Copia los archivos de dependencias (incluyendo yarn.lock si existe)
COPY package*.json ./
# COPY yarn.lock ./
COPY . .

# Instala las dependencias usando Yarn
RUN yarn install 

# Copia el resto del código
COPY . .


# Construye la aplicación Next.js
RUN yarn build

# Expone el puerto (Next.js usa 3000 por defecto)
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]
