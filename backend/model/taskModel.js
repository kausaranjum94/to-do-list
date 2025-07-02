const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required:  true,
    },
    completed: {
        type: String,
        required: true,
        default :  false,
    },
    createdAt : {
        type: Date,
        default :  Date.now,
        immutable: true
    } 
})

const Task = mongoose.model('Task', taskSchema );

module.exports = Task;