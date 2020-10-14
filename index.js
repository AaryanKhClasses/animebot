const Discord = require('discord.js');
const {Client, MessageAttachment} = require('discord.js');
const bot = new Discord.Client();
const token = 'NzY1ODI0MzUxODQwMTA4NTc1.X4abgQ.DqafxoxGf9HeAuH5K-Pi-Ps0VIk';
const prefix = 'an!';
// var version = '1.0.0'; This will be found in version.js

const fs = require('fs');
bot.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

const cheerio = require('cheerio');
const request = require('request');

bot.on('ready', () => {
    console.log('AnimeBot is online!');
    bot.user.setActivity("AaryanKh's Server", {type: "WATCHING"}).catch(console.error);
})

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();
    
    if (!bot.commands.has(commandName)) "There's no such command!";

    try {
	    bot.commands.get(commandName).execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('There was an error trying to execute that command!');
    }
})

bot.login(token);