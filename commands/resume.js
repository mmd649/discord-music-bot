const Play = require('./play');

module.exports = {
    name: 'resume',
    description: 'Resume the current song.',
    execute(message, args){
        Play.resume(message, args);
    }
}