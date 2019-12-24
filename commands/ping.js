/*
    Ping command is a simple command that is used to test whether the application is working or not.
    When a user type '.ping' the bot would simply reply with 'Pong!'
 */
module.exports = {
  name: "ping",
  description: "Ping!",
  execute(message, args) {
    message.channel.send(`<@${message.author.id}> Pong!`);
  }
};
