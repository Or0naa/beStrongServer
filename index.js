const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const db = require('./db');
db.connect();

const app = express();
app.use(cors());
app.use(express.json());


const usersRouter = require('./users/users.router');
const todoRouter = require('./todo/todo.router');
const dreamsRouter = require('./dreams/dreams.router');
const adviceRouter = require('./advice/advice.router');

app.use('/users', usersRouter);
app.use('/todo', todoRouter);
app.use('/dreams', dreamsRouter);
app.use('/advice', adviceRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
}); 