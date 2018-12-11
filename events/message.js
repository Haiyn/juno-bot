module.exports = (client, message) => {

  //REQUIRED VARIABLES
  client.logger.log("Detected message.");
  if (message.author.bot) {
    client.logger.log("Author is a bot.");
    return;
  }
  //if (message.author.id != client.config.ownerID) return;
  const settings = client.config.defaultSettings;
  if (message.content.indexOf(settings.prefix) !== 0) {
    client.logger.log("No prefix detected.");
    return;
  }

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  if (args == 0) return;
  const command = args.shift().toLowerCase();
  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));   //TODO FIX!
  client.logger.log(`Message Properties:` + args + " " + command + " " + cmd);
  //MESSAGE PROCEDURE




  if (!cmd) {
    client.logger.log("Not a command.");
    return;
  }

  if (cmd && !message.guild && message.guild.guildOnly) {
    message.channel.send("This command is unavailable via private message. Please run this command in a guild.");
    client.logger.log(`DM Forgery attempty by ${message.author}`);
    return;
  }

  //if (CatchSpecialMessages()) return;

  //if (SpecialMsgsChecked()) return;
  client.logger.cmd(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);
  cmd.run(client, message, args);

  /*function CatchSpecialMessages() {
    if(message.channel.id == client.config.nonEssentialIDs.alignmentID) {
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
    }

    //UPDATE ROLES WITH tatsumakiID
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
  }*/
};
