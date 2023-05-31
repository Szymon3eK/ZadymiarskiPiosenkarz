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

const shuffle = new ButtonBuilder()
    .setCustomId('shuffle')
    .setLabel('Przetasuj kolejke! (/shuffle)')
    .setStyle(ButtonStyle.Secondary);


const volumeup = new ButtonBuilder()
    .setCustomId('volumeup')
    .setLabel('Glosnosc! + 20 (/volume)')
    .setStyle(ButtonStyle.Success);

const volumedown = new ButtonBuilder()
    .setCustomId('volumedown')
    .setLabel('Glosnosc! - 20 (/volume)')
    .setStyle(ButtonStyle.Success);

const resume = new ButtonBuilder()
    .setCustomId('resume')
    .setLabel('Wznow! (/resume)')
    .setStyle(ButtonStyle.Secondary);

const pause = new ButtonBuilder()
    .setCustomId('pause')
    .setLabel('Zatrzymaj! (/pause)')
    .setStyle(ButtonStyle.Danger);

const stop = new ButtonBuilder()
    .setCustomId('stop')
    .setLabel('Zrestartuj kolejke! (/stop)')
    .setStyle(ButtonStyle.Danger);

    
const linia1 = new ActionRowBuilder()
    .addComponents(skip, shuffle, leave, stop);

const linia2 = new ActionRowBuilder()
    .addComponents(volumeup, volumedown, resume, pause);

module.exports = { linia1, linia2 };

