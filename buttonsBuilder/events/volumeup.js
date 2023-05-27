const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'volumeup') return;

        const queue = client.distube.getQueue(interaction);

            try {
                const song = await queue.skip();
              } catch(e) {
                console.log(e);
            }


    },
};