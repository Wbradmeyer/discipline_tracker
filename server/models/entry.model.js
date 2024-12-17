const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "Please select a date."]
    },
    dayOfWeek: {
        type: Number
    },
    completed: {
        type: Boolean
    },
    description: {
        type: String,
        maxlength: [255, "Description can't exceed 255 characters."]
    },
    goalId: {
        type: String,
        required: [true, "Please select a goal to assign this entry to."]
    },
    color: {
        type: String
    }},
    {timestamps: true}
)

module.exports = mongoose.model('Entry', EntrySchema)