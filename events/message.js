module.exports = (client, message) => {

  //REQUIRED VARIABLES
  const settings = client.config.defaultSettings;
  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));   //TODO FIX!

  //MESSAGE PROCEDURE
  if (CatchIrrelevantMessages()) return;

  if (CatchSpecialMessages()) return;

  if (SpecialMsgsChecked()) return;

  PushFlags();

  client.logger.cmd(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args, level);

  //FUNCTIONS
  function CatchIrrelevantMessages() {
    if (message.author.bot) return true;
    if (message.content.indexOf(settings.prefix) !== 0) return true;
    if (!cmd) return true;

    if (cmd && !message.guild && cmd.conf.guildOnly) {
      message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
      client.logger.log(`DM Forgery attempty by ${message.author}`);
      return true;
    }
    return false;
  }

  function CatchSpecialMessages() {
    /*if(message.channel.id == client.config.nonEssentialIDs.alignmentID) {
      if(client.config.defaultSettings.autodeletion == 'on') {
        try {
          client.logger.log(`Message detected in ${message.channel.id}. Autodeletion on. Staging deletion...`);
          message.delete(10000);
          return true;
        }
        catch (ex) {
          client.logger.Error("Could not delete message. " + ex)
        }
      }
    }*/

    if(message.author.id == client.config.nonEssentialIDs.tatsumakiID || client.config.ownerID) {
      try {
        var response = client.manageRoles(message);
        if(response) client.logger.log(`Updated roles for ${message.author.username}`);
        return true;
      }
      catch (ex) {
        client.logger.error("Could not update roles. " + ex);
      }
    }
    return false;
  }

  function PushFlags() {
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
  }
};
