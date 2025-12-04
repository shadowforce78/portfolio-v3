const express = require('express');
const router = express.Router();
const path = require('path');


// Page d'accueil
router.get('/', (req, res) => {
  res.render('home', {
    title: res.locals.translations.nav.home,
    page: 'home'
  });
});

// Page À propos
router.get('/about', (req, res) => {
  res.render('about', {
    title: res.locals.translations.nav.about,
    page: 'about'
  });
});

// Page Compétences
router.get('/skills', (req, res) => {
  res.render('skills', {
    title: res.locals.translations.nav.skills,
    page: 'skills'
  });
});

// Page Projets
router.get('/projects', (req, res) => {
  res.render('projects', {
    title: res.locals.translations.nav.projects,
    page: 'projects'
  });
});

// Détail d'un projet
router.get('/projects/:id', (req, res) => {
  const project = res.locals.portfolio.projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.redirect('/projects');
  }
  res.render('project-detail', {
    title: project.title,
    page: 'projects',
    project
  });
});

// Page Expérience
router.get('/experience', (req, res) => {
  res.render('experience', {
    title: res.locals.translations.nav.experience,
    page: 'experience'
  });
});

// Page Formation
router.get('/education', (req, res) => {
  res.render('education', {
    title: res.locals.translations.nav.education,
    page: 'education'
  });
});

// Page Blog (désactivée pour l'instant)
router.get('/blog', (req, res) => {
  res.render('blog', {
    title: res.locals.translations.nav.blog,
    page: 'blog',
    disabled: true
  });
});

// Page Contact
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: res.locals.translations.nav.contact,
    page: 'contact'
  });
});



// Téléchargement du CV
router.get('/download-cv', (req, res) => {
  const file = path.join(__dirname, '../public/files/CV_Adam_Planque.pdf');
  res.download(file, 'CV_Adam_Planque.pdf', (err) => {
    if (err) {
      console.error('Erreur téléchargement CV:', err);
      res.status(404).send('CV non trouvé');
    }
  });
});

// Changement de langue
router.get('/lang/:lang', (req, res) => {
  const lang = req.params.lang;
  if (['fr', 'en'].includes(lang)) {
    res.cookie('lang', lang);
  }
  res.redirect(req.get('referer') || '/');
});

module.exports = router;
