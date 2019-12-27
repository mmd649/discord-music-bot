const { RichEmbed } = require("discord.js");

module.exports = {
  name: "help",
  description: "Display all commands",
  execute(message, args) {
    let helpEmbed = new RichEmbed()
      .setColor("#3fb0ac")
      .setTitle("Commands List")
      .setDescription(
        "Below are a series of commands that can be used to control how Naga works."
      )
      .addField(".play <song_title || yt_url>", "Plays a music from youtube")
      .addField(".skip", "Skips the current song")
      .addField(".stop", "Stop playing music.")
      .addField(".newplaylist <playlist_name>", "Create a new playlist")
      .addField(".addsong <playlist> <yt_url || song name>", "Add a song to an existing playlist")
      .addField(".ppl <playlist>", "Play a saved playlist")
      .addField(".remind <Title> <duration(s)>", "Sets a reminder")
      .addField(
        ".weather <city> <country>",
        "Get the current weather forecast for that location"
      );
    message.channel.send(helpEmbed);
  }
};
