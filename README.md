# Portfolio v3 - Adam Planque

Portfolio personnel moderne et animé construit avec Express.js, EJS et Vanilla JavaScript.

## 🚀 Fonctionnalités

- ✨ Design moderne avec glassmorphism
- 🌓 Mode sombre / clair
- 🌍 Multi-langue (Français / Anglais)
- 🎨 Animations fluides (parallax, fade-in, hover effects)
- 📱 Responsive design
- 💌 Formulaire de contact avec envoi d'email
- 📄 Téléchargement de CV
- 🎭 Cursor personnalisé
- ⚡ Particules animées en background
- 📊 Google Analytics (optionnel)
- 🐳 Docker ready

## 🛠️ Technologies

- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **CSS**: CSS moderne avec variables
- **JavaScript**: Vanilla JS (ES6+)
- **Email**: Nodemailer
- **Sécurité**: Helmet
- **Validation**: Express-validator

## 📦 Installation

### Prérequis

- Node.js 18+ 
- npm ou yarn
- (Optionnel) Docker

### Installation locale

\`\`\`bash
# Cloner le repo
git clone <votre-repo>
cd portfolio-v3

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Configurer les variables d'environnement dans .env
# (voir section Configuration)

# Lancer en mode développement
npm run dev

# Lancer en mode production
npm start
\`\`\`

L'application sera accessible sur `http://localhost:3000`

### Installation avec Docker

\`\`\`bash
# Build l'image
npm run docker:build

# Ou utiliser docker-compose
docker-compose up -d
\`\`\`

## ⚙️ Configuration

Créer un fichier `.env` à la racine du projet :

\`\`\`env
# Serveur
PORT=3000
NODE_ENV=development

# Email (pour le formulaire de contact)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=votre-email@gmail.com
EMAIL_PASS=votre-mot-de-passe-app
EMAIL_TO=votre-email@gmail.com

# Analytics (optionnel)
GOOGLE_ANALYTICS_ID=UA-XXXXXXXXX-X
\`\`\`

### Configuration Gmail

Pour utiliser Gmail pour l'envoi d'emails :

1. Activer la validation en 2 étapes
2. Générer un mot de passe d'application
3. Utiliser ce mot de passe dans `EMAIL_PASS`

## 📁 Structure du projet

\`\`\`
portfolio-v3/
├── config/              # Configuration (données du portfolio)
├── locales/             # Traductions (FR/EN)
├── public/              # Fichiers statiques
│   ├── css/            # Styles
│   ├── js/             # Scripts
│   ├── images/         # Images
│   └── files/          # Fichiers (CV, etc.)
├── routes/              # Routes Express
├── views/               # Templates EJS
│   ├── partials/       # Composants réutilisables
│   ├── home.ejs
│   ├── about.ejs
│   ├── projects.ejs
│   └── ...
├── server.js            # Point d'entrée
├── package.json
├── Dockerfile
└── docker-compose.yml
\`\`\`

## 🎨 Personnalisation

### Modifier vos informations

Éditez `config/portfolio.json` pour personnaliser :

- Informations personnelles
- Compétences
- Projets
- Expériences
- Formation

### Modifier les couleurs

Éditez les variables CSS dans `public/css/main.css` :

\`\`\`css
:root {
  --color-violet: #8B5CF6;
  --color-blue: #3B82F6;
  /* ... autres couleurs */
}
\`\`\`

### Ajouter des images

Placez vos images dans :

- `public/images/profile.jpg` - Photo de profil
- `public/images/projects/` - Screenshots de projets
- `public/files/CV_Adam_Planque.pdf` - Votre CV

## 🚀 Déploiement

### Sur un VPS avec Docker

\`\`\`bash
# Sur votre serveur
git clone <votre-repo>
cd portfolio-v3
cp .env.example .env
# Éditer .env avec vos configurations

docker-compose up -d
\`\`\`

### Configuration Nginx (reverse proxy)

\`\`\`nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

## 📝 Scripts disponibles

- `npm start` - Lancer en production
- `npm run dev` - Lancer en développement avec nodemon
- `npm run docker:build` - Build l'image Docker
- `npm run docker:run` - Lancer le container Docker

## 🎯 TODO

- [ ] Ajouter la section Blog
- [ ] Implémenter un CMS pour les projets
- [ ] Ajouter des tests
- [ ] Optimiser les performances
- [ ] Ajouter PWA support

## 📄 Licence

MIT

## 👤 Auteur

**Adam Planque (SaumonDeLuxe)**

- GitHub: [@shadowforce78](https://github.com/shadowforce78)
- LinkedIn: [Adam Planque](https://www.linkedin.com/in/adam-planque)

---

Fait avec ❤️ et beaucoup de ☕
\`\`\`
