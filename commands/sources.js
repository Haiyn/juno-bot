exports.run = (client, message, args, config) => {

	const Discord = require("discord.js");
	const embed = new Discord.RichEmbed()
		.setTitle("Artist Credits")
		.setDescription("Sources of used media in this guild:")
		.setColor(settings.colorGAIA)
		.setTimestamp(settings.timestamp)
		.setFooter("END OF TRANSMISSION", "https://i.imgur.com/DhTMUKN.png")
		.setAuthor(client.user.username, client.user.avatarURL)
		.addField("Guild Icon:",
				  "[Davies, Paul: *The Art Of Horizon Zero Dawn.*](https://titanbooks.com/the-art-of-horizon-zero-dawn-limited-edition-9015/)")
		.addField("GAIA Icon:",
				  "[inertSpark: *Horizon Zero Dawn - GAIA Prime Logos.*](https://inertspark.deviantart.com/)")
		.addField("Advertisements:",
				  "[JoannaVu: *Horizon Font.*](http://www.fontspace.com/joannavu)")
		.addField("#alignment:",
				  "[Karakter Design Studio](http://karakter.de/wordpress/#/); [Bolt, Lucas: *Horizon Zero Dawn - Mountain/Jungle Landscapes.*](https://www.artstation.com/lucasbolt); [ExtraSolar: *The Sun-Hawk.*](https://www.redbubble.com/people/extrasolar)")
		.addField("aloyThinking emote:",
				  "_Zky#3281")
		.addField("Unsourced:",
        	  	  "DISCLAIMER ©2016 Sony Interactive Entertainment Europe. Horizon Zero Dawn is a trademark of Sony Interactive Entertainment America LLC. Developed by Guerrilla Games.");

	message.channel.send(embed);
}

exports.conf = {
	enabled: true,
	aliases: ["srcs"],
	permLevel: "GAIA Tester"
};

exports.help = {
	name: "sources",
	category: "Info",
	description: "Shows the sources for all media used in the guild.",
	usage: "sources"
};
