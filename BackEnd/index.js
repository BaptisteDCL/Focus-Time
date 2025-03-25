// backend/index.js

const express = require('express'); // Importe le framework Express
const cors = require('cors');       // Importe le middleware CORS
require('dotenv').config();         // Charge les variables d’environnement

const app = express();                 // Crée une application Express
const PORT = process.env.PORT || 5000; // Détermine le port d’écoute

app.use(cors());                       // Active CORS pour les requêtes cross-origin
app.use(express.json());               // Permet de lire automatiquement le JSON des requêtes

// route de test
app.get('/', (req, res) => {
    res.send("FocusTime API is running 🎯");
})

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});