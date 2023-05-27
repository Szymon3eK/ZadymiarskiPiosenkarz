const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'shuffle') return;

        const queue = client.distube.getQueue(interaction);

        queue.shuffle()

        interaction.reply({content: 'Przetasowales komende przyciskiem!', ephemeral: true})

    },
};