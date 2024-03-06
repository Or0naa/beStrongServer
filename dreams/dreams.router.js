
const express = require('express');
const router = express.Router();
const dreamsService = require('./dreams.service');

router.get('/', async (req, res) => {
    try {
        res.send(await dreamsService.getDreamsByUser(req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dreams = await dreamsService.getDreamsByUser(req.params.id);
        res.json(dreams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        res.send(await dreamsService.create(req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        res.send(await dreamsService.update(req.params.id, req.body));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        res.send(await dreamsService.delDream(req.params.id));
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router