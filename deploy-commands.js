require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with highest role!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder()
        .setName('acc')
        .setDescription('Replies with your summoner name and league.')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('Provide your summoner name.')
            .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName('chests')
        .setDescription('Replies with list of champions that have a chest unlock available.')
        .addStringOption(option =>
            option.setName('champion')
            .setDescription('Which champ to check for?')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('username')
            .setDescription('Provide your summoner name.')
            .setRequired(false)
        ),
    new SlashCommandBuilder()
        .setName('link')
        .setDescription('Link your summoner name to your discord profile.')
        .addStringOption(option =>
            option.setName('username')
            .setDescription('Provide your summoner name.')
            .setRequired(true)
        )
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
