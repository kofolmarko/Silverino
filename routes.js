const express = require('express');
const router = express.Router();

const Summoner = require('./Summoner');


// GET all summoners
router.get('/', async (req, res) => {

    try {
        const summoners = await Summoner.find();
        res.status(200).json(summoners);
    } catch(err) {
        res.status(400).json({ message: err });
    }

});

// GET summoner by username
router.get('/:discordId', async (req, res) => {

    try {
        const summoner = await Summoner.findOne({ discordId: req.params.discordId });
        res.status(200).json(summoner);
    } catch(err) {
        res.status(400).json({ message: err });
    }

});

// POST new summoner
router.post('/', async (req, res) => {

    const summoner = new Summoner({
        username: req.body.username,
        discordId: req.body.discordId
    });

    try {
        const savedSummoner = await summoner.save();
        res.status(201).json(savedSummoner);
    } catch (err) {
        res.status(400).json({ message: err });
    }

});

// PUT change linked summoner
router.put('/:discordId', async (req, res) => {

    try {
        const summoner = await Summoner.findOneAndUpdate({ discordId: req.params.discordId }, { username: req.body.username });
        console.log(summoner)
        summoner.username = req.body.username;
        res.status(200).json(summoner);
    } catch(err) {
        res.status(400).json({ message: err });
    }

});

module.exports = router;
