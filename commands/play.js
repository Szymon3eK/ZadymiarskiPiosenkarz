const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
  name: 'play',
  description: `Zacznij grac mocny bangier! ${config.colors.heartemote}`,
  options: [
    {
        name: 'muzyka',
        description: 'Podaj URL / NAZWA piosenki z spotify, soundcloud lub youtuba!',
        type: 3,
        required: true,
    }
  ],
  inVoiceChannel: true,
  async execute(interaction, client) {


      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const musiclink = interaction.options.getString('muzyka');


      await interaction.reply("🔎 Szukam piosenki na twoje zyczenie **" + nick + "**...   `" + interaction.options.getString('muzyka') + "`")

      const { channel } = interaction.member.voice;
      if (!channel) return interaction.editReply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });

      try {
        await interaction.client.distube.play(interaction.member.voice.channel, musiclink, {
          member: interaction.member,
          textChannel: interaction.channel,
          interaction
        });
      } catch (e) {
        console.log(e);
      }

  },
};
