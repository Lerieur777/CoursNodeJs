// c un objet qui contient des fonctions


const todos = [
    {id: 1, texte: "première tache"},
    {id: 2, texte: "seconde tache"},
    {id: 3, texte: "troisième tache"}
]

const pool = require('../config/database');

module.exports = {
    getAllTodos: ( req, res) => { // exporte et affiche les todos 
        res.status(200).json({ success: todos}); // affiche en cas de succès l'objet avec les todos 
    },
    getTodoById: (req,res) => { // route parametre,
        const {id} = req.params; // recupere l'id dans l'url
        
        const result = todos.filter(todo => id == todo.id); // todo est un nom qu'on choisit et qui correspond a chaque éléments du tableau
        return res.status(200).json({ success: result[0]}); // renvoie le resultat en fonction du num d'index
    
    },
    deleteTodoById: (req, res) => {
        const {id} = req.params;
        const index = todos.findIndex(todo => id == todo.id); // parcours tout le tableau et renvoie en fonction de l'index 

        todos.splice(index, 1);
        return res.status(200).json({ success: todos});
    },
    updateTodoById: (req,res) => {
        const {id} = req.params;
        const {texte} = req.body;
 
        const index =todos.findIndex(todo => id == todo.id); // l'élément todo dans le tableau qui correspond a l'id url choisi égal à l'id du tableau
        todos[index].texte = texte;
        res.status(200).json({success: todos});
    },
    test: async (req,res) => { // async car on utilise getConnection est une fonction asynchrone elle met du temps à se connecter
        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = connexion.query('SELECT * FROM todo;');
            console.log(result);
            return res.status(200).json({success: result});
        } catch (error) {
            console.log(error);
            return res.status(400).json({error: error.message});
        } finally {
            if (connexion) connexion.end();
        }
    } 
};
