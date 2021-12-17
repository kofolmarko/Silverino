const gg = new (require('op.gg-api/client.js'));

let REGION = 'euw'

const setRegion = (region) => {
    if(!region === 'euw' || !region === 'eune' || !region === 'na' || !region === 'kr') return;
    REGION = region;
}

const getLeague = async (username) => {
    let response = { };

    await gg.League(REGION, username)
        .then((res) => {
            let data = res.summoners.filter((el) => {
                return el.name.toLowerCase() === username.toLowerCase();
            });

            response = {
                'rank': res.rank,
                'data': data[0]
            }
        })
        .catch((err) => {
            response = {
                'httpStatus': 404
            }
        });

    return response;
}

module.exports = {
    setRegion,
    getLeague
}
