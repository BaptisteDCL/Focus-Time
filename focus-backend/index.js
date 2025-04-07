const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware 
app.use(cors());
app.use(express.json());

let sessions = [];
let nextId = 1;

// Routes 
app.get("/", (req, res) => {
    res.json({message: "Hello from backend !"});
})

app.post("/sessions", (req,res) => {
    const {userId, tag, duration} = req.body;

    // Verification des données
    if (!userId || !tag || !duration){
        return res.status(400).json({error : "Missing argument of the querry"});
    }

    // Creation de la session
    const newSession = {
        id: nextId++,
        userId,
        tag,
        duration,
        createdAt: new Date().toISOString()
    };

    sessions.push(newSession);
    res.status(201).json(newSession);
})

app.get("/sessions", (req, res) =>{
    const userId = req.query.userId;

    // Vérification des données
    if (!userId){
        return res.json(sessions);
    }
    else{
        const filtered = sessions.filter((s) => s.userid == userId);
        return res.json(filtered);
    }
})

// lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port : ${PORT}`);
})