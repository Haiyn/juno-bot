module.exports = (client) => {



  /*DEFAULT FAILURE MESSAGE

  If something in the Query process fails on the user side, this message is sent.
  */
  client.sendFailureMessage = (message) => {
    message.channel.send("Sorry, this reply wasn't valid! Did you type everything correctly?");
  };

  /*DEFAULT FAILURE MESSAGE

  If something in the role process fails on the bot side, this message is sent.
  */
  client.sendErrorMessage = (message) => {
    message.channel.send("Whoops! Something went wrong and I crashlanded! Kick Haiyn in the butt so he fixes this!");
  };


  /*CHANNEL QUERY PROCESSING

  Processes the channel name that was passed during message initialisation. Returns a channel ID.
  */
  client.processChannelQuery = (message, str) => {
    if(str == "") client.sendFailureMessage (message);
    try {
      var initID = message.guild.channels.find(channel => channel.name === str).id;
      client.logger.log(`Channel #${str}: ${initID}`, "debug");
      if(message.guild.channels.get(initID).type != "text") {
        client.sendFailureMessage(message);
        return false;
      }
      return initID;
    }
    catch (ex) {
      client.logger.warn("Failed at client.processChannelQuery: " + ex);
      client.sendFailureMessage(message);
      return false;
    }
  };

  /*ROLE QUERY PROCESSING

  Processes all roles that were passed during message initialisation. Returns a role ID array.
  */
  client.processRoleQuery = (message, str) => {
    if(str == "") client.sendFailureMessage (message);
    try {
      var roleArray = str.split(/,[\s]*/g);                                     //str.replace(/\s/gi, "").split(",");
      for(var i = 0; i < roleArray.length; i++) {
        roleArray[i].trim();
        client.logger.log(roleArray[i], "debug");
      }
      return roleArray;
    }
    catch (ex) {
      client.logger.warn("Role Query failed at client.processRoleQuery: " + ex);
      client.sendFailureMessage(message);
      return false;
    }
  };


  /*ROLE QUERY MATCHING

  Matches queried role names from client.processRoleQuery and returns the Role IDs as an array.
  */
  client.matchRoles = (message, roleArray) => {
    var roleID = [];
    try {
      for (var i = 0; i < roleArray.length; i++) {
      roleID[i] = message.guild.roles.find(roles => roles.name === roleArray[i]).id;
      client.logger.log(`${roleArray[i]}: ${roleID[i]}`, "debug");
      }
      return roleID;
    }
    catch (ex) {
      client.logger.warn("Role Matching failed at client.matchRoles: " + ex);
      client.sendFailureMessage(message.channel);
    }
  };


  /*QUERY DATA SAVING

  Writes queried data (messageID, channelID & corresponding Role IDs) to a json file.
  TODO Add support for multiple messages (multiple jsons/json entries)
  */
  client.saveData = (messageID, channelID, roleID) => {
    const fs = require('fs');
    var selfrole = [];
    try {
      for(let i = 0; i <= roleID.length; i++) {
        selfrole[i] = {
          messageID: messageID,
          channelID: channelID,
          RoleID: roleID[i]
        };
      }

      let data = JSON.stringify(selfrole);
      fs.writeFileSync('.//data/roles/selfrole.json', data);
      return true;
    }
    catch (ex) {
      client.logger.error("Failed at client.saveData: " + ex);
      return false;
    }
  };


  /*SELF-ASSIGN MESSAGE INITIALIZATION

  Sends the message and adds monitored reactions to it. Returns the message ID (needed for saving).
  */
  client.initializeMessage = async (message, roleArray, channelID) => {
    const emoteArray = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];
    const Discord = require("discord.js");
  	const embed = new Discord.RichEmbed()
  		.setTitle("Info")
  		.setDescription("React to this message to receive the roles you want!")
  		.setThumbnail(client.user.avatarURL)
  		.setColor(client.config.defaultSettings.color)
  		.setAuthor(client.user.username, client.user.AvatarURL)
  		.setFooter("Juno Role Manager v1.0")
  		.setTimestamp(client.timestamp());

    try {
      for(let i = 0; i < roleArray.length; i++) {
        embed.addField(`${emoteArray[i]}\t${roleArray[i]}`, "\u200b");
      }
      client.channels.get(channelID).send(embed)
        .then( msg => {
          if(!client.reactMessage(msg, roleArray, emoteArray)) {
            client.sendErrorMessage(message);
            return false;
          }
          return msg.id;
        })
        .catch(client.logger.warn("Failed at reactMessage."));
    }
    catch (ex) {
      client.logger.error("Initilization failed at message creation: " + ex);
      client.sendErrorMessage(message);
      return false;
    }
  };

  client.reactMessage = async (message, roleArray, emoteArray) => {
    try {
      for(let i = 0; i < roleArray.length; i++) {
        await message.react(emoteArray[i]);
      }
      return true;
    } catch (ex) {
      client.logger.error("Failed at reactMessage: " + ex);
      return false;
    }
  }
};
