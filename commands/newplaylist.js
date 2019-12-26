const Playlist = require("../models/playlist");

module.exports = {
  name: "newplaylist",
  description: "Create a new playlist",
  execute(message, args) {
    Playlist.find({}, (err, playlists) => {
      if (err) {
        console.log(err);
      } else {
        let allPlaylistNames = [];
        playlists.forEach(n => allPlaylistNames.push(n.name));

        if (allPlaylistNames.includes(args[0])) {
          return message.channel.send(
            `<@${message.author.id}> The playlist name of ${args[0]} already exist. Please choose another name.`
          );
        }
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
