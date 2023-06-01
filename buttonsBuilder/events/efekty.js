const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;

        const queue = client.distube.getQueue(interaction);
        if(!queue) return interaction.reply({content: 'Nie ma kolejki!', ephemeral: true})

        if (interaction.customId == 'stopefekty') {
            queue.filters.clear()
            interaction.reply({content: `${interaction.user} Wylaczyl wszystkie efekty!`})
            global.nazwaEfektu = undefined;
        }



        if (interaction.customId == 'bassboost') {
            queue.filters.clear()
            queue.filters.add([{
                name:  "bassboost",
                value: "bass=g=10"
              }])
              on('bassboost', interaction);
        }

        if(interaction.customId == 'bassboostwremizie') {
            queue.filters.clear()
            queue.filters.add([{
                name:  "bassboost",
                value: "bass=g=150,dynaudnorm=f=550"
              }])
                on('Bassboost w kiblu na remizie', interaction);
        }

        if(interaction.customId == '8d') {
            queue.filters.clear()
            queue.filters.add([{
                name:  "fullaudio",
                value: "bass=g=7,dynaudnorm=f=200,apulsator=hz=0.08"
              }])
                on('8D', interaction);
        }


        if(interaction.customId == 'bass8D') {
            queue.filters.clear()
            queue.filters.add([{
                name:  "bassboost",
                value: "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08"
            }])
                on('Bass + 8D', interaction);
        }

        if(interaction.customId == 'nightcore') {
            queue.filters.clear()
            queue.filters.add([{
                name: "vibrato",
                value: "aresample=48000,asetrate=48000*1.25"
            }])
                on('Nightcore (sped up)', interaction);
        }



        function on(nazwa, interaction) {
            interaction.reply({content: `Wlaczono \`${nazwa}\` przez ${interaction.user}!`})
            global.nazwaEfektu = nazwa;
        }





    },
};