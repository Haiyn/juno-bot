exports.run = async (client, message, args) => {

    if(args == 'on') {
      client.config.defaultSettings.autodeletion = args;
      message.channel.send(`:white_check_mark: Autodeletion set to \`${client.config.defaultSettings.autodeletion}\``);
      return;
    }

    if(args == 'off') {
      client.config.defaultSettings.autodeletion = args;
      message.channel.send(`:x: Autodeletion set to \`${client.config.defaultSettings.autodeletion}\``);
      return;
    }

    message.channel.send("Parameters must be either `on` or `off`!");

};

exports.conf = {
  enabled: true,
  aliases: ["adel"]
};

exports.help = {
  name: "autodeletion",
  category: "System",
  description: "Enables or disables autodeletion in set channels.",
  usage: "autodeletion [on/off]"
};
