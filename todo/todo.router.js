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

router.get('/categoty/:id', async (req, res) => {
    // console.log("data", req.query);
    // console.log(req.params.id);
    try {
        const category = await todoService.getTodoByCategory(req.params.id, req.query.cat);
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/categories/:id', async (req, res) => {
    try {
        const categories = await todoService.getCategories(req.params.id);
        res.json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    // console.log(req.body);
    try {
        res.send(await todoService.create(req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/share', async (req, res) => {
    try {
        res.send(await todoService.share(req.body));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/unshare', async (req, res) => {
    try {
        res.send(await todoService.unshare(req.body));
    } catch (error) {
        res.status(404).json({ message: error.message });
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

module.exports = router;
