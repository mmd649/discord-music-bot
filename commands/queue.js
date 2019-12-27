const Play = require('./play');

module.exports = {
    name: "queue",
    description: "Display the current queue list.",
    execute(message, args) {
      Play.queue(message, args);
    }
  };