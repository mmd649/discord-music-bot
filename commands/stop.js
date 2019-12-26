const Play = require('./play');

module.exports = {
    name: 'stop',
    description: 'Stop the bot',
    execute(message, args){
        Play.stop(message, args);
    }
}