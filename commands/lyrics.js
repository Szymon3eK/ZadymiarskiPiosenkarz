const config = require('../config.json')
const { PermissionsBitField, ApplicationCommandOptionType } = require("discord.js");
const Discord = require('discord.js');
const { getLyrics, getSong } = require('genius-lyrics-api');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'lyrics',
  description: `Sprawdz tekst piosenki!`,
  inVoiceChannel: true,
  options: [
    {
        name: 'piosenka',
        description: 'Wpisz nazwe piosenki! (jezeli nie wpiszesz nic to zobaczysz tekst aktualnej piosenki)',
        type: 3,
        required: false,
    },

    {
        name: 'artysta',
        description: 'Wpisz nazwe artysty! (Jezeli sam wyszukujesz piosenke)',
        type: 3,
        required: false,
    }
  ],
  async execute(interaction, client) {

    try {

      var nick = interaction.user.username +"#" + interaction.user.discriminator;
      const musiclink = interaction.options.getString('piosenka');
      const artysta = interaction.options.getString('artysta');
      const queue = client.distube.getQueue(interaction);


      if((musiclink && !artysta) || (!musiclink && artysta)) return interaction.reply(`❌ ***Musisz podac nazwe piosenki i artysty!*** <@${interaction.user.id}>`, { ephemeral: true });



      const options = {
        apiKey: config.other.geniusaccess,
        title: `${musiclink ? musiclink : `${queue.songs[0].name}`}`,
        artist: `${artysta ? artysta : `${queue.songs[0].uploader.name}`}`,
        optimizeQuery: true
    };

    var randomsetfooter = Math.floor(Math.random() * config.discord.setFooter.length);

    function zaduze() {
        interaction.reply(`***Niestety tekst piosenki jest zbyt duzy abym ci go wyswietlil <@${interaction.user.id}> 😥***  \n *(POV: moja reakcja kiedy zobaczylem tekst piosenki)*`);
        interaction.channel.send({
            files: [{
                name: "ale_bydle.mp4",
                attachment: "./images/alebydle.mp4"
            }],
        });
    }

    
    getLyrics(options).then((lyrics) => {
        
        
        if(!lyrics) return interaction.reply(`***Niestety nie znalazlem tekstu piosenki <@${interaction.user.id}> 😥 Sprobuj wpisac autora i nazwe piosenki samemu!*** *(Uzywamy GENIUS API do wyszukiwania tekstow piosenek wiec moze nie znalezc malo znanych piosenek)*`);
        if(lyrics.length > 4096) return zaduze()


        const embed = new EmbedBuilder()
        .setColor(config.colors.color)
        .setAuthor({ name: `Wywolane przez ${nick} ${config.colors.heartemote}`, iconURL: interaction.user.displayAvatarURL() })
        .setTitle(`Tekst piosenki: ${musiclink ? musiclink : `${queue.songs[0].name}`}`)
        .setDescription(lyrics)
        .addFields(
            { name: `${config.colors.duzastrzalka} Zasilane przez: `, value: `Genius API`, inline: true}
        )
        .setFooter({ text: `${config.discord.setFooter[randomsetfooter]}`, iconURL: (client.users.cache.get(config.discord.ownerID)).displayAvatarURL()})
        
        interaction.reply({ embeds: [embed]})
    });

    } catch(e) {
        interaction.reply({text: 'Niestety wystapil nieznany blad podczas wykonywania tej komendy! Sprobuj za chwile ponownie!', ephemeral: true})
    }




  },
};
