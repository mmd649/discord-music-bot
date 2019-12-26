module.exports = {
  name: "remind",
  description: "Set a reminder",
  execute(message, args) {
    setTimeout(() => {
      message.channel.send(
        `<@${message.author.id}> The reminder you set for __**${args[0]}**__ has finished!`
      );
    }, args[1] * 1000);
  }
};
