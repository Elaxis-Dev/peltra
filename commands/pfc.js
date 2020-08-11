const Discord = require("discord.js");
const client = new Discord.Client();
const conf = require("./conf.json");

module.exports = {
	name: 'pfc',
	description: 'pfc',
	execute(message, args){

		message.delete();

		if(args == "") return message.channel.send("> :x: Merci de dire, **diamant** ou **papier** ou **ciseaux**");

		let pfc = Math.floor((Math.random() * 3) + 1)

		let papier = "<:paper:715480565771403317>";
		let pierre = "<:diamond:715481056182140938>";
		let ciseaux = "<:scissors:715481156501635132>";

		if(args == "easter-egg") {
			message.delete();
			return message.channel.send('> ')
		}
		if(pfc == 1) {
			if(args == "diamant" || args == "pierre") {
				message.channel.send("> <:gg:728942583774052392> " + message.author.username + " <:diamond:715481056182140938> <:arrow:714827684898930769> " + ciseaux + " Tu as gagné !");
			}
			if(args == "papier" || args == "feuille") {
				message.channel.send("> " + message.author.username + " <:paper:715480565771403317> <:arrow:714827684898930769> " + ciseaux + " J'ai gagné, **GG** !");
			}
			if(args == "ciseaux") {
				message.channel.send("> " + message.author.username + " <:scissors:715481156501635132> <:arrow:714827684898930769> " + ciseaux + " Oups, égalité !");
			}
		} if(pfc == 2) {
			if(args == "papier" || args == "feuille") {
				message.channel.send("> <:gg:728942583774052392> " + message.author.username + " <:paper:715480565771403317> <:arrow:714827684898930769> " +  pierre + "  Tu as gagné !");
			}
			if(args == "ciseaux") {
				message.channel.send("> " + message.author.username + " <:scissors:715481156501635132> <:arrow:714827684898930769> " +  pierre + " J'ai gagné, **GG** !");
			}
			if(args == "diamant" || args == "pierre") {
				message.channel.send("> " + message.author.username + " <:diamond:715481056182140938> <:arrow:714827684898930769> " +  pierre + " Oups, égalité !");
			}
		} if(pfc == 3) {
			if(args == "ciseaux") {
				message.channel.send("> <:gg:728942583774052392> " + message.author.username + " <:scissors:715481156501635132> <:arrow:714827684898930769> " +  papier + "  Tu as gagné !");
			}
			if(args == "diamant" || args == "pierre") {
				message.channel.send("> " + message.author.username + " <:diamond:715481056182140938> <:arrow:714827684898930769> " +  papier + " J'ai gagné, **GG** !");
			}
			if(args == "papier" || args == "feuille") {+
				message.channel.send("> " + message.author.username + " <:paper:715480565771403317> <:arrow:714827684898930769> " +  papier + " Oups, égalité !");
			}
		}

	}
}
