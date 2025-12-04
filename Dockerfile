FROM node:20-alpine

# Crée un dossier app dans le container
WORKDIR /usr/src/app

# Copie package.json et installe les dépendances
COPY package*.json ./
RUN npm install --production

# Copie ton code
COPY . .

# Expose ton port interne (6969)
EXPOSE 6969

# Commande de démarrage
CMD ["node", "server.js"]
