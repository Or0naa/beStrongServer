
const mongoose = require('mongoose');
const dreamsSchema = new mongoose.Schema({
    dream: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
});

const dreamsModel = mongoose.model('dreams', dreamsSchema);

module.exports = dreamsModel;