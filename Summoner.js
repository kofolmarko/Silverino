const mongoose = require('mongoose');

const SummonerSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    discordId: {
        type: Number,
        requires: true,
        unique: true
    }
});

module.exports = mongoose.model('Summoner', SummonerSchema);
