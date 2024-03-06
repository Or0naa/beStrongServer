const usersController = require('./users.controller');
const bcrypt = require('bcrypt');
const { mongoose } = require('mongoose');
const dreamsSrevice = require('../dreams/dreams.service');
const todoService = require('../todo/todo.service')


async function getUsers() {
    try {
        const users = await usersController.getAllUsers();
        return users;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getOneUser(id) {
    try {
        const user = await usersController.getUserById(id);
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function loginUser(data) {
    // console.log("data", data);
    try {
        const user = await usersController.getUserByMail(data.email);

        if (!user) {
            throw new Error('No user');
        } else {
            const isMatch = await bcrypt.compare(data.password, user.password || '');

            if (isMatch) {
                return user;
            } else {
                throw new Error('Incorrect password');
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function create(data) {
    try {
        const check = await usersController.getUserByMail(data.email);
        if (check) {
            throw new Error('User already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = {
            userName: data.userName,
            password: hashedPassword,
            email: data.email,
            role: 'user', // Replace 'user' with the appropriate role value
        };

        const newUser = await usersController.createUser(user);
        const firstDream = await dreamsSrevice.create({
            user: newUser._id,
            dream: "כדי למחוק חלום מהרשימה צריך פשוט ללחוץ עליו"
        });
        const firstTask = await todoService.create({
            todo: "להרשם לאתר",
            isDone: true,
            user: newUser._id
        })
        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function update(id, data) {
    try {
        const updatedUser = await usersController.updateUser(id, data);
        return updatedUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function remove(id) {
    try {
        const user = await usersController.deleteUser(id);
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { getUsers, getOneUser, create, update, remove, loginUser };