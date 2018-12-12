exports.run = (client, message, args) => {
  message.channel.send("Invite for this guild: https://discord.gg/xxxxxxx");
}

exports.conf = {
	enabled: true,
	aliases: []
};

exports.help = {
	name: "invite",
	category: "Info",
	description: "Shows the permanent invite link for this server.",
	usage: "invite"
};
