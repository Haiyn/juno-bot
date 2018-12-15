module.exports = (client) => {

  /*
  GENERIC TIMESTAMP

  A generic timestamp.  TODO timestamp is in the future

  */
  client.timestamp = function() {
    const moment = require("moment");
    return moment().format("YYYY-MM-DD HH:mm:ss");
  };

  /*
  GENERIC DELETION

  Deletes the passes message object with a specified time in ms.

  */
  client.deleteMessage = (message, time) => {
    try {
      client.logger.log(`Message queued for deletion in ${time/1000} seconds: ` + message.content);
      message.delete(time);
      return;
    }
    catch (ex) {
      client.logger.warn(`Could not delete message from ${message.author.username} (${message.author.id}) in ${message.channel.name}: ` + ex);
    }
  };


  /*
  SINGLE-LINE AWAITMESSAGE

  const response = await client.awaitReply(msg, "Favourite Color?");
  msg.reply(`Oh, I really love ${response} too!`);

  */
  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };


  /*
  MESSAGE CLEAN FUNCTION
  Mostly only used by the Eval and Exec commands.
  */
  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 0});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  /*
  LOAD EVENTS
  */

  client.loadCommand = (commandName) => {
    try {
      const props = require(`../commands/${commandName}`);
      client.logger.log(`Loading Command: ${props.help.name}.`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

    if (command.shutdown) {
      await command.shutdown(client);
    }
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    return false;
  };

  client.loadEvents = (EventName) => {
    try {
      const props = require(`../events/${EventName}`);
      client.logger.log(`Loading event: ${EventName}.`);
      return false;
    } catch (e) {
      return `Unable to load event ${EventName}: ${e}`;
    }
  };

    /*
    ROLE MANAGEMENT WITH TATSU MSG INTEGRATION
    */

      //TODO rewrite for reactions

  client.manageRoles = (message) => {
    if (message.content.indexOf("🏹") !== 0) return false;                      // "🏹" is indicator for Tatsumaki level-up message
    const member = message.mentions.members.first();
    const rank = message.content.slice(message.content.indexOf("legendary ") + 10, message.content.indexOf(" and"));

    let sawtooth = message.guild.roles.find("name", "Sawtooth");
    let snapmaw = message.guild.roles.find("name", "Snapmaw");
    let behemoth = message.guild.roles.find("name", "Behemoth");
    let tunderjaw = message.guild.roles.find("name", "Thunderjaw");
    let stormbird = message.guild.roles.find("name", "Stormbird");

    if(member.roles.find("name", "Nora")) {
      let gatherers = message.guild.roles.find("name", "Gatherers");
      let braves = message.guild.roles.find("name", "Braves");
      let seekers = message.guild.roles.find("name", "Seekers");
      let death_seekers = message.guild.roles.find("name", "Death-Seekers");

      switch(rank) {
        case "Snapmaw":
          member.addRoles(gatherers, snapmaw);
          member.removeRole(sawtooth);
          break;
        case "Behemoth":
          member.addRoles(braves, behemoth);
          member.removeRoles(gatherers, snapmaw);
          break;
        case "Thunderjaw":
          member.addRoles(seekers, thunderjaw);
          member.removeRoles(braves, snapmaw);
          break;
        case "Stormbird":
          member.addRoles(death_seekers, stormbird);
          member.removeRoles(seekers, thunderjaw);
      }
    }

    if(member.roles.find("name", "Carja")) {
      let commoners = message.guild.roles.find("name", "Commoners");
      let artisans = message.guild.roles.find("name", "Artisans");
      let nobles = message.guild.roles.find("name", "Nobles");
      let kings_guard = message.guild.roles.find("name", "King's Guard");

      switch(rank) {
        case "Snapmaw":
          member.addRoles(commoners, snapmaw);
          member.removeRole(sawtooth);
          break;
        case "Behemoth":
          member.addRoles(artisans, behemoth);
          member.removeRoles(commoners, snapmaw);
          break;
        case "Thunderjaw":
          member.addRoles(nobles, thunderjaw);
          member.removeRoles(artisans, snapmaw);
          break;
        case "Stormbird":
          member.addRoles(kings_guard, stormbird);
          member.removeRoles(nobles, thunderjaw);
      }
    }

    return true;
  }

  /*
  MISCELANEOUS NON-CRITICAL FUNCTIONS
  */

  String.prototype.toProperCase = function() {
    return this.replace(/[a-z]+/gi, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  Array.prototype.joinToProperCase = function(joinStr) {
    return this.join(joinStr).replace(/[a-z]+/gi, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };

  // <Array>.random() returns a single random element from an array
  Array.prototype.random = function() {
    return this[Math.floor(Math.random() * this.length)]
  };

  // `await client.wait(1000);` to "pause" for 1 second.
  client.wait = require("util").promisify(setTimeout);

  // catch exceptions and give *more details* about the error and stack trace.
  process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.log(`Uncaught Exception: ${errorMsg}`);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
  });
};
