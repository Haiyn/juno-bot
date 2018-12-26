exports.run = async (client, message, args) => {

  /*PULLS MODE ARGUMENT FROM ARGS

  Modes:
    init: Initialise the last message in the channel with choosable roles.
      - Bot asks which Roles to add (Input: Name(s))
      - Last message in channel in which command was run, gets n reaction buttons

    add: Add a new assignable role to a choosable role message initiliased with init
      - cannot be more than 9
      - takes id OR shows table with initialised messages

    remove: Remove an existing assignable role from a choosable role message initiliased with init
      - cannot be less than 1
      - takes id OR shows table with initialised messages

    delete: Deletes all initiliased messages from the settings
      - messages saved in new Enmap?

  */
  var checked = false;
  var mode = args.slice(args.indexOf(" ")+1);
  switch(String(mode)) {                                                        //Cast mode to String because mode is a String Object, not a String primitive like "init"
    case "init":
      var initChannel = await client.awaitReplyContent(message, "In which channel do you want the self-assign message to be?");
      var channelID = client.processChannelQuery(message, initChannel);
      if(!channelID)   return;
      var initRoles = await client.awaitReplyContent(message, "Which roles do you want to be assignable? (Seperate multiple roles with \",\")");

      client.logger.log("Information received successfully. Starting processing... ");
      var roleArray = client.processRoleQuery(message, initRoles);
      if(!roleArray)  return;
      message.channel.send(`Gotcha! Adding self-assign message to ${initChannel}!`);
      client.logger.log("Matching roles...");
      var roleIDs = client.matchRoles(message, roleArray);
      client.logger.log("End of processing.");

      client.logger.log("Initializing message...");
      var messageID = client.initializeMessage(message, roleArray, channelID);
      if(!messageID) return;
      client.logger.log("Initialization completed!");

      client.logger.log("Start saving...");
      if(!client.saveData(messageID, channelID, roleIDs)) return;
      client.logger.log("Saving successful.");

      break;
    case "edit":
      //TODO Editable self-assign messages
      break;
    default:
      message.channel.send("What do you want to do?\n```j!roles init - sets up a new self-assign message\nj!roles edit - edits an existing self-assign message```");
  }

  //message.channel.send("Whoops! This command is still under construction. Please check back later!");
};

exports.conf = {
	enabled: true,
	aliases: []
};

exports.help = {
	name: "roles",
  category: "System",
	description: "Manage the self-assignable roles.",
	usage: "init"
};
