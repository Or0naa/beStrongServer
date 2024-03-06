const  adviceController  = require('./advice.controller');


async function addAdvice(data) {
    try {
        const advice = {
            advice: data.advice
        }
        const newAdvice = await adviceController.createadvice(advice);
        return advice;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// addAdvice({ advice: "מחר יום חדש " })

async function getAdvices() {
    try {
        const advices = await adviceController.getAlladvice();
        // console.log("advices:", advices);
        return advices;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// getAdvices()
async function getAdviceToCheck() {
    try {
        const advices = await adviceController.getAdvicesToCheck();
        return advices;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function dltadvice(id) {
    try {
        const advice = await adviceController.deleteadvice(id);
        return advice;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function getAdviceById(id) {
    try {
        const advice = await adviceController.getadviceById(id);
        return advice;
    } catch (error) {
        console.log(error);
        return error;
    }
}

async function update(id, data) {
    try {
        const advice = await adviceController.updateadvice(id, data);
        return advice;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = { addAdvice, getAdvices, dltadvice, getAdviceById, update, getAdviceToCheck }