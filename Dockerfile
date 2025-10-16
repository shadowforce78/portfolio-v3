FROM node:18-alpine

WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm ci --only=production

# Copier le reste de l'application
COPY . .

# Créer les dossiers nécessaires
RUN mkdir -p public/images public/files

# Exposer le port
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV PORT=3000

# Démarrer l'application
CMD ["node", "server.js"]
