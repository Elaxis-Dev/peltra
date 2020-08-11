const Discord = require("discord.js");
const client = new Discord.Client();

module.exports = {
	name: 'ping',
	description: 'ping',
	execute(message, args){
        message.channel.send(`<:no_expression:714928969258106960> Pong! Ma latence est de ${Date.now() - message.createdTimestamp}ms`);
		
		console.log(`${message.author.username} --> Ping. Lat = ${Date.now() - message.createdTimestamp}ms`);
	}
}