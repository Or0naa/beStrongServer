
const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    userName: String,
    password: String,
    email: { type: String, unique: true },
    role: {  type: String, default: 'user', enum: ['user', 'admin'] },
    todo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'todo' }],
    dreams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'dreams' }]
});

const usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;