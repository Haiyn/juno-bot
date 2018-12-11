exports.run = (client, message, args) => {

	/*const Discord = require("discord.js");
	const settings = client.config.visualSettings;	//Removes redundancy

	const embed = new Discord.RichEmbed()
		.setTitle("Info")
		.setDescription("I'm GAIA. An Artificial Intelligence used for shaping the guild and helping its rulers.")
		.setThumbnail(client.user.avatarURL)
		.setColor(settings.colorGAIA)
		.setAuthor(client.user.username, client.user.AvatarURL)
		.setFooter("END OF TRANSMISSION", "https://i.imgur.com/DhTMUKN.png")
		.setTimestamp(settings.timestamp)
		.addField("Version:", settings.version)
		.addField("Host:", "[Heroku PaaS](https://www.heroku.com/)")
		.addField("Owner:", "Haiyn#7709")
		.addField("Created with:", "JavaScript; [Node.js®](https://nodejs.org/en/); [Atom Editor](https://atom.io/); [npm](https://www.npmjs.com/get-npm); [git](https://git-scm.com/)")
		.addField("Dependencies:", "[discord.js](https://discord.js.org/#/); [enmap](https://github.com/eslachance/enmap); [fs](https://github.com/vvakame/fs-git); [moment](https://github.com/moment/moment); [Chalk](https://github.com/chalk/chalk)");

	message.channel.send(embed);*/
	client.logger.cmd("Ran command info");
}

exports.conf = {
	enabled: true,
	aliases: [],
	permLevel: "GAIA Tester"
};

exports.help = {
	name: "info",
	category: "Info",
	description: "Shows information about GAIA Bot.",
	usage: "info"
};
