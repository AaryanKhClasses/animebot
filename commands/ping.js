module.exports = {
    name: 'ping',
    cmd: 'Ping',
    description: 'This Pings the Bot!',
    execute(message, args){ 
        message.channel.send('AnimeBot is online!');
    }
}