const todoModel  = require('./todo.model');

async function getAlltodo() {
    return await todoModel.find({});
}

async function gettodoById(id) {
    return await todoModel.findById(id);
}

async function createtodo(todo) {
    return await todoModel.create(todo);
}

async function updatetodo(id, todo) {
    return await todoModel.findByIdAndUpdate(id, todo, { new: true });
}

async function deletetodo(id) {
    return await todoModel.findByIdAndDelete(id);
}

module.exports = { getAlltodo, gettodoById, createtodo, updatetodo, deletetodo };