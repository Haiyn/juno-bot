module.exports = (client, message) => {

  /*TODO Create security guild ID check

  message.channel.guild.id != client.config.defaultSettings.validGuilds) {
    client.logger.log(`invalid guild: ${client.config.defaultSettings.validGuilds} != ${message.channel.guild.id}`);
    return;
  }*/
  if (message.author.bot) return;

  //Checks if the message was sent in an autodeletion specified in the config (autodeletionChannels) and wether or not the autodeletion setting is enabled.
  if (message.channel.id == client.config.autodeletionChannels && client.config.defaultSettings.autodeletion == 'on') {
    client.deleteMessage(message, 10000);
    return;
  }

  //Currently the bot is only usable by the owner
  if (message.author.id !== client.config.ownerID) return;

  const settings = client.config.defaultSettings;
  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;

  if (!message.guild) {
    client.logger.log(`DM by \"${message.author.username}\" (${message.author.id}): ${message.content}`);
    if(cmd) message.channel.send("Whoops! You can't run this command via private message. Please run it in a guild!");
    return;
  }

  client.logger.cmd(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args);
};
