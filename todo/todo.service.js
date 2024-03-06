
const todoController = require('./todo.controller');
const usersController = require('../users/users.controller');

async function gettodoByUser(id) {
    try {
        const user = await usersController.getUserById(id);
        const todo = await todoController.getAlltodo();
        const usertodo = todo.filter(todo => todo.user.toString() === user._id.toString());
        if (!usertodo) {
            return;
        }
        // console.log("usertodo", usertodo);
        return usertodo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// gettodoByUser("65e726f80da8d3f2276aa797")
async function getOnetodo(id) {
    try {
        const todo = await todoController.getUserById(id);
        return todo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function create(data) {
    try {
        const user = await usersController.getUserById(data.user);
        if (!user) {
            throw error = new Error('no user')
        }
        if (!data.todo) {
            throw error = new Error('no todo')
        }
        const todo = await todoController.createtodo(data);
        user.todo.unshift(todo._id);
        await user.save();
        return todo;
    } catch (error) {
        console.log(error);
        return error;
    }
}


async function update(id, data) {
    try {
        const user = await usersController.getUserById(data.user);
        user.todo.filter(todo => todo.toString() !== id.toString());
        const todo = await todoController.updatetodo(id, data);
        user.todo.push(todo._id);
        await user.save();
        return todo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function deltodo(id) {
    try {
        const todoToDelete = await todoController.gettodoById(id);
        const user = await usersController.getUserById(todoToDelete.user);

        console.log("user before deletion", user);

        // Use filter to create a new array without the todo to delete
        user.todo = user.todo.filter(todo => todo.toString() !== id.toString());

        console.log("user after deletion", user);

        const deletedtodo = await todoController.deletetodo(id);
        await user.save();

        return deletedtodo;
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = { gettodoByUser, getOnetodo, create, update, deltodo };