const { ActivityType } = require("discord.js")
const config = require('../config.json')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log('wlaczono bota ' + client.user.tag);

		var i = 0;

		setInterval(function() {
			if(i == config.discord.setActivity.length) i = 0;

			client.user.setActivity(`${config.colors.setActivityEmote} » ${config.discord.setActivity[i]}`, { type: ActivityType.PLAYING });
			i++;
		}, 5000)


}};