const router = require('express-promise-router')(); // import la librairie express-promise-router qui est un router spéciale qui utilise des fonctions asynchrones

const {getAllTodos, deleteTodoById, getTodoById, updateTodoById, test} = require('../controllers/todos'); // on récupère 


router // route avec chemin ouis la méthode et enfin les controllers créés dans le fichier controllers
.route('/todos')
.get(getAllTodos);

router// créé pour agir sur une todo en particulier
.route('/todos/:id') // c'est une route paramétrée, en fonction de son id dans le cas présent
.get(getTodoById)
.delete(deleteTodoById)
.put(updateTodoById);
// la méthode permet de décrire l'action voulu, elle a un rôle descriptif c'est une bonne partique REST

router
.route('/test')
.get(test);

module.exports = router; // on a ajouté des nouvelles routes et on l'exporte dans l'app.js avec ce code