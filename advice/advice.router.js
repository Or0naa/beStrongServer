const express = require('express');
const router = express.Router();
const adviceService = require('./advice.service');

router.get('/check', async (req, res) => {
    try {
        const advice = await adviceService.getAdviceToCheck(req.params.id);
        res.json(advice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/', async (req, res) => {
    try {
        const advice = await adviceService.getAdvices();
        res.send(advice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const advice = await adviceService.getAdviceById(req.params.id);
        res.json(advice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.post('/', async (req, res) => {
    try {
        const advice = await adviceService.addAdvice(req.body);
        res.json(advice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const advice = await adviceService.update(req.params.id, req.body);
        res.json(advice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const advice = await adviceService.dltadvice(req.params.id);
        res.json(advice);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router