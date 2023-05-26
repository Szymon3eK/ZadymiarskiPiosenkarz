const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { EmbedBuilder, GuildMember } = require('discord.js');
const playSong = require('../distubeMessages/playSong');

module.exports = {
  name: 'queue',
  description: `Sprwadz kolejke!`,
  inVoiceChannel: true,
  async execute(interaction, client) {
      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const { channel } = interaction.member.voice;
      const queue = client.distube.getQueue(interaction);


      if (!channel) return interaction.reply(`✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, { ephemeral: true });
      if(!queue) return interaction.reply(`❌ Kolejka jest pusta! <@${interaction.user.id}>`, { ephemeral: true });

      function zaduze() {
        interaction.reply(`Niestety kolejka jest zbyt duza <@${interaction.user.id}> 😥 Moge ci tylko powiedziec ze jest ***${queue.songs.length} piosenek ***w playliscie, akutalny utwor to ***${queue.songs[0].name}*** a nastepny utwor to ***${queue.songs[1].name}***  \n *(POV: moja reakcja kiedy zobaczylem kolejke)*`);
        interaction.channel.send({
            files: [{
                name: "ale_bydle.mp4",
                attachment: "./images/alebydle.mp4"
            }],
        });
    }


      async function all(queue) {

      const q = await queue.songs
      .map((song, i) => `${i === 0 ? '**AKUTLANIE GRA:**' : `**${i}**.`} ${song.name} - ***${song.formattedDuration}*** \n \`${song.url}\`${i == 0 ? '\n' : ''}`)
      .join('\n')


      if(q.length > 4096) return zaduze()


      const embed = new EmbedBuilder()
      .setColor(config.colors.color)
      .setAuthor({ name: `Wywolano przez ${nick} ${config.colors.heartemote}`, iconURL: interaction.user.displayAvatarURL() })
      
      .setThumbnail(interaction.user.displayAvatarURL())
      .addFields(
        { name: `${config.colors.duzastrzalka} Nazwa kanalu: `, value: `${queue.voiceChannel.name}`, inline: true},
        { name: `${config.colors.duzastrzalka} Ilosc piosenek w playliscie: `, value: `${queue.songs.length}`, inline: true},
      )
      .setDescription(q)
      .setTimestamp()
      .setFooter({ text: `${config.discord.setFooter[Math.floor(Math.random() * config.discord.setFooter.length)]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})


    interaction.reply({ embeds: [embed]})
    };

    all(queue);

  },
};