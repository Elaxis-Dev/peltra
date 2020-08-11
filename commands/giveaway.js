const Discord = require("discord.js");
const client = new Discord.Client();

//const message = require('./messages-giveaway.json');

const giveaways = require("discord-giveaways");
const ms = require("ms");

module.exports = {
	name: 'giveaway',
	description: 'giveaway',
	execute(message, args){
			const [id] = args;
			const channel = client.guilds.get(id);
			console.log(id);
			if(channel) {

			} else {
				message.channel.send("> :x: Le salon n'existe pas")
			}
	}
}
