const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'stop') return;

        const queue = client.distube.getQueue(interaction);

        if(!queue) return interaction.reply({content: 'Nie ma kolejki!', ephemeral: true})
        
        queue.stop()
        interaction.reply({content: 'Zresetowales cala kolejke!!', ephemeral: true})


    },
};