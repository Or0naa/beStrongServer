
const todoController = require('./todo.controller');
const usersController = require('../users/users.controller');
const { get } = require('mongoose');

async function gettodoByUser(id) {
    try {
        const user = await usersController.getUserById(id);
        if (!user) {
            throw new Error('User not found');
        }
        const alltodo = await todoController.getAlltodo();
        const usertodo = alltodo.filter(todo => todo.user.toString() === user._id.toString());
        const shareWithMe = alltodo.filter(todo => todo.sharedWith.includes(user._id.toString()));
        return usertodo.concat(shareWithMe);
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
            throw new Error('User not found');
        }
        if (!data.todo) {
            throw new Error('Todo is required');
        }
        if (!data.category) {
            data.category = 'כללי';
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
        if (!user) {
            throw new Error('User not found');
        }

        const todoToUpdate = await todoController.gettodoById(id);
        if (!todoToUpdate) {
            throw new Error('Todo not found');
        }

        // Ensure the user has access to update this todo
        if (todoToUpdate.user.toString() !== user._id.toString()) {
            throw new Error('Unauthorized to update this todo');
        }

        // Update the todo
        const updatedTodo = await todoController.updatetodo(id, data);
        return updatedTodo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function deltodo(id) {
    try {
        const todoToDelete = await todoController.gettodoById(id);
        const user = await usersController.getUserById(todoToDelete.user);
        if (!user) {
            throw new Error('User not found');
        }
        if (!todoToDelete) {
            throw new Error('Todo not found');
        }
        // Use filter to create a new array without the todo to delete
        user.todo.pull(id); // pull מוציא את הערך מהמערך
        await user.save();

        const deletedtodo = await todoController.deletetodo(id);


        return deletedtodo;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getCategories(userId) {
    try {
        const cat = await todoController.getCategories(userId);
        // console.log({cat});
        return cat;
    } catch (error) {
        console.log(error);
        return error;
    }
}
// getCategories("660115e6fc28d3e1ced32a6d");

async function share( data) {
// console.log(data.sharedTask.sharedWith.task)
    try {
        const user = await usersController.getUserByMail(data.sharedTask.sharedWith);
        if (!user) {
            throw new Error('User not found');
        }
        if (!data.sharedTask.task) {
            throw new Error('Todo is required');
        }
        const todo = await todoController.gettodoById(data.sharedTask.task._id);
        // console.log({todo});
        if (!todo) {
            throw new Error('Todo not found');
        }
        
        // Update the todo
        todo.sharedWith.push(user._id);
        await todo.save();
        // console.log({ todo });
        return todo;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

async function unshare(data) {
    try {
        const user = await usersController.getUserById(data.user);
        if (!user) {
            throw new Error('User not found');
        }
        if (!data.todo) {
            throw new Error('Todo is required');
        }
        const todo = await todoController.gettodoById(data.todo);
        if (!todo) {
            throw new Error('Todo not found');
        }
        // Update the todo
        todo.sharedWith = [];
        await todo.save();
        return todo;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

async function getTodoByCategory(userId, category) {
    // console.log({ userId, category });
    try {
        const user = await usersController.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        
        const todos = await todoController.getAlltodo();
        const filteredTodos = todos.filter(todo => todo.category === category && (todo.user.toString() === userId || todo.sharedWith.includes(userId)));
        // console.log({ filteredTodos });
        
        return filteredTodos;
    } catch (error) {
        console.log(error);
        return error;
    }
}



module.exports = { gettodoByUser, getOnetodo, create, update, deltodo, getCategories, share, unshare, getTodoByCategory };


// async function create(data) {
//     try {
//         const user = await usersController.getUserById(data.user);
//         if (!user) {
//             throw error = new Error('no user')
//         }
//         if (!data.todo) {
//             throw error = new Error('no todo')
//         }
//         const todo = await todoController.createtodo(data);
//         user.todo.unshift(todo._id);
//         await user.save();
//         return todo;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }


// async function update(id, data) {
//     try {
//         const user = await usersController.getUserById(data.user);
//         user.todo.filter(todo => todo.toString() !== id.toString());
//         const todo = await todoController.updatetodo(id, data);
//         user.todo.push(todo._id);
//         await user.save();
//         return todo;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

// async function deltodo(id) {
//     try {
//         const todoToDelete = await todoController.gettodoById(id);
//         const user = await usersController.getUserById(todoToDelete.user);

//         console.log("user before deletion", user);

//         // Use filter to create a new array without the todo to delete
//         user.todo = user.todo.filter(todo => todo.toString() !== id.toString());

//         console.log("user after deletion", user);

//         const deletedtodo = await todoController.deletetodo(id);
//         await user.save();

//         return deletedtodo;
//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }


