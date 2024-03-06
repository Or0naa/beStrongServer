const express = require('express');
const router = express.Router();
const todoService = require('./todo.service');

router.get('/', async (req, res) => {
    try {
        res.send(await todoService.gettodoByUser(req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await todoService.gettodoByUser(req.params.id);
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        res.send(await todoService.create(req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.send(await todoService.update(req.params.id, req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        res.send(await todoService.deltodo(req.params.id));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router