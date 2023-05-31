const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'volumeup') return;

        const queue = client.distube.getQueue(interaction);

        if(queue.volume + 20 > 200) return interaction.reply({content: 'Nie mozesz zwiekszyc glosnosci powyzej 200!', ephemeral: true})
        interaction.reply({content: 'Zmieniles glosnosc o +20! ', ephemeral: true})

        queue.setVolume(queue.volume + 20);

    },
};