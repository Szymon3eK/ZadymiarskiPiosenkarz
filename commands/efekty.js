const { json } = require('@distube/yt-dlp');
const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const {linia1, linia2} = require('../buttonsBuilder/efekty.js')

module.exports = {
  name: 'efekty',
  description: `Dodaje efekty do muzyki!`,
  inVoiceChannel: true,
  async execute(interaction, client) {


    var nick = interaction.user.username +"#" + interaction.user.discriminator;
    const musiclink = interaction.options.getString('muzyka');
    const queue = client.distube.getQueue(interaction);


    if(!queue) return interaction.reply({ content: `Nie ma nic w kolejce!`, ephemeral: true })


    console.log(queue.filters)


    const embed = new EmbedBuilder()
    .setColor(config.colors.color)
    .setAuthor({ name: `Wywolane przez ${interaction.user.tag} ${config.colors.heartemote}`, iconURL: interaction.user.displayAvatarURL() })
    .setTitle(`Ustaw efekt dla piosenki!`)
    .setDescription(`Kliknij w przycisk aby przelaczyc efekt piosenki lub wylacz komenda!`)
    .addFields(
        { name: 'Efekty (Kodec ffmpeg):', value: `\`${JSON.stringify(queue.distube.filters)}\``},
        { name: 'Nazwa efektu', value: `${global.nazwaEfektu == undefined ? 'Wylaczony 🔴' : `${global.nazwaEfektu} 🟢`}`},
    )

    interaction.reply({ embeds: [embed], components: [linia1, linia2]})



  },
};
