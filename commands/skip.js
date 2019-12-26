const Play = require('./play');

module.exports = {
    name: 'skip',
    description: 'Skip the current song',
    execute(message, args){
        
        Play.skip(message, args);

    }
}