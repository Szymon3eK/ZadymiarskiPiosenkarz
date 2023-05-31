const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'pause') return;

        const queue = client.distube.getQueue(interaction);

        if(queue.paused) return interaction.reply({content: 'Nie mozesz zatrzymac piosenki, poniewaz jest ona juz zatrzymana!', ephemeral: true})

        queue.pause()
        interaction.reply({content: 'Zatrzymales piosenke!', ephemeral: true})


    },
};