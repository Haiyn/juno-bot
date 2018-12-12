exports.run = (client, message, args) => {
    const { Attachment } = require('discord.js');
    const text = args.slice().join(" ");
    const urlregex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
    const fileregex = /^.((\\|\/)[a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.png$/i;

    client.deleteMessage(message, 10);
    
    if(args == "") {
      client.logger.warn("Cannot run Command: announce (empty string)");
      return;
    }
    if(urlregex.test(args) || fileregex.test(args)) {
      try {
        const img = new Attachment(text);
        message.channel.send(img);
      }
      catch (ex) {
        client.logger.warn("Could not send attachment. Maybe the URL was wrong? " + ex);
      }
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
