const Play = require('./play');
const Playlist = require('../models/playlist');

module.exports = {
    name: 'ppl',
    description: 'Play a certain playlist',
    execute(message, args){
        
        if(args.length === 0) return message.channel.send("Please provide a playlist name");

        Playlist.find({}, (err, playlists) => {

            if(err) console.log(err);
            let allPlaylist = [];

            //Get all playlist names from the database to see if the given playlist exist.
            playlists.map(p => allPlaylist.push(p.name));
            //If it does not, send an error message.
            if(!allPlaylist.includes(args[0])) return message.channel.send("The playlist you have entered does not exist");

            //If it does exist, play the playlist.
            Playlist.findOne({name:args[0]}, (err, playlist) => {
                if(err) console.log(err);
                let songs = playlist.songs;
                Play.playPlaylist(message, songs);
            });

        });

    }
}