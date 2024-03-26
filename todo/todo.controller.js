const { get } = require('mongoose');
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

async function getCategories(userId) {
    const cat =  await todoModel.find({user: userId}).distinct('category');
    const shareWithMe = await todoModel.find({ sharedWith: userId }).distinct('category');
    // console.log(cat);
    return cat.concat(shareWithMe);
}

async function getTodoByUserAndCategory(userId, category) {
    try {
        const todo = await todoModel.aggregate([
            { $match: { user: userId, category: category } }
        ]);
        // console.log(todo);
        return todo;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// getTodoByUserAndCategory("660115e6fc28d3e1ced32a6d", "General");

module.exports = { getAlltodo, gettodoById, createtodo, updatetodo, deletetodo, getCategories };