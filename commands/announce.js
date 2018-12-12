exports.run = (client, message, args) => {
    const { Attachment } = require('discord.js');
    const text = args.slice().join(" ");
    const urlregex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

    try {
      message.delete(0);
    }
    catch (ex) {
      client.logger.warn("Could not delete message: " + ex);
    }

    if(args == "") {
      client.logger.warn("Cannot run Command: announce (empty string)");
      return;
    }
    if(args.indexOf())
    if(urlregex.test(args) || args.indexOf('./src/') == 0) {
      const img = new Attachment(text);
      message.channel.send(img);
      return;
    }
    message.channel.send(text);
};

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
