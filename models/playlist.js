const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    author: String,
    name: String,
    songs: []
});

module.exports = mongoose.model('Playlist', playlistSchema);