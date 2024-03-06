const dreamsModel  = require('./dreams.model');

async function getAlldreams() {
    return await dreamsModel.find({});
}

async function getdreamById(id) {
    return await dreamsModel.findById(id);
}

async function createdream(dream) {
    return await dreamsModel.create(dream);
}

async function updatedream(id, dream) {
    return await dreamsModel.findByIdAndUpdate(id, dream, { new: true });
}

async function deletedream(id) {
    return await dreamsModel.findByIdAndDelete(id);
}

module.exports = { getAlldreams, getdreamById, createdream, updatedream, deletedream };