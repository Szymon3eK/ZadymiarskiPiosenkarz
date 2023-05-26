const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { EmbedBuilder, GuildMember } = require('discord.js');

module.exports = {
  name: 'volume',
  description: `Zmien glosnosc!`,
  options: [
    {
        name: 'procenty',
        description: 'Podaj procenty glosnosci! (MAX. 200%)',
        type: 3,
        required: true,
    }
  ],
  inVoiceChannel: true,
  async execute(interaction, client) {
      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const procent = interaction.options.getString('procenty');
      const { channel } = interaction.member.voice;
      const queue = client.distube.getQueue(interaction);

      var pasek = "";

      if (!channel) return interaction.reply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });
      if(isNaN(parseInt(procent))) return interaction.reply(`❌ Musisz podac liczbe! <@${interaction.user.id}>`, { ephemeral: true });

    if(parseInt(procent) > 200 && !interaction.member.permissions.has('BanMembers')) return interaction.reply(`❌ Nie mozesz ustawic glosnosci wiekszej niz **200%**! <@${interaction.user.id}>`, { ephemeral: true });

    if(parseInt(procent) > 200 && interaction.member.permissions.has('BanMembers')) {
      queue.setVolume(Number(procent))

      const embed = new EmbedBuilder()
      .setThumbnail(interaction.user.avatarURL())
      .setDescription(`🔊 Ustawiono glosnosc na **${procent}%** \n` + "*Bypass przez uprawnienia administratorskie* ***BanMembers*** *🛑*")
      .setColor(`${config.colors.color}`)
      .setFooter({text: `${config.discord.setFooter[Math.floor(Math.random() * config.discord.setFooter.length)]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL() })
      .setTitle(`🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪`)
  
      interaction.reply({embeds: [embed]})


    } else {
      queue.setVolume(Number(procent))

      var ileKwadratow = Number(procent) / 20;
  
      for(var i = 1;  i <= ileKwadratow; i++) {
          pasek += "🟩";
      }
  
      for(var i = 1;  i <= 10 - ileKwadratow; i++) {
          pasek += "⬜";
      }
      
      const embed = new EmbedBuilder()
      .setThumbnail(interaction.user.avatarURL())
      .setDescription(`🔊 Ustawiono glosnosc na **${procent}%**`)
      .setColor(`${config.colors.color}`)
      .setFooter({text: `${config.discord.setFooter[Math.floor(Math.random() * config.discord.setFooter.length)]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL() })
      .setTitle(`${pasek}`)
  
      interaction.reply({embeds: [embed]})
    }



  },
};