const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware 
app.use(cors());
app.use(express.json());

// Routes 
app.get("/", (req, res) => {
    res.json({message: "Hello from backend !"});
})

// lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`);
})