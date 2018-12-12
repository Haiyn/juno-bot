module.exports = (client, message) => {

  if (message.author.bot) return;
  if (message.channel.id == client.config.autodeletion_channels && client.config.defaultSettings.autodeletion == 'on') {
    try {
      client.logger.log("Message queued for deletion in 10 seconds: " + message.content);
      message.delete(10000);
      return;
    }
    catch {
      client.logger.warn("Could not autodlete message: " + ex);
    }
  }
  if (message.author.id !== client.config.ownerID) return;

  const settings = client.config.defaultSettings;
  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  //if (args == 0) return;

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
