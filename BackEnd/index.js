// backend/index.js

const express = require('express');         // Importe le framework Express
const cors = require('cors');               // Importe le middleware CORS
require('dotenv').config();                 // Charge les variables d’environnement
const prisma = require('./prismaClient');   // 🔥 on importe Prisma ici

const app = express();                 // Crée une application Express
const PORT = process.env.PORT || 5000; // Détermine le port d’écoute

app.use(cors());                       // Active CORS pour les requêtes cross-origin
app.use(express.json());               // Permet de lire automatiquement le JSON des requêtes (Middleware)

// route de test
app.get('/', (req, res) => {
    res.send("FocusTime API is running 🎯");
})

// 🔽 Nouvelle route POST
app.post('/sessions', async (req, res) => {
    try {
      const { userId, tag, duration } = req.body; // Permet de réccupérer les paramètres envoyer en POST
  
      // Validation rapide
      if (!userId || !tag || !duration) {
        return res.status(400).json({ error: 'Missing required fields.' });
      }
  
      const newSession = await prisma.session.create({ // Envoi d'une requête d'insertion d'une nouvelle ligne dans la table Session et attente de la fin d'opération
        data: {
          userId,
          tag,
          duration
        }
      });
  
      res.status(201).json(newSession); // L'opération a été réalisée avec Succès
    } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Nouvelle route GET
  app.get('/sessions', async (req, res) => {
    try {
      const sessions = await prisma.session.findMany();
      res.status(200).json(sessions);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

