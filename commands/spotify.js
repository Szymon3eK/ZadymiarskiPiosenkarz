const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');

module.exports = {
  name: 'spotify',
  description: `Przechwycam twoj status na discordzie i puszczam go na kanale!`,
  inVoiceChannel: true,
  async execute(interaction, client) {

    //const activity = interaction.member.presence.activities[0];

    //if (!activity) return interaction.reply({content: 'Nie sluchasz nic na spotify!', ephemeral: true});


    const activity = interaction.member.presence.activities;


    const { channel } = interaction.member.voice;
    if (!channel) return interaction.editReply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });

    if(activity[1].type !== 2) return interaction.reply({content: 'Nie sluchasz nic na spotify!', ephemeral: true});

    try {
      await interaction.client.distube.play(interaction.member.voice.channel, `${activity[1].details}`, {
        member: interaction.member,
        textChannel: interaction.channel,
        interaction
      });

    interaction.reply({content: `🎶 Puszcczam teraz status ${interaction.user} z spotify! czyli **${activity[1].details}`})

    } catch (e) {
      console.log(e);
    }


      


  },
};