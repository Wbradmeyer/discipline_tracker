const GoalController = require('../controllers/goal.controller')

module.exports = (app) => {
    app.get('/api/goals', GoalController.getAllGoals)
    app.post('/api/goals/create', GoalController.createGoal)
    app.get('/api/goals/getOne/:id', GoalController.getOneGoal)
    app.patch('/api/goals/update/:id', GoalController.updateGoal)
    app.delete('/api/goals/delete/:id', GoalController.deleteGoal)
}