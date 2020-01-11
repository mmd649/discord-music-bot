const Playlist = require('../models/playlist');

module.exports = {
    name:'deletepl',
    description: 'Delete a Certain Playlist',
    execute(message, args){
        if(args.length === 0) return message.channel.send(`<@${message.author.id}>Please provide a playlist name to be deleted.`);

        Playlist.findOne({name:args[0]}, (err, playlist) => {
            if(err) console.log(err);
            if(playlist == null) return message.channel.send("The playlist name you have entered does not exist.");
            if(playlist.author !== message.author.id) return message.channel.send(`<@${message.author.id}> You can only delete playlist that you have created.`);
        });

        Playlist.findOneAndDelete({name:args[0]}, (err, playlist) => {
            if(err) console.log(err);
            return message.channel.send(`The Playlist with the name ${args[0]} has been deleted`);
        });

    }
}