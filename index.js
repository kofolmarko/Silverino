require('dotenv').config();
const gg = require('./opgg');
const riot = require('./riot');
const db = require('./dbGet');

// Require the necessary discord.js classes
const { Client, Intents, Guild } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    riot.getChampionList();
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply(`Če si care maš role: ${interaction.guild.roles.highest}`);
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'acc') {
        let username = interaction.options.get('username').value;
        let user = await gg.getLeague(username);
        if(user.httpStatus === 404) {
            await interaction.reply(`User **${username}** does not exist.`);
        } else {
            await interaction.reply(
                `Your summoner name is **${user.data.name}** and you belong to **${user.rank}**. Stuck at **${user.data.lp} LP**, with **${user.data.winRatio}% win ratio**.`
            );
        }
    } else if (commandName === 'chests') {
        let username = interaction.options.get('username')?.value;
        let summoner = await db.getSummoner(interaction.user.id);
        if (!username) username = summoner.username;
        console.log(username);
        let champion = interaction.options.get('champion').value;
        let user = await riot.getSummonerByName(username);
        console.log(user)
        let champExists = false;
        for (x in riot.championList) {
            if(riot.championList[x].name.toLowerCase() === champion.toLowerCase()) {
                champExists = true;
                let key = riot.championList[x].key;
                let mastery = await riot.getChampionMastery(user.user.id, key);
                if (mastery.chestGranted) {
                    await interaction.reply(`Sorry, champ, you already got a chest on **${champion}**.`);
                } else {
                    await interaction.reply(`You can still acquire a chest on **${champion}**, go get it tiger!`);
                }
            }
        } 
        if(!champExists) {
            await interaction.reply(`Huh? Sorry, but **${champion}** is not a champion.`);
        }
    } else if (commandName === 'link') {
        let username = interaction.options.get('username').value;
        let message = await db.registerSummoner(username, interaction.user.id);
        await interaction.reply(message);
    }
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
