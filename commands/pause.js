const Play = require('./play');

module.exports = {
    name: 'pause',
    description: 'Pause the current song playing',
    execute(message, args){
        Play.pause(message, args);
    }
}