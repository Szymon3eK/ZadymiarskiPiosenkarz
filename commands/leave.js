const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { getLyrics, getSong } = require('genius-lyrics-api');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'leave',
  description: `Spraw abym wyszedl z kanalu!`,
  inVoiceChannel: true,

async execute(interaction, client) {

const { channel } = interaction.member.voice;
const queue = client.distube.getQueue(interaction);

const voiceStates = channel.guild.voiceStates;
const botVoiceState = voiceStates.cache.get(client.user.id);






if (!channel) return interaction.reply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });
if (!botVoiceState) return interaction.reply(`❌ Jak mnie nawet na kanale nie ma mordko <@${interaction.user.id}>`, { ephemeral: true });


client.distube.voices.leave(interaction);

const embed = new EmbedBuilder()
.setColor(config.colors.color)
.setAuthor({ name: `Wywolane przez ${interaction.user.tag} ${config.colors.heartemote}`, iconURL: interaction.user.displayAvatarURL() })
.setDescription(`Wychodze z kanalu! Do zobaczenia później!`)
.setFooter({ text: `${config.discord.setFooter[Math.floor(Math.random() * config.discord.setFooter.length)]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})
.setTimestamp();

interaction.reply({ embeds: [embed]})

    },
};