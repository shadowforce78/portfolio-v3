const express = require('express');
const router = express.Router();
const path = require('path');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

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

// Traitement du formulaire de contact
router.post('/contact', [
  body('name').trim().notEmpty().withMessage('Le nom est requis'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('subject').trim().notEmpty().withMessage('Le sujet est requis'),
  body('message').trim().notEmpty().withMessage('Le message est requis')
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    // Configuration du transporteur email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Envoi de l'email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <h2>Nouveau message depuis le portfolio</h2>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    res.json({ success: true, message: 'Message envoyé avec succès!' });
  } catch (error) {
    console.error('Erreur envoi email:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi du message' 
    });
  }
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
