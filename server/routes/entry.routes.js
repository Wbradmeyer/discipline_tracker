const EntryController = require('../controllers/entry.controller')

module.exports = (app) => {
    app.get('/api/entries', EntryController.getAllEntries)
    app.post('/api/entries/create', EntryController.createEntry)
    app.get('/api/entries/getOne/:id', EntryController.getOneEntry)
    app.patch('/api/entries/update/:id', EntryController.updateEntry)
    app.delete('/api/entries/delete/:id', EntryController.deleteEntry)
}