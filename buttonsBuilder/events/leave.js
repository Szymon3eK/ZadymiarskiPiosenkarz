const { ActivityType } = require("discord.js")
const config = require('../../config.json')

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'leave') return;

        const { channel } = interaction.member.voice;
        const queue = client.distube.getQueue(interaction);
        
        const voiceStates = channel.guild.voiceStates;
        const botVoiceState = voiceStates.cache.get(client.user.id);
        
        
        
        
        
        
        if (!channel) return interaction.reply({content: `✋ Musisz byc na kanale glosowym aby uzyc tej komendy! **${nick}**`, ephemeral: true });
        if (!botVoiceState) return interaction.reply({content: `❌ Jak mnie nawet na kanale nie ma mordko <@${interaction.user.id}>`, ephemeral: true });
        
        client.distube.voices.leave(interaction);

        interaction.reply({content: 'Wyszedlem z kanalu glosowego przez klikniecie przycisku!', ephemeral: true})

    },
};