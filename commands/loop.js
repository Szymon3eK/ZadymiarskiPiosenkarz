const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { EmbedBuilder, GuildMember } = require('discord.js');

module.exports = {
  name: 'loop',
  description: `Zrob tak aby piosenka sie powtarzala`,
  options: [
    {
        name: 'rodzaj',
        description: 'Rodzaj powtarzania piosenki!',
        type: 4,
        required: true,
        choices: [
            {
                name: 'Wylacz',
                value: 0,
            },
            {
                name: 'Wlacz (Tylko na 1 piosenke)',
                value: 1,
            },
            {
                name: 'Wlacz (Dla calej kolejki)',
                value: 2,
            }
        ],
        
    }
  ],
  inVoiceChannel: true,
  async execute(interaction, client) {
      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const { channel } = interaction.member.voice;
      const queue = client.distube.getQueue(interaction);

      var input = interaction.options.getInteger('rodzaj');


      if (!channel) return interaction.reply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });
      if(!queue) return interaction.reply(`❌ Kolejka jest pusta! <@${interaction.user.id}>`, { ephemeral: true });

      queue.setRepeatMode(input);
    

      const embed = new EmbedBuilder()
          .setColor(config.colors.color)
          .setAuthor({ name: `Wywolane przez ${interaction.user.tag} ${config.colors.heartemote}`, iconURL: interaction.user.displayAvatarURL() })
          .setDescription(`Zmieniono LOOP na: **${input === 0 ? 'WYLACZONY' : input === 1 ? 'WLACZONY (Tylko na 1 piosenke)' : 'WLACZONY (Dla calej kolejki)'}**`)
          .setFooter({ text: `${config.discord.setFooter[Math.floor(Math.random() * config.discord.setFooter.length)]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})
          .setTimestamp();
          
      interaction.reply({ embeds: [embed]})

  },
};
