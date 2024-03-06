const mongoose = require('mongoose');
const adviceSchema = new mongoose.Schema({
    advice: String,
    date: { type: Date, default: Date.now },
    isActive: { type:Boolean, default: false },
});

const AdviceModel = mongoose.model('Advice', adviceSchema);

module.exports = AdviceModel;