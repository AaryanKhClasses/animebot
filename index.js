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

const cooldowns = new Discord.Collection();
const cheerio = require('cheerio');
const request = require('request'); 

bot.on('ready', () => {
    console.log('AnimeBot is online!');
    bot.user.setActivity("AaryanKh's Server", {type: "WATCHING"}).catch(console.error);
})

bot.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    let args = message.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    
    if (!bot.commands.has(command)) "There's no such command!";

    if (!cooldowns.has(command.cmd)) {
        cooldowns.set(command.cmd, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.cmd);
    const cooldownAmount = 3000;
    
    if (timestamps.has(message.author.id)) {
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now);
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.cmd}\` command.`);
            }
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    }

    try {
	    bot.commands.get(command).execute(message, args);
    } catch (error) {
	    console.error(error);
	    message.reply('There was an error trying to execute that command!');
    }
})

bot.login(token); 