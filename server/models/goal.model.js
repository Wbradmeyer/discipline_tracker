const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
    header: {
        type: String,
        required: [true, 'Please give your goal a header.'],
        minlength: [3, 'Header must be at least 3 characters.']
    },
    intent: {
        type: String,
        required: [true, 'Please provide an intent statement.'],
        maxlength: [255, 'Intent cannot exceed 255 characters.']
    }},
    {timestamps: true}
)

module.exports = mongoose.model('Goal', GoalSchema)