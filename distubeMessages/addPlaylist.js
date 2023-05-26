const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

module.exports = function (playlist, queue, client) {

    var randomsetfooter = Math.floor(Math.random() * config.discord.setFooter.length);

    const embed = new EmbedBuilder()
        .setColor(config.colors.color)
        .setAuthor({ name: `Dodano przez ${song.user.tag} ${config.colors.heartemote}`, iconURL: song.user.displayAvatarURL() })
        .setDescription(`***${song.name} - ${song.formattedDuration}***`)
        .addFields(
            { name: `${config.colors.duzastrzalka} W kolejce: `, value: `${queue.songs.length} piosenki/ka`, inline: true},
            { name: `${config.colors.duzastrzalka} Zrodlo: `, value: `${playlist.source} `, inline: true},
            { name: `${config.colors.duzastrzalka} Link do playlisty: `, value: `${playlist.url}`, inline: false},
        )
        .setFooter({ text: `${config.discord.setFooter[randomsetfooter]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})
        .setTimestamp();
        


    queue.textChannel.send({ embeds: [embed]})


    console.log(playlist)

}