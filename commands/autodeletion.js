exports.run = async (client, message, args) => {

    if(args == 'on') {
      client.config.defaultSettings.autodeletion = args;
      message.channel.send(`:white_check_mark: Autodeletion set to \`${client.config.defaultSettings.autodeletion}\``);
      return;
    }

    if(args == 'off') {
      client.config.defaultSettings.autodeletion = args;
      message.channel.send(`:negative_squared_cross_mark: Autodeletion set to \`${client.config.defaultSettings.autodeletion}\``);
      return;
    }

    message.channel.send("Parameters must be either `on` or `off`!");

};

exports.conf = {
  enabled: true,
  aliases: ["adel"],
  permLevel: "GAIA Scientist"
};

exports.help = {
  name: "autodeletion",
  category: "System",
  description: "Enables or disables autodeletion.",
  usage: "autodeletion [on/off]"
};
