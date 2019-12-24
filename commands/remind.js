exports.run = (client, message, args) => {
  setTimeout(() => {
    message.channel.send(`<@${message.author.id}>The reminder you set for ${args[0]} has finished!`);
  }, args[1] * 1000);
};
