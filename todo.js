const express = require('express');

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

app.use(express.json());

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



app.listen(3000);