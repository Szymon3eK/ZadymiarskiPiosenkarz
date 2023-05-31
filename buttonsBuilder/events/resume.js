const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'resume') return;

        const queue = client.distube.getQueue(interaction);

        if(queue.paused) {
            queue.resume();
            interaction.reply({content: 'Wznowiles piosenke!', ephemeral: true})
        } else {
            interaction.reply({content: 'Piosenka jest juz wznowiona!', ephemeral: true})
        }


    },
};