const axios = require('axios');
const res = require('express/lib/response');

let championList = [];

const getSummonerByName = async (username) => {
    let r = {}

    await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${process.env.API_KEY}`)
        .then(res => {
            r = {
                status: res.status,
                user: res.data
            }
        })
        .catch(err => {
            r = {
                status: err.response.status
            }
        });
    console.log(r)
    return r;
}

const getChampionList = async () => {
    await axios.get(`http://ddragon.leagueoflegends.com/cdn/11.24.1/data/en_US/champion.json`)
        .then(res => {
            for (let champion in res.data.data) {
                championList.push({
                    'name': champion,
                    'key': res.data.data[champion].key
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

const getChampionMastery = async (summonerId, championId) => {
    let r = {}

    await axios.get(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/by-champion/${championId}?api_key=${process.env.API_KEY}`)
        .then(res => {
            r = res.data;
        })
        .catch(err => {
            console.log(err);
        });

    return r;
}

module.exports = {
    getSummonerByName,
    getChampionList,
    getChampionMastery,
    championList
}
