# Usa Node.js 22.12
FROM node:22.12-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias (incluyendo yarn.lock si existe)
COPY package*.json ./
COPY yarn.lock ./

# Instala las dependencias usando Yarn
RUN yarn install --frozen-lockfile

# Copia el resto del código
COPY . .

# Construye la aplicación Next.js
RUN yarn build

# Expone el puerto (Next.js usa 3000 por defecto)
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]
