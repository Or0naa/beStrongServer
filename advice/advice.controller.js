const  AdviceModel  = require('./advice.model');

async function getAlladvice() {
    return await AdviceModel.find({isActive: true});
}

async function getAdvicesToCheck() {
    return await AdviceModel.find({isActive: false});
}

async function getadviceById(id) {
    return await AdviceModel.findById(id);
}

async function createadvice(advice) {
    return await AdviceModel.create(advice);
}

async function updateadvice(id, advice) {
    return await AdviceModel.findByIdAndUpdate(id, advice, { new: true });
}

async function deleteadvice(id) {
    return await AdviceModel.findByIdAndDelete(id);
}

module.exports = { getAlladvice, getadviceById, createadvice, updateadvice, deleteadvice, getAdvicesToCheck };