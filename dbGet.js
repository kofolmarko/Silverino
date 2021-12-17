const axios = require('axios');
const riot = require('./riot');
const Summoner = require('./Summoner');

const getAllSummoners = async () => {
    await axios.get('http://localhost:3000/summoners')
        .then((res) => {
            console.log(`List of registered summoners: ${res.data}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

const getSummoner = async (discordId) => {
    let response;
    await axios.get(`http://localhost:3000/summoners/${discordId}`)
        .then((res) => {
            response = res.data;
        })
        .catch((err) => {
            console.log(err);
        });
    return response;
}

const registerSummoner = async (username, discordId) => {
    let summoner = await getSummoner(discordId);
    let exists = await riot.getSummonerByName(username);
    let response;
    if(exists.status !== 200) {
        response = `Summoner **${username}** does not exist.`;
    } else if (!summoner) {
        await axios.post('http://localhost:3000/summoners', {
            username: username,
            discordId: discordId
            })
            .then((res) => {
                response = `Summoner **${username}** successfully linked to Discord account.`;
            })
            .catch((err) => {
                response = `An error occurred: ${err.response.status}.`;
            });
    } else if (summoner.username === username) {
        response = `Summoner **${username}** is already linked to this account.`;
    } else {
        await axios.put(`http://localhost:3000/summoners/${discordId}`, {
            username: username
        })
            .then((res) => {
                response = `Summoner **${username}** successfully linked to Discord account.`;
            })
            .catch((err) => {
                console.log(err.response)
                response = `An error occurred.`;
            });
    }
    return response;
}

module.exports = {
    getAllSummoners,
    registerSummoner,
    getSummoner
}
