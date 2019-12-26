const   
    Discord     = require('discord.js'),
    fs          = require('fs'),
    config      = require(`./config.json`),
    mongoose    = require('mongoose'),
    naga        = new Discord.Client();

mongoose.connect('mongodb://localhost:27017/naga', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

//Set up command handler
naga.commands = new Discord.Collection();
//Only select JavaScript files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	naga.commands.set(command.name, command);
}


naga.on('message', message => {

    //Variables which will be use for the command and the command argument.
    let args = message.content.slice(config.prefix.length).trim().split(' ');
    let command = args.shift().toLowerCase();

    //If the command does not exist, message sender is a bot or if the prefix used is not the one specifiedm, return.
    if (!naga.commands.has(command) || message.author.bot || !message.content.startsWith(config.prefix)) return;
    
    try{
        naga.commands.get(command).execute(message, args);
    }
    catch (e) {
        console.log(e.stack);
        message.reply('There was an error trying to execute that command');
    }

});

naga.once('ready', ()=>{
   console.log('Naga is now online.');
});

naga.login(config.bot_token);
