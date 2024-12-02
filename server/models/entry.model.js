const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    date: {
        type: Date
    },
    dayOfWeek: {
        type: Array
    },
    completed: {
        type: Boolean
    },
    description: {
        type: String,
        maxlength: [255, "Description can't exceed 255 characters."]
    },
    goalId: {
        type: String
    }},
    {timestamps: true}
)

module.exports = mongoose.model('Entry', EntrySchema)