const {mongoose} = require('mongoose');
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;

 function connect() {
    try {
         mongoose.connect(mongoUrl);
        console.log('DB Connected');
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = { connect };