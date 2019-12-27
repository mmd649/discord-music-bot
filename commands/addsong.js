const ytdl = require('ytdl-core');
const ytsearch = require('youtube-search');
const config = require('../config.json');
const Playlist = require('../models/playlist');
const opts = { maxResults: 1, key: config.yt_api_key};

module.exports = {
    name: 'addsong',
    description: 'Add a song to an existing playlist',
    execute (message, args){

        //If the song is a youtube link, add it to the playlist's song list.
        if(ytdl.validateURL(args[1])){
            addSong(message, args[0], args[1]);

        //if the song is not a yotube link, use the youtube api to search for the word provided and save the link of the first result.    
        } else {
            ytsearch(args[1], opts, (err, song) => {
                if(err) return console.log(err);
                addSong(message, args[0], song[0].link)
            });
        } 

    }
}

//Look for the playlist in the database and insert the song to the playlist's song list and then save the changes.
function addSong(message, playlistName, url){
    //Check if the playlist name provided matches any playlist in the database
    Playlist.find({}, (err, playlists) => {

        if(err) return console.log(err);

        let allPlaylistNames = [];
        playlists.map(p => allPlaylistNames.push(p.name));
        if(!allPlaylistNames.includes(playlistName)) {
            //If not match is found, send an error message
            return message.channel.send(`The playlist ${playlistName} does not exist.`);

        } else {

            //Find the playlist from the database
            Playlist.findOne({name:playlistName}, (err, playlist) => {

                if(err){
                    console.log(err);
                } else {
                    //If the author id is the same as message sender id, allow edit
                    if(playlist.author === message.author.id || playlist.author === config.op){
                        playlist.songs.push(url);
                        playlist.save();
                        
                        ytdl.getBasicInfo(url, (err, songInfo) => {
                            if(err){
                                console.log(err);
                            } else {
                                //let user know that the song has been added to the playlist
                                message.channel.send(`✅ ${songInfo.title} has been added to the playlist ${playlistName}`);
                            }
                        });
                    } else {
                        //If playlist author id does not match the message sender id, send an error message
                        message.channel.send(`The playlist ${playlistName} cannot be modified by anyone apart from its creator.`);
                    }
                }
            });
        }
    });

}