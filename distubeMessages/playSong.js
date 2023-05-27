const { EmbedBuilder } = require('discord.js');
const config = require('../config.json')
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, MessageActionRow } = require('discord.js');
const {linia1, linia2} = require('../buttonsBuilder/play.js');

module.exports = function (song, queue, client) {


    var randomsetfooter = Math.floor(Math.random() * config.discord.setFooter.length);

    const embed = new EmbedBuilder()
        .setColor(config.colors.color)
        .setTitle(`**${song.name}** - **${song.formattedDuration}**`)
        .setAuthor({ name: `Dodano przez ${song.user.tag} ${config.colors.heartemote}`, iconURL: song.user.displayAvatarURL() })
        //.setThumbnail(song.user.displayAvatarURL())
        .setImage(song.thumbnail)
        .setTimestamp()

        .addFields(
            { name: `${config.colors.duzastrzalka} Streamowane przez: `, value: `${(song.source).charAt(0).toUpperCase() + (song.source).slice(1)} ${song.source == 'youtube' ? '🔴' : song.source == 'spotify' ? '🟢' : song.source == 'soundcloud' ? '🟠' : '🔘'}`, inline: true},
            { name: `${config.colors.duzastrzalka} Dodane przez: `, value: `${song.user}`, inline: true},
            { name: `${config.colors.duzastrzalka} W kolejce: `, value: `${queue.songs.length} piosenki/ka`, inline: false},
            { name: `${config.colors.duzastrzalka} Link do piosenki: `, value: `${song.url}`, inline: true},
            { name: `${config.colors.duzastrzalka} Autor: `, value: `${song.uploader.name} `, inline: false},
            { name: `${config.colors.duzastrzalka} Wyswietlenia / Lapki w gore: `, value: `${song.views} 👀 / ${song.likes} 👍`, inline: true},
            { name: `${config.colors.duzastrzalka} NSFW: `, value: `${song.age_restricted === true ? 'Tak 🖤' : 'Nie 💚'}`, inline: true}
        )


        .setFooter({ text: `${config.discord.setFooter[randomsetfooter]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})


        // soundcloud or spotify

        const embedWithoutimage = new EmbedBuilder()
        .setColor(config.colors.color)
        .setTitle(`**${song.name}** - **${song.formattedDuration}**`)
        .setAuthor({ name: `Dodano przez ${song.user.tag} ${config.colors.heartemote}`, iconURL: song.user.displayAvatarURL() })
        .setThumbnail(song.thumbnail)
        .setTimestamp()

        .addFields(
            { name: `${config.colors.duzastrzalka} Streamowane przez: `, value: `${(song.source).charAt(0).toUpperCase() + (song.source).slice(1)} ${song.source == 'youtube' ? '🔴' : song.source == 'spotify' ? '🟢' : song.source == 'soundcloud' ? '🟠' : '🔘'}`, inline: true},
            { name: `${config.colors.duzastrzalka} Dodane przez: `, value: `${song.user}`, inline: true},
            { name: `${config.colors.duzastrzalka} W kolejce: `, value: `${queue.songs.length} piosenki/ka`, inline: false},
            { name: `${config.colors.duzastrzalka} Link do piosenki: `, value: `${song.url}`, inline: true},
            { name: `${config.colors.duzastrzalka} Autor: `, value: `${song.uploader.name} `, inline: true},
            { name: `${config.colors.duzastrzalka} Wyswietlenia / Lapki w gore: `, value: `${song.views} 👀 / ${song.likes} 👍`, inline: false},
            { name: `${config.colors.duzastrzalka} NSFW: `, value: `${song.age_restricted === true ? 'Tak 🖤' : 'Nie 💚'}`, inline: true}
        )


        .setFooter({ text: `${config.discord.setFooter[randomsetfooter]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})

    if(song.source != 'youtube') {
        queue.textChannel.send({ embeds: [embedWithoutimage]})
    } else {



        queue.textChannel.send({
            embeds: [embed],
            components: [linia1, linia2]
        })
    }


    




    
    

}