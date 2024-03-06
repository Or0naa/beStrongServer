const dreamsController = require('./dreams.controller');
const usersController = require('../users/users.controller');

async function getDreamsByUser(id) {
    try {
        const user = await usersController.getUserById(id);
        const dreams = await dreamsController.getAlldreams();
        const userDreams = dreams.filter(dream => dream.user.toString() === user._id.toString());
        if (!userDreams) {
            return;
        }
        // console.log("userDreams", userDreams);
        return userDreams;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// getDreamsByUser("65e726f80da8d3f2276aa797")
async function getOneDream(id) {
    try {
        const dream = await dreamsController.getUserById(id);
        return dream;
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
        if (!data.dream) {
            throw error = new Error('no dream')
        }
        const dream = await dreamsController.createdream(data);
        user.dreams.push(dream._id);
        await user.save();
        return dream;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function update(id, data) {
    try {
        const user = await usersController.getUserById(data.user);
        user.dreams.filter(dream => dream.toString() !== id.toString());
        const dream = await dreamsController.updatedream(id, data);
        user.dreams.push(dream._id);
        await user.save();
        return dream;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function delDream(id) {
    try {
        const dreamToDelete = await dreamsController.getdreamById(id);
        const user = await usersController.getUserById(dreamToDelete.user);

        console.log("user before deletion", user);

        // Use filter to create a new array without the dream to delete
        user.dreams = user.dreams.filter(dream => dream.toString() !== id.toString());

        console.log("user after deletion", user);

        const deletedDream = await dreamsController.deletedream(id);
        await user.save();

        return deletedDream;
    } catch (error) {
        console.log(error);
        return error;
    }
}


module.exports = { getDreamsByUser, getOneDream, create, update, delDream };