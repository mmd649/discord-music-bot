const { RichEmbed } = require("discord.js");
const ytdl = require("ytdl-core");
const ytsearch = require("youtube-search");
const config = require("../config.json");
const opts = { maxResults: 2, key: config.yt_api_key };

const streamOptions = { seek: 0, volume: 2 };

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
    } else {
      ytsearch(args.join(" "), opts, (err, result) => {
        if (err) return console.log(err);

        if (ytdl.validateURL(result[0].link)) {
          server.queue.push(result[0].link.toString());
        } else {
          server.queue.push(result[1].link.toString());
        }
        //Check if the bot is connected to a voice channel
        if (!message.guild.voiceConnection) {
          message.member.voiceChannel.join().then(connection => {
            playSong(server, message, connection);
          });
        }
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
  const song = await ytdl.getInfo(server.queue[0]);
  message.channel.send(`:notes: **Now Playing**  ${song.title}`);

  const stream = ytdl(server.queue[0], { filter: "audioonly" });
  server.dispatcher = await connection.playStream(stream, streamOptions);
  server.queue.shift();

  server.dispatcher.on("end", () => {
    if (server.queue[0]) {
      playSong(server, message, connection);
    } else {
      connection.disconnect();
    }
  });
}

/*
 */
module.exports.playPlaylist = (message, playlist) => {
  //Check if there is a server in the servers list
  if (!servers[message.guild.id]) servers[message.guild.id] = { queue: [] };

  let server = servers[message.guild.id];

  if (!message.member.voiceChannel)
    return message.channel.send(
      `<@${message.author.id}> Join a voice chanel first.`
    );

  server.queue = playlist;

  message.member.voiceChannel.join().then(connection => {
    playSong(server, message, connection);
  });
};

/*
 */
module.exports.queue = async (message, args) => {
  let server = servers[message.guild.id];

  let queueEmbed = new RichEmbed()
    .setColor("#3fb0ac")
    .setTitle("Current queue");

  if (server.queue.length > 0)
    message.channel.send(
      `<@${message.member.id}> Please wait as I get details about the queue.`
    );

  if (server.queue.length > 0) {
    for (let x = 0; x < server.queue.length; x++) {
      const linkInfo = await ytdl.getBasicInfo(server.queue[x]);
      queueEmbed.addField(
        `${x === 0 ? "Next" : ":arrow_right:"}`,
        linkInfo.title
      );
    }
    message.channel.send(queueEmbed);
  } else {
    message.channel.send("There is no other song after the one playing.");
  }
};

/*
 */
module.exports.skip = (message, args) => {
  let server = servers[message.guild.id];
  if (!server.dispatcher) return message.channel.send("No song to be skipped");
  server.dispatcher.end();
  message.channel.send(`:track_next: Song has been skipped as requested.`);
};

/*
 */
module.exports.stop = (message, args) => {
  let server = servers[message.guild.id];
  if (!server.dispatcher)
    return message.channel.send("Naga is not playing any music right now.");
  server.queue = [];
  server.dispatcher.end();
  message.channel.send(
    `:octagonal_sign: Music Player has been stopped. Queue has been cleared.`
  );
};
