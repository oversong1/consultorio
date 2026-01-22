FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Expõe a porta que o seu Express usa
EXPOSE 3333

# O comando de inicialização será controlado pelo docker-compose
CMD ["npm", "run", "dev"]