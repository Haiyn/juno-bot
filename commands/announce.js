exports.run = (client, message, args) => {
  /*if(args == "") {
    message.delete(0);
    client.logger.error("Cannot run Command: announce (empty string)");
    msg = message.channel.send("Usage: g!announce [message]")
    .then(msg => {
      msg.delete(10000);
    })
  }
  else {
    const text = args.slice().join(" ");
    message.delete(0);
    message.channel.send(text);
  }*/
  client.Logger.cmd("Ran command announce");
}

exports.conf = {
	enabled: true,
	aliases: ["say"],
	permLevel: "GAIA Creator"
};

exports.help = {
	name: "announce",
	category: "Setup",
	description: "Announce something with the bot.",
	usage: "announce [message]"
};
