const Playlist = require("../models/playlist");

module.exports = {
  name: "newplaylist",
  description: "Create a new playlist",
  execute(message, args) {
    //Query all playlist
    Playlist.find({}, (err, playlists) => {
      if (err) {
        console.log(err);
      } else {
        let allPlaylistNames = [];
        playlists.forEach(n => allPlaylistNames.push(n.name));

        //If the playlist name provided already exist in the database, send a error message.
        if (allPlaylistNames.includes(args[0])) {
          return message.channel.send(
            `<@${message.author.id}> The playlist name of ${args[0]} already exist. Please choose another name.`
          );
        }
        //If it does not exist, create a new playlist using the name provided.
        Playlist.create(
          {
            author: message.author.id,
            name: args[0],
            songs: []
          },
          (err, playlist) => {
            if (err) {
              console.log(err);
            } else {
              message.channel.send(
                `Playlist successfully created with the name ${playlist.name}`
              );
            }
          }
        );
      }
    });
  }
};
