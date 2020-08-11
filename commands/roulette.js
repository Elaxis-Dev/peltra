const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

module.exports = {
	name: 'roulette',
	description: 'roulette',
	execute(message, args){
		
		message.delete();
		
		let random = Math.floor((Math.random() * 3) + 1)

		if(random == "1"){
			let random1 = ":poultry_leg:";
		}
		if(random == "2"){
			let random1 = ":hamburger:";
		}
		if(random == "3"){
			let random1 = ":taco:";
		}
		
		const roulette = new Discord.RichEmbed()
		.setColor('#0099ff')
		.addField('Roulette', `${random1} | ${random1} | ${random1}`);
		
		message.channel.send(roulette);
		
	}
}