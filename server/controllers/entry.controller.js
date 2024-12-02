const Entry = require('../models/entry.model')

module.exports = {
    getAllEntries: (req, res) => {
        Entry.find({})
            .then((entry) => {
                res.status(200).json(entry)
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error in find all',
                error: err })
            })
    },

    createEntry: (req, res) => {
        Entry.create(req.body)
            .then(newEntry => res.status(200).json({ note: newEntry }))
            .catch(err => res.status(500).json({ message: 'Error in create', error: err }));
    },

    getOneEntry: (req, res) => {
        Entry.findOne({_id:req.params.id})
            .then(thisEntry => res.status(200).json(thisEntry))
            .catch(err => res.status(500).json({ message: 'Error in find one', error: err }));
    },

    updateEntry: (req, res) => {
        Entry.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators: true})
            .then(updated => res.status(200).json(updated))
            .catch(err => res.status(500).json({ message: 'Error in update', error: err }))
    },

    deleteEntry: (req, res) => {
        Entry.deleteOne({_id:req.params.id})
            .then(deleted => res.status(200).json(deleted))
            .catch(err => res.status(500).json({ message: 'Error in delete', error: err }))
    }
}