exports.run = (client, message, args) => {
  if(args == "") {
    client.logger.warn("Cannot run Command: announce (empty string)");
    try {
      msg.delete(0);
    }
    catch (ex) {
      client.logger.warn("Could not delete message." + ex);
    }
  }
  else {
    const text = args.slice().join(" ");
    try {
      msg.delete(0);
    }
    catch (ex) {
      client.logger.warn("Could not delete message." + ex);
    }
    message.channel.send(text);
  }
}

exports.conf = {
	enabled: true,
	aliases: ["say"]
};

exports.help = {
	name: "announce",
	category: "Setup",
	description: "Announce something with the bot.",
	usage: "announce [message]"
};
