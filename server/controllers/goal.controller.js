const Goal = require('../models/goal.model')

module.exports = {
    getAllGoals: (req, res) => {
        Goal.find({})
            .then((goal) => {
                res.status(200).json(goal)
            })
            .catch((err) => {
                res.status(500).json({ message: 'Error in find all',
                error: err })
            })
    },

    createGoal: (req, res) => {
        Goal.create(req.body)
            .then(newGoal => res.status(200).json({ note: newGoal }))
            .catch(err => res.status(500).json({ message: 'Error in create', error: err }));
    },

    getOneGoal: (req, res) => {
        Goal.findOne({_id:req.params.id})
            .then(thisGoal => res.status(200).json(thisGoal))
            .catch(err => res.status(500).json({ message: 'Error in find one', error: err }));
    },

    updateGoal: (req, res) => {
        Goal.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators: true})
            .then(updated => res.status(200).json(updated))
            .catch(err => res.status(500).json({ message: 'Error in update', error: err }))
    },

    deleteGoal: (req, res) => {
        Goal.deleteOne({_id:req.params.id})
            .then(deleted => res.status(200).json(deleted))
            .catch(err => res.status(500).json({ message: 'Error in delete', error: err }))
    }
}