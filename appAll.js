
// () pour les paramètres
// {} pour un bloc, objet
// [] pour les tableaux


const express = require('express'); // import de express

const {getAllTodos} = require('./controllers/todos'); // on choisit d'importer que l'élément getAllTodos

console.log(getAllTodos);
// import express from 'express'; ancienne façon de faire

//Base de données--------------------------------------------------------------------------------------


 const todos = [
     {id: 1, texte: "première tache"},
     {id: 2, texte: "seconde tache"},
     {id: 3, texte: "troisième tache"}
 ]

 const insertTodo = (todo) => {
     todos.push(todo);
 }

 const deleteTodo = (id) => {
     todos.forEach((element, index) => {
         if (id == element.id) {
             todos.splice(index, 1)
         }
     })
 }

 const updateTodo = (id, texte) => {
     todos.forEach(element,todo => {
         if (todo.id == id) {
             todos[index].texte = texte;
         }
     })
 }

// Serveur express-------------------------------------------------------------------------------------


const app = express();

app.use(express.json()); // middleware qui va parser le body (lire/traduire le format) en tant que Json

app.get('/', (_,res) => {
     res.status(200).json({ sucess: "Bonjour, vous êtes sur l'API d'entrainement!", todos: todos});
 }); // get = récuperer une info

 app.get('/bonjour/:prenom', (req, res) => {
     const {prenom} = req.params;
     // const prenom = req.params.prenom;
     res.status(200).json({ success:`Bonjour ${prenom}`}); // 200 est le numéro de success
 });

 app.post('/inscription', (req, res) => {
     const {username, email, password, password_repeat} = req.body;


     if (password !== password_repeat) {
         return res.status(400).json({error:`Les mots de passes ne correspondent pas.`}) // 400 est le numéro d'erreur
     }

     // appelle la procédure CALL insertUser(username, email , SHA(password)); par exemple

     return res.status(200).json({ success: `${username} a bien été inscrit !`});
 });

 app.post('/insertion', (req, res) => {
     const { id, texte } = req.body;

     insertTodo({ id, texte });

     return res.status(200).json({ success: "La todo a bien été ajoutée", todos : todos });
 });

 app.delete('/supprimer', (req, res) => {
     const {id} = req.body;

    deleteTodo(id);

     return res.status(200).json({ success: `La todo a bien été supprimée`, todos : todos});
});

app.put('/update', (req, res) => {
     const {id, texte} = req.body;

     updateTodo(id, texte);

     return res.status(200).json({ success: `La todo a bien été mise à jour`, todos : todos});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});