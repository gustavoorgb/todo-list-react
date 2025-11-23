FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código
COPY . .

# Expor a porta do Vite
EXPOSE 5173

# Variável necessária para HMR no WSL2
ENV CHOKIDAR_USEPOLLING=true

# Rodar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev"]
