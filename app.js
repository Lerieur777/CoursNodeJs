require('dotenv').config({path: `./config/${process.env.NODE_ENV}.env`});
const express = require("express"); // import la librairie express qu'on a installée au préalable
const app = express(); 
app.use(express.json()); // permet de parcer(analyser) toutes les requêtes en json

// route d'accueil
app.get('/api', ( _ , res) => {
    res.status(200).json({ success: "Todos API v1"});
})

const todosRoute = require('./routes/todos'); // import ce qui est exporter dans le todos
app.use('/api',todosRoute); // rajoute sur le chemin un router supplémentaire et un préfixe /api avant /todosRoute

// --------------- LAUNCH SERVER -------------------------- //
const PORT = process.env.PORT; // definis le port d ecoute
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
//midleware = plugin, fonctionnalitées qu'on va pluguer, introduit avec la méthode USE