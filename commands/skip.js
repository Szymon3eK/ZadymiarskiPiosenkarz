const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
  name: 'skip',
  description: `Przewin piosenke na kanale!`,
  inVoiceChannel: true,
  async execute(interaction, client) {
      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const musiclink = interaction.options.getString('muzyka');
      const queue = client.distube.getQueue(interaction);

      if (!queue) return interaction.reply(`❌ Nie ma piosenek w kolejce! **${nick}**`, { ephemeral: true });
      try {
        const song = await queue.skip();
        interaction.reply(`⏩ ***Pomyslnie przewinales piosenke <@${interaction.user.id}>!*** `);
      } catch(e) {
        console.log(e);
      }
      


  },
};