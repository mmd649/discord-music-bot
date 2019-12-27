const { RichEmbed } = require('discord.js');
const Playlist = require('../models/playlist');

module.exports = {
    name: 'playlist',
    description: 'Display all created playlist',
    execute(message, args){

        if(args.length != 0){
            
        } else {
            Playlist.find({}, (err, playlists) => {
                if(err){
                    console.log(err);
                } else {
                    let playListEmbed = new RichEmbed().setColor("#3fb0ac").setTitle('Available Playlists');
                    playlists.map(playlist => {
                        playListEmbed.addField(`Author here`, `${playlist.name}`, true);
                    });
                    message.channel.send(playListEmbed);
                }
            });
        }
    }
}