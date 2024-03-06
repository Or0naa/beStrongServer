
const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    todo: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    isDone:{type:Boolean, default: false}
});

const todoModel = mongoose.model('todo', todoSchema);

module.exports = todoModel;