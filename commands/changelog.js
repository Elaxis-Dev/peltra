const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

module.exports = {
	name: 'changelog',
	description: 'changelog',
	execute(message, args){
		
		
		if(args == "") {
		message.delete();
		
		const Embed = new Discord.RichEmbed()
		.setColor(0xFFC300)
		.setTitle(`Dernière mise à jour (Version ` + conf.version + ")")
		.addField(`Nouvelle fonctionnalitée`, `Blocage de certains mots dans le **+pl** & le **+pub**`)
		.setFooter("Peltra | Par Elaxis (Alexis)#5202");
		
		message.channel.send(Embed);
		} else if(args == "1.0.7" || args == "107") {
			message.delete();
		
		const Embed = new Discord.RichEmbed()
		.setColor(0xFFC300)
		.setTitle(`Mise à jour (Version 1.0.7 - Vendredi 29 Mai 2020)`)
		.addField(`Nouvelle fonctionnalitée`, `Blocage de certains mots dans le **+pl** & le **+pub**`)
		.setFooter("Peltra | Par Elaxis (Alexis)#5202");
		
		message.channel.send(Embed);
		} else if(args == "1.0.6" || args == "106") {
			message.delete();
		
		const Embed = new Discord.RichEmbed()
		.setColor(0xFFC300)
		.setTitle(`Mise à jour (Version 1.0.6 - Mercredi 27 Mai 2020)`)
		.addField(`Nouvelle commande`, `Ajout de la commande +pub, celle ci permet de faire de la publicité dans tout les serveurs possédant peltra (https://elaxis.xyz/peltra/docs.html#pub-guide)`)
		.setFooter("Peltra | Par Elaxis (Alexis)#5202");
		
		message.channel.send(Embed);
		} else if(args == "1.0.5" || args == "105") {
			message.delete();
		
		const Embed = new Discord.RichEmbed()
		.setColor(0xFFC300)
		.setTitle(`Mise à jour (Version 1.0.5 - Mercredi 27 Mai 2020)`)
		.addField(`Nouvelle commande`, `Ajout de la commande +here, celle ci permet de créer des annonces en mentionnant @here`)
		.addField(`Nouvelle commande`, `Ajout de la commande +everyone, celle ci permet de créer des annonces en mentionnant @everyone`)
		.addField(`Nouvelle commande`, `Ajout de la commande +prefix, celle ci permet de changer le préfixe du bot`)
		.setFooter("Peltra | Par Elaxis (Alexis)#5202");
		
		message.channel.send(Embed);
		} else if(args == "1.0.4" || args == "104") {
			message.delete();
		
		const Embed = new Discord.RichEmbed()
		.setColor(0xFFC300)
		.setTitle(`Mise à jour (Version 1.0.4 - Mardi 26 Mai 2020)`)
		.addField(`Nouvelle commande`, `Ajout de la commande +poll, celle ci permet de créer des sondages. Oui / Non`)
		.addField(`Nouvelle fonctionnalité`, `Auto Restart dès que le bot crash`)
		.addField(`Optimisation du code`, `Optimisation de tout le code du bot`)
		.setFooter("Peltra | Par Elaxis (Alexis)#5202");
		
		message.channel.send(Embed);
		} 
	}
}
