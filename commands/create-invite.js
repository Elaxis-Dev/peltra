const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

module.exports = {
	name: 'create-invite',
	description: 'create-invite',
	execute(message, args){
		message.delete();
		
		message.channel.createInvite({maxAge: 0, maxUses: 0}).then(invite => message.channel.send(`Votre lien d'invitation : \n\nhttps://discord.gg/${invite.code}`))
	}
}