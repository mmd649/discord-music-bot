const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const streamOptions = { seek: 0, volume: 1 };
let servers = {};

module.exports = {
  name: "play",
  description: "Play a music",
  execute(message, args) {
    const url = args[0];

    //Check if there is a url provided
    if (!url)
      return message.channel.send(
        `<@${message.author.id}> There is no link provided.`
      );

    //Check if the user who entered the command is in a voice channel
    if (!message.member.voiceChannel)
      return message.channel.send(
        `<@${message.author.id}> Join a voice chanel first.`
      );

    //Check if there is a server in the servers list
    if (!servers[message.guild.id]) servers[message.guild.id] = { queue: [] };
    let server = servers[message.guild.id];

    //Check if the url provided is valid
    if (ytdl.validateURL(url)) {
      server.queue.push(url);
    }

    //Check if the bot is connected to a voice channel
    if (!message.guild.voiceConnection) {
      message.member.voiceChannel.join().then(connection => {
        playSong(server, message, connection);
      });
    }
  }
};

/*  Play song takes in 3 parameters
    server -> The current server
    message -> The message channel
    connection -> The voice channel connection
 */
async function playSong(server, message, connection) {

  await ytdl.getBasicInfo(server.queue[0], {}, (err, info) => {
    message.channel.send(`:notes: **Now Playing** - ${info.title}`);
  });

  server.dispatcher = connection.playStream(ytdl(server.queue[0]), {
    filter: "audioonly"
  });
  server.queue.shift();
  server.dispatcher.on("end", () => {
    if (server.queue[0]) {
      playSong(server, message, connection);
    } else {
      connection.disconnect();
    }
  });
}

module.exports.skip = (message, args) => {
  let server = servers[message.guild.id];
  if (!server.dispatcher) return message.channel.send("No song to be skipped");
  server.dispatcher.end();
  message.channel.send(`:track_next: Song has been skipped as requested.`);
};

module.exports.stop = (message, args) => {
  let server = servers[message.guild.id];
  if (!server.dispatcher) return message.channel.send("Naga is not playing any music right now.");
  server.queue = [];
  server.dispatcher.end();
  message.channel.send(`:octagonal_sign: Music Player has been stopped. Queue has been cleared.`);
};
