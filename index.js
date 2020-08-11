const Discord = require("discord.js");
const config = require("./config.json");

const canvas = require("canvas");

const mongoose = require('mongoose');
const arraySort = require('array-sort');
const table = require('table');
const Eco = require("./modules/economie");
const fs = require('fs');

const client = new Discord.Client();

const giveaways = require("discord-giveaways");
const ms = require("ms");

client.commands = new Discord.Collection();

const guildInvites = new Map();

mongoose.connect("mongodb+srv://peltra:S7qzXZ98K3SDoSrZ@peltra-gural.mongodb.net/peltra?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true}).then(() => console.log('Database connexion is ok !'));

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.on("guildMemberAdd", (member) => {
  client.user.setActivity(config.prefix + `help | Sur ${client.guilds.size} serveurs et avec ${client.users.size} utilisateurs`);
  const server = member.guild.id;
  //console.log(`${server} | ${server.id}`);
  if(server == "708315019938496645"){
    let role = client.guilds.get("708315019938496645").roles.get("708330457325895761");
    member.addRole(role).catch(console.error);
    const exampleEmbed = new Discord.RichEmbed()
          .setColor('#00ff11')
          .setTitle('Join')
          .addField('Arrivée', `${member.user.username}`, true)
          .setFooter('Peltra | 2020, made by Alexis#5202');
    //client.guild.get('708315019938496645').channels.get('708318957756743831').send(exampleEmbed);
    client.guilds.get("708315019938496645").channels.get('708318957756743831').send(exampleEmbed);
}
});

client.on("guildMemberRemove", (member) => {
  client.user.setActivity(config.prefix + `help | Sur ${client.guilds.size} serveurs et avec ${client.users.size} utilisateurs`);
  const server = member.guild.id;
  //console.log(`${server} | ${server.id}`);
  if(server == "708315019938496645"){
    let role = client.guilds.get("708315019938496645").roles.get("708330457325895761");
    member.addRole(role).catch(console.error);
    const exampleEmbed = new Discord.RichEmbed()
          .setColor('#ff1100')
          .setTitle('Leave')
          .addField('Départ', `${member.user.username}`, true)
          .setFooter('Peltra | 2020, made by Alexis#5202');
    //client.guild.get('708315019938496645').channels.get('708318957756743831').send(exampleEmbed);
    client.guilds.get("708315019938496645").channels.get('708318957756743831').send(exampleEmbed);
}
});

client.on("ready", guild => {
  console.log(`bot démarré, avec ${client.users.size} utilisateurs, dans ${client.channels.size} salons de ${client.guilds.size} serveurs.`);
  client.user.setActivity(config.prefix + `help | Sur ${client.guilds.size} serveurs et avec ${client.users.size} utilisateurs`);
});

client.on("guildCreate", guild => {
  client.guilds.get("708315019938496645").channels.get('709379233507573770').setName(`${client.guilds.size} / 75 Serveurs`);
  console.log(`J'ai rejoint un nouveau discord: ${guild.name} (id: ${guild.id}). The serveur à ${guild.memberCount} membres!`);
  client.user.setActivity(config.prefix + `help | Sur ${client.guilds.size} serveurs et avec ${client.users.size} utilisateurs`);
  const exampleEmbed = new Discord.RichEmbed()
        .setColor('#00ff11')
        .setTitle(`Join de ${guild.name}`)
        .addField(`:family: Utilisateurs`, `${guild.memberCount} utilisateurs`, true)
        .addField(`:newspaper: Salons`, `${guild.channels.size} salons`, true)
        .setFooter('Peltra | 2020, made by Alexis#5202');

        let logsChannel = client.guilds.get("708315019938496645").channels.get("708333042250285226");
        logsChannel.send(exampleEmbed);
});

client.on("guildDelete", guild => {
  client.guilds.get("708315019938496645").channels.get('709379233507573770').setName(`${client.guilds.size} / 75 Serveurs`);
  console.log(`J'ai été kick du discord: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(config.prefix + `help | Sur ${client.guilds.size} serveurs et avec ${client.users.size} utilisateurs`);
  const exampleEmbed = new Discord.RichEmbed()
        .setColor('#ff0000')
        .setTitle(`Leave de ${guild.name}`)
        .addField(`:family: Utilisateurs`, `${guild.memberCount} utilisateurs`, true)
        .addField(`:newspaper: Salons`, `${guild.channels.size} salons`, true)
        .setFooter('Peltra | 2020, made by Alexis#5202');

        let logsChannel = client.guilds.get("708315019938496645").channels.get("708333042250285226");
        logsChannel.send(exampleEmbed);
});

let region = {
	"brazil": ":flag_br: Brazil",
	"eu-central": ":flag_eu: Central Europe",
    "singapore": ":flag_sg: Singapore",
    "us-central": ":flag_us: U.S. Central",
    "sydney": ":flag_au: Sydney",
    "us-east": ":flag_us: U.S. East",
	"us-south": ":flag_us: U.S. South",
	"us-west": ":flag_us: U.S. West",
	"eu-west": ":flag_eu: Western Europe",
	"vip-us-east": ":flag_us: VIP U.S. East",
	"london": ":flag_gb: London",
	"amsterdam": ":flag_nl: Amsterdam",
	"hongkong": ":flag_hk: Hong Kong",
	"russia": ":flag_ru: Russia",
	"southafrica": ":flag_za:  South Africa"
};

client.on("message", async message => {

	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

  if(!prefixes[message.guild.id]){
	  prefixes[message.guild.id] = {
		  prefixes: config.prefix
	  };
  }



  if(message.author.bot) return;
  if(message.content.indexOf(prefixes[message.guild.id].prefixes) !== 0) return;

  const swearWords = ["pute", "connasse"];
    if(message.content.includes(swearWords)){
		message.delete();
      message.reply("> :x: Ce mot est banni.");
    }

  Eco.findOne({
    User_ID: message.author.id
  }, (err, economie) => {
    if(err) console.log(err)
    if(!economie){
      var compte = new Eco({
        User_ID: message.author.id,
        Pseudo: message.author.username,
        Xp: 0,
        Level: 0
      })
      compte.save()
    } else {
      economie.Xp = economie.Xp +1
      var main_level = economie.Level;
      var next_level = economie.Level * 30
      if(next_level <= economie.Xp){
        economie.Level = main_level +1
        message.channel.send(`> Bravo **${message.author}**, tu viens de passer niveau **${main_level +1}** !! (Supprimer ce module = +support)`)
        console.log(`XP => ${message.author.username} go to ${main_level +1}`)

        let multiLogChannel = client.guilds.get("708315019938496645").channels.get("709518084737859666");
        const exampleEmbed = new Discord.RichEmbed().setColor('#ff0000').setTitle(`XP`).addField(`${message.author.username} -> ${main_level +1}`, true);
        multiLogChannel.send(exampleEmbed);
      }
      economie.save()

    }
  })

  let prefixe = prefixes[message.guild.id].prefixes;


  const args = message.content.slice(prefixe.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.author.id == "414017710091927552" || message.author.id == "482979509310849046" || message.author.id == "414131388548120576" || message.author.id == "708305922748842035" || message.author.id == "521402668498026513" || message.author.id == "573077791201951764") {
    message.channel.send(":x: Il semblerait que vous vous êtes fait bannir du bot.")
  } else {

	if(command === "prefix") {
		if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``MANAGE_GUILD``");
		if(!args[0] || args[0 == "help"]) return message.channel.send("> :x: Usage: +prefix <prefix souhaité>");

		let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

		prefixes[message.guild.id] = {
			prefixes: args[0]
		};

		fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
			if (err) console.log(err)
		});

		let sEmbed = new Discord.RichEmbed()
		.setColor("#FF9900")
		.setTitle("Prefix changé avec succès !")
		.setDescription(`Nouveau préfixe : ${args[0]}`);

		message.channel.send(sEmbed);

		message.delete()
	}

  if(command === "serverlist") {
    if(message.author.id === "229178398893801472") {
      message.channel.send(client.guilds.map(r => r.name + ` | **${r.memberCount}** membres`));
      message.channel.send(`\n \n **${client.guilds.size} serveurs**`)
    } else {
      message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``Elaxis (Alexis)#5202``");
    }
  }

   if(command === "help") {
    message.channel.send(":x: Aide déplacée : http://www.elaxis.xyz/peltra/docs.html");
  } if(command === "inviteboard") {

	  let invites = await message.guild.fetchInvites().catch(error => {
		  return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``MANAGE_GUILD``");
	  });
	  invites = invites.array();
	  arraySort(invites, 'uses', { reverse: true });

	  let possibleInvites = [['User', 'Uses']];
	  invites.forEach(function(invite) {
		possibleInvites.push([invite.inviter.username, invite.uses]);
	  })

	  //const embed = new Discord.RichEmbed().setColor('#0099ff').addField(`Invitations du serveur :`, `\`\`\`${table.table(possibleInvites)}\`\`\``);

	  //message.channel.send(embed);
	  message.channel.send(`${table.table(possibleInvites)}`);

  } if(command === "invites") {

	  const member = message.author;

	  const cachedInvites = guildInvites.get(message.guild.id);
	  const newInvites = await member.guild.fetchInvites();

	  guildInvites.set(member.guild.id, newInvites);
	  try {
		  const usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses);
		  const embed = new Discord.RichEmbed()
			.setDescription(`${member.user.tag} est le ${member.guild.memberCount} à avoir rejoint. \n Il a rejoint en utilisant ${usedInvite.inviter.tag} \n Avec un total de ${usedInvite.uses} invitations`).setTimestamp().setThumbnail(`${member.user.displayAvatarURL}`).setTitle(`${usedInvite.url}`);
	  } catch(err) {
		console.log(err);
	  }

  } if(command === "suggest") {
    if(args == '') {
      message.channel.send("> :x: Veuillez saisir une suggestion !");
    } else {
		const sayMessage = args.join(" ");
      const exampleEmbed = new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle('Suggestion de ' + message.author.username)
      .addField('Suggestion : ', `${sayMessage}`, true)

      .setFooter('Peltra | 2020, made by Alexis#5202');

      let suggestChannel = client.guilds.get("708315019938496645").channels.get("708432833709998091");
      suggestChannel.send(exampleEmbed).then(messageReaction => {
				messageReaction.react('👎');
				messageReaction.react('👍');
			});
      message.channel.send(message.author.username + `, votre suggestion nous a été envoyé, merci !`);
    }

  }

}
});


client.on("message", async message => {

	let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

  if(!prefixes[message.guild.id]){
	  prefixes[message.guild.id] = {
		  prefixes: config.prefix
	  };
  }

  if(message.author.bot) return;
  if(message.content.indexOf(prefixes[message.guild.id].prefixes) !== 0) return;

  let arge = message.content.substring(config.prefix.length).split(' ');

  let prefixe = prefixes[message.guild.id].prefixes;


  const args = message.content.slice(prefixe.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.author.id == "414017710091927552" || message.author.id == "482979509310849046" || message.author.id == "708305922748842035" || message.author.id == "414131388548120576" || message.author.id == "521402668498026513" || message.author.id == "573077791201951764") {
    message.channel.send(":x: Il semblerait que vous vous êtes fait bannir du bot.")
  } else {


	if(message.content === "peltra"){
		message.channel.send(`Mon préfixe sur ce serveur est : ${prefixe} `);
	}

  switch (arge[0]) {
	  case "ping":
		client.commands.get('ping').execute(message, args);
	  break;
	  case "changelog":
		client.commands.get('changelog').execute(message, args);
	  break;
	  case "create-invite":
		client.commands.get('create-invite').execute(message, args);
	  break;
	  case "pfc":
		client.commands.get('pfc').execute(message, args);
	  break;
	  case "roulette":
		client.commands.get('roulette').execute(message, args);
	  break;
	  case "giveaway":
		client.commands.get('giveaway').execute(message, args);
	  break;
  }

  if(command === "poll") {
	  if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``MANAGE_MESSAGES``");

			message.delete();
		const Embed = new Discord.RichEmbed()
		.setColor(0xFFC300)
		.setTitle(`Sondages`)
		.setDescription("+poll <texte> | Lance un sondage OUI ou NON");

		if(!arge[1]){
			message.channel.send(Embed);
		} else {

		let msgArgs = arge.slice(1).join(" ");

			const EmbedSondage = new Discord.RichEmbed()
				.setColor(0xFFC300)
				.setTitle(`Nouveau Sondage`)
				.setDescription(`<:arrow:714827684898930769> ${msgArgs}`)
				.setFooter(`Sondage par ${message.author.username}`);

			message.channel.send(EmbedSondage).then(messageReaction => {
				messageReaction.react('👍').then(() => messageReaction.react('👎'));
			});
		}
  }

  if(command === "pl") {
	  if(message.author.id === "414017710091927552" || message.author.id === "475215232961085440" || message.author.id == "521402668498026513" || message.author.id == "521402668498026513" || message.author.id == "573077791201951764") {
		  message.channel.send(":x: Il semblerait que vous vous êtes fait bannir du bot. C'est dommage.")
		} else {
			if(args == '') {
			message.channel.send("> :x: Veuillez saisir un message !");
		} else {
			if(message.content.includes("@here") || message.content.includes("@everyone") || message.content.includes("test") || message.content.includes("test") || message.content.includes("pute") || message.content.includes("connard")  || message.content.includes("fdp") || message.content.includes("F D P") || message.content.includes("discord.gg")){
				message.channel.send("> :x: Votre message contient des caractères interdits !");
			} else {
				const sayMessage = args.join(" ");
				const embed = new Discord.RichEmbed()
				.setColor('#0099ff')
				.setTitle('Message de ' + message.author.username)
				.addField('Message : ', `${sayMessage}`, true)
				.addField('Serveur : ', `${message.guild}`)
				.setFooter('Peltra | 2020, made by Alexis#5202 (+pl <message> pour parler) ' + message.author.id);
				client.channels.findAll('name', 'public-lounge').map(channel => channel.send({embed}))
				message.channel.send(message.author.username + `, votre message a été envoyé !`);
			}
		}
	  }


  }

  if(command === "pub") {
	  if(message.author.id === "688475685517393921" || message.author.id === "660407956671823873" || message.author.id == "521402668498026513" || message.author.id == "573077791201951764") {
		  message.channel.send(":x: Il semblerait que vous vous êtes fait bannir du +pub. C'est dommage.")
	  } else {
		  if(args == '') {
			message.channel.send("> :x: Veuillez saisir un message !");
    } else {
			if(message.content.includes("@here") || message.content.includes("@everyone") || message.content.includes("test") || message.content.includes("test") || message.content.includes("pute") || message.content.includes("connard") || message.content.includes("fdp") || message.content.includes("F D P")){
				message.channel.send("> :x: Votre message contient des caractères interdits !");
			} else {
				const sayMessage = args.join(" ");
				const embed = new Discord.RichEmbed()
				.setColor('#0099ff')
				.setTitle('Publicité de ' + message.author.username)
				.addField('Publicité : ', `${sayMessage}`, true)
				.addField('Serveur : ', `${message.guild}`)
				.setFooter('Peltra | 2020, made by Alexis#5202 (+pub <message> pour envoyer sa pub) ' + message.author.id);
				client.channels.findAll('name', 'public-pub').map(channel => channel.send({embed}))
				message.channel.send(message.author.username + `, votre message a été envoyé !`);
			}
	  }


  }
  }

  if(command === "everyone") {
	message.delete();
	if(!message.member.hasPermission('MENTION_EVERYONE') ) {
		return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``MENTION_EVERYONE``");
	} else {
		if(args == "") return message.channel.send("> :x: Merci de saisir votre message !");
		message.delete();
		const sayMessage = args.join(" ");
		const EmbedEver = new Discord.RichEmbed()
			.setColor(0xFA1100)
			.setTitle(`Nouvelle annonce`)
			.setDescription(`<:arrow:714827684898930769> ${sayMessage}`)
			.setFooter(`Everyone par ${message.author.username}`);

		message.channel.send("@everyone");
		message.channel.send(EmbedEver);
		}

	}


  if(command === "here") {
	if(!message.member.hasPermission('MENTION_EVERYONE')) {
		return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``MENTION_EVERYONE``");
	} else {
		if(args == "") return message.channel.send("> :x: Merci de saisir votre message !");
		message.delete();
		const sayMessage = args.join(" ");
		const EmbedEver = new Discord.RichEmbed()
			.setColor(0xFA8A00)
			.setTitle(`Nouvelle annonce`)
			.setDescription(`<:arrow:714827684898930769> ${sayMessage}`)
			.setFooter(`Here par ${message.author.username}`);

		message.channel.send("@here");
		message.channel.send(EmbedEver);
		}

	}

  if(command === "pl-annonce"){
    if(message.author.id === "229178398893801472") {
		const sayMessage = args.join(" ");
      const embed = new Discord.RichEmbed()
      .setColor('#ff0000')
      .setTitle('Annonce de ' + message.author.username)
      .addField('Annonce : ', `${sayMessage}`, true)
      .setFooter('Peltra | 2020, made by Alexis#5202');
      client.channels.findAll('name', 'public-lounge').map(channel => channel.send({embed}))
      message.channel.send(message.author.username + `, votre message a été envoyé !`);

      let multiLogChannel = client.guilds.get("708315019938496645").channels.get("709518084737859666");
    const exampleEmbed = new Discord.RichEmbed().setColor('#ff0000').setTitle(`CHAT INTER-SERVEURS`).addField(`Command pl by ${message.author.username},`, `${args}`);
    multiLogChannel.send(exampleEmbed);
    } else {
		message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``Elaxis (Alexis)#5202``");
	}
  }

  if(command === "member-stats" || command === "mstats") {
	  const membre = message.mentions.members.first();
	  if(!membre) return message.channel.send(":x: Veuillez mentionner un utilisateur");
	  const embed = new Discord.RichEmbed()
	  .setColor('#ff0000')
	  .setTitle(`Statistiques de ${membre.username}`)
	  .addField('> ID :', `${membre.id}`)
	  .addField('> Crée le :', `${membre.user.createdAt}`)
	  .addField('> Rôles :', membre.roles.map(r => `${r}`).join(' | '))
	  .setFooter('Peltra | 2020, made by Alexis#5202');

	  message.channel.send(embed);
  }
// message.channel.guild.roles.map(r => `${r}`).join(' | ')
  if(command === "server-stats" || command === "sstats") {
	  const embed = new Discord.RichEmbed()
	  .setColor('#ff0000')
	  .setTitle(`${message.guild.name}`)
	  .addField('> ID :', `${message.guild.id}`)
	  .addField(`> Owner :`, message.guild.owner.user.username)
	  .addField('> Création :', `${message.channel.guild.createdAt.toUTCString().substr(0, 16)}`)
	  .addField(`> Rôles : ${message.guild.roles.size}`, "+roles pour voir les rôles")
	  .addField(`> Salons :`, message.guild.channels.size)
	  .setFooter('Peltra | 2020, made by Alexis#5202');//.catch(error => {message.channel.send("> :x: Merci de réésayer plus tard, et si le problème perciste, accédez au serveur support ``+support``")});

	  message.channel.send(embed).catch(error => {message.channel.send("> :x: Merci de réésayer plus tard, et si le problème perciste, accédez au serveur support ``+support``")});
	} if(command === "roles") {
		message.channel.send("> :x: Petit filou, cette commande est désactivée.")
	}

  if(command === "pingtest") {
    message.react('👍').then(() => message.react('👎'));

    const filter = (reaction, user) => {
      return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
      .then(collected => {
        const reaction = collected.first();

        if (reaction.emoji.name === '👍') {
          message.reply('Vous avez réagit avec : 👍');
        } else {
          message.reply('Vous avez réagit avec : 👎');
        }
      })
      .catch(collected => {
        message.reply("Vous n'avez pas réagit'");
      });
  }

  if(command === "support") {
    message.channel.send("> Voici le serveur discord en cas de problème, ou d'idée ! *Lien : https://discord.gg/CVa5yda*");
  }

	if(command === "canvas") {
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }

if(command === "stats") {
    if(message.author.id == "229178398893801472") {
      const exampleEmbed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Stats')
        .addField(':computer: Serveurs', `Actuellement sur ${client.guilds.size} serveurs`, true)
        .addField(':family: Utilisateurs', `Avec ${client.users.size} utilisateurs`, true)
        .addField(':newspaper: Salons', `et ${client.channels.size} salons`, true)
        .addField(':microphone2: Connexion vocales', `Dans ${client.voiceConnections.size} salons vocaux`, true)
        .addField('\u200B', '\u200B')
        .addField(':hourglass_flowing_sand: UpTime', `Depuis ${client.uptime / 60000} minutes`, true)
        .setFooter('Peltra 2020', 'https://discordapp.com/channels/@me/707640292496638063/707640616691040266');

    message.channel.send(exampleEmbed).catch(error => {message.channel.send("> :x: Merci de vérifier mes permissions, il me manque la permission suivante : ``EMBED_LINKS``")});
    } else {
      message.channel.send(":x: Vous n'avez pas la permission d'utiliser cette commande !")
    }
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(`${message.author.username} <:arrow:714827684898930769> ${sayMessage}`);
  }

  if(command === "kick") {
    if(!message.member.hasPermission('KICK_MEMBERS') )
      return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``KICK_MEMBERS``");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.channel.send("> :x: Veuillez mentioner un utilisateur valide (<@666327075199778818> ou 666327075199778818)");
    if(!member.kickable)
      return message.channel.send("> :x: Je ne peut pas kicker " + member + ", vérifiez ces permissions !");
    let reason = args.slice(1).join(' ');
    if(!reason) return reason = "> :x: Veuillez saisir une raison, je ne kick pas pour un rien !";

	member.sendMessage('Vous avez été kick de **' + message.guild.name + '** par **' + message.author.username + '** \nPour la raison suivante : ' + reason);
    await member.kick(reason)
    .catch(error => {message.channel.send("> :x: Merci de vérifier mes permissions, il me manque la permission suivante : ``KICK_MEMBERS``")});
    message.channel.send(`${member.user.tag} a bien été kické par ${message.author.tag} pour ${reason}`);

  }

  if(command === "ban") {
    if(!message.member.hasPermission('BAN_MEMBERS') )
      return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``BAN_MEMBERS``");

    let member = message.mentions.members.first();
    if(!member)
      return message.channel.send("> :x: Veuillez mentioner un utilisateur valide (<@666327075199778818> ou 666327075199778818)");
    if(!member.bannable)
      return message.channel.send("> :x: Je ne peut pas kicker " + member + ", vérifiez ces permissions !");

    let reason = args.slice(1).join(' ');
    if(!reason) return reason = "> :x: Veuillez saisir une raison, je ne kick pas pour un rien !";

	member.sendMessage('Vous avez été banni de **' + message.guild.name + '** par **' + message.author.username + '** \nPour la raison suivante : ' + reason);
    await member.ban(reason)
      .catch(error => {message.channel.send("> :x: Merci de vérifier mes permissions, il me manque la permission suivante : ``BAN_MEMBERS``")});
    message.channel.send(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    if(!message.member.hasPermission('MANAGE_MESSAGES') ) {
      return message.channel.send("> :x: Merci de vérifier vos permissions, il vous manque la permission suivante : ``MANAGE_MESSAGES``");
    }

    message.delete();
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send("> :x: Merci de préciser un nombre entre 2 et 100");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Je ne peut pas suprimer les messages car: ${error}`));
  }

  if(command === "invite") {
      message.channel.send(`> Hey ${message.author} ! Voici le lien *d'invitation* pour **m'inviter** sur ton serveur !` + config.invite)
  }
}

});

client.login(config.token);
