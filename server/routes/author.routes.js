const AuthorController = require('../controllers/author.controller')

module.exports = (app) => {
    app.post('/api/author', AuthorController.createOne)
    app.get('/api/author', AuthorController.getAll)
    app.get('/api/author/:id', AuthorController.getOne)
    app.put('/api/author/update/:id', AuthorController.updateOne)
    app.delete('/api/author/delete/:id', AuthorController.deleteOne)
}