const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { EmbedBuilder, GuildMember } = require('discord.js');

module.exports = {
  name: 'shuffle',
  description: `Przetasuj piosenke!`,
  inVoiceChannel: true,
  async execute(interaction, client) {
      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const { channel } = interaction.member.voice;
      const queue = client.distube.getQueue(interaction);

      var input = interaction.options.getInteger('rodzaj');


      if (!channel) return interaction.reply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });
      if(!queue) return interaction.reply(`❌ Kolejka jest pusta! <@${interaction.user.id}>`, { ephemeral: true });

      queue.shuffle()
    

      const embed = new EmbedBuilder()
          .setColor(config.colors.color)
          .setAuthor({ name: `Wywolane przez ${interaction.user.tag} ${config.colors.heartemote}`, iconURL: interaction.user.displayAvatarURL() })
          .setDescription(`Przetasowano cala kolejke!`)
          .setFooter({ text: `${config.discord.setFooter[Math.floor(Math.random() * config.discord.setFooter.length)]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})
          .setTimestamp();
          
      interaction.reply({ embeds: [embed]})

  },
};