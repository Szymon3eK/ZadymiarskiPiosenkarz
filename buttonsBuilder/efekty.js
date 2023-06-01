const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageActionRow } = require('discord.js');
const config = require('../config.json');

const stopefekty = new ButtonBuilder()
    .setCustomId('stopefekty')
    .setLabel('Wylacz efekty')
    .setStyle(ButtonStyle.Danger);

const bassboost = new ButtonBuilder()
    .setCustomId('bassboost')
    .setLabel('Bassboost')
    .setStyle(ButtonStyle.Secondary);

const bassboostwremizie = new ButtonBuilder()
    .setCustomId('bassboostwremizie')
    .setLabel('Bassboost w kiblu na remizie')
    .setStyle(ButtonStyle.Secondary);    

const _8d = new ButtonBuilder()
    .setCustomId('8d')
    .setLabel('8D')
    .setStyle(ButtonStyle.Secondary);

const bass8D = new ButtonBuilder()
    .setCustomId('bass8D')
    .setLabel('Bass + 8D')
    .setStyle(ButtonStyle.Secondary);

const nightcore = new ButtonBuilder()
    .setCustomId('nightcore')
    .setLabel('Nightcore (sped up)')
    .setStyle(ButtonStyle.Secondary);




const linia1 = new ActionRowBuilder()
    .addComponents(stopefekty)
    .addComponents(bassboost)
    .addComponents(bassboostwremizie)
    .addComponents(_8d);

const linia2 = new ActionRowBuilder()
    .addComponents(bass8D)
    .addComponents(nightcore);


module.exports = { linia1, linia2 };