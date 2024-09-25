# Etapa 1: Build da aplicação
FROM node:18 AS builder

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código da aplicação
COPY . .

# Gerar o código TypeScript (compilação para JavaScript)
RUN npm run build

# Etapa 2: Criação da imagem final
FROM node:18-alpine

# Definir o diretório de trabalho para a imagem final
WORKDIR /app

# Copiar dependências da etapa anterior
COPY --from=builder /app/node_modules ./node_modules

# Copiar o código compilado da aplicação
COPY --from=builder /app/dist ./dist

# Copiar o arquivo .env
COPY --from=builder /app/.env ./.env

# Expor a porta que a aplicação utilizará
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/index.js"]
