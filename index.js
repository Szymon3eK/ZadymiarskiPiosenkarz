const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { readdirSync } = require("fs");
const { REST, Routes } = require('discord.js');

const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

const config = require('./config.json');

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.MessageContent
    ]
  })


client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    nsfw: true,
    youtubeCookie: config.other.cookieyoutube,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new SoundCloudPlugin(),
      new YtDlpPlugin()
    ]
})



//
// command handler
//

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    client.guilds.cache.forEach(guild => {
        guild.commands.set([...client.commands.values()]);
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Wystąpił błąd podczas wykonywania komendy.', ephemeral: true });
    }
});


//
// event handler
//

readdirSync('./events').forEach(async file => {
	const event = await require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})


//
// button event handler
//

readdirSync('./buttonsBuilder/events').forEach(async file => {
	const event = await require(`./buttonsBuilder/events/${file}`);
	if (event.once) {
		try {
            client.once(event.name, (...args) => event.execute(...args));
        } catch (error) {
            interaction.reply({ content: 'Wystąpił błąd podczas klikania guzika.', ephemeral: true });
        }
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
})


client.distube.on('empty', (queue) =>{
    queue.textChannel.send('Kanal jest pusty! Wychodze z kanalu! 😄')
})

client.distube.on('playSong', (queue, song) =>{
    require('./distubeMessages/playSong.js')(song, queue, client)
})

client.distube.on('addSong', (queue, song) =>{
    require('./distubeMessages/addSong.js')(song, queue, client)
})

// client.on('interactionCreate', async (interaction) => {
//     if (!interaction.isButton()) return;
  
//     if (interaction.customId === 'skip') {
//       await interaction.reply('Button clicked!');
//     }
//   });




client.login(config.discord.token);