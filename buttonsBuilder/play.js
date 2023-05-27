const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageActionRow } = require('discord.js');
const config = require('../config.json');

const skip = new ButtonBuilder()
    .setCustomId('skip')
    .setLabel('Przewin! (/skip)')
    .setStyle(ButtonStyle.Secondary);

const leave = new ButtonBuilder()
    .setCustomId('leave')
    .setLabel('Wyjdź! (/leave)')
    .setStyle(ButtonStyle.Danger);

const row = new ActionRowBuilder()
    .addComponents(skip, leave);

