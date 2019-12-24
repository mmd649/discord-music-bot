exports.run = (client, message, args) => {
    if(!message.guild.me.voiceChannel) return message.channel.send('Naga is not connected to any voice channel.');
    message.guild.me.voiceChannel.leave();
}
