exports.run = (client, message, args) => {

	const Discord = require("discord.js");
	const embed = new Discord.RichEmbed()
		.setTitle("Info")
		.setDescription("Welcome to the Space Fleet! My name is Juno.")
		.setThumbnail(client.user.avatarURL)
		.setColor(client.config.defaultSettings.color)
		.setAuthor(client.user.username, client.user.AvatarURL)
		.setFooter("Juno")
		.setTimestamp(client.timestamp())
		.addField("Version:", client.config.version)
		.addField("Host:", "[Heroku PaaS](https://www.heroku.com/)")
		.addField("Owner:", "Haiyn#7709")
		.addField("Created with:", "JavaScript; [Node.js®](https://nodejs.org/en/); [Atom Editor](https://atom.io/); [npm](https://www.npmjs.com/get-npm); [git](https://git-scm.com/)")
		.addField("Dependencies:", "[discord.js](https://discord.js.org/#/); [enmap](https://github.com/eslachance/enmap); [fs](https://github.com/vvakame/fs-git); [moment](https://github.com/moment/moment); [Chalk](https://github.com/chalk/chalk)")
		.addField("GitHub Repository:", "https://github.com/Haiyn/juno-bot");


	message.channel.send(embed);
}

exports.conf = {
	enabled: true,
	aliases: []
};

exports.help = {
	name: "info",
	category: "Info",
	description: "Shows information about Juno Bot.",
	usage: "info"
};
