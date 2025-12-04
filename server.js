require('dotenv').config();
const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 6969;

// Middleware de sécurité
app.use(helmet({
  contentSecurityPolicy: false, // Désactivé pour permettre les styles inline
}));

// Compression des réponses
app.use(compression());

// Configuration du moteur de templates EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware pour parser les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour la langue (par défaut FR)
app.use((req, res, next) => {
  const lang = req.query.lang || req.cookies?.lang || 'fr';
  res.locals.lang = ['fr', 'en'].includes(lang) ? lang : 'fr';
  res.locals.translations = require(`./locales/${res.locals.lang}.json`);
  next();
});

// Middleware pour les données du portfolio
app.use((req, res, next) => {
  res.locals.portfolio = require('./config/portfolio.json');
  next();
});

// Routes
const routes = require('./routes');
app.use('/', routes);

// Route 404
app.use((req, res) => {
  res.status(404).render('404', {
    title: res.locals.translations.errors.notFound || '404 - Page non trouvée'
  });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('500', {
    title: res.locals.translations.errors.serverError || '500 - Erreur serveur',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Portfolio lancé sur http://localhost:${PORT}`);
  console.log(`📝 Environnement: ${process.env.NODE_ENV || 'development'}`);
});
