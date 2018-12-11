const Discord = require("discord.js");

exports.run = (client, message, args) => {

    /*const settings = client.config.visualSettings;     //Removes "client.config.visualSettings" redundancy

    switch(args) {
      case 'alignment':
        alignment(client, message, settings);
        message.channel.send(`Command run in <#${client.config.nonEssentialIDs.alignmentID}>.`);
        client.logger.log(`Content 'alignment' printed.`);
        return;
      case "costums":
        costums(client, message);
        message.channel.send(`Command run in <#${client.config.nonEssentialIDs.costumsID}>.`);
        client.logger.log(`Content 'costums' printed.`);
        return;
      case "advertisement":
      case "ad":
        advertisement(client, message);
        client.logger.log(`Content 'advertisement' printed.`);
        return;
      case "guidelines":
      case "rules":
        guidelines(client, message, settings);
        client.logger.log(`Content 'guidelines' printed.`);
        return;
    }

    /*if (args == 'alignment') {
        alignment(client, message, settings);
        message.channel.send("Command run in #alignment.");
          client.logger.log("Content 'advertisement' printed.");
    } else if (args == 'costums') {
        costums(client, message);
        message.channel.send("Command run in #costums.");
        client.logger.log("Content 'advertisement' printed.");
    } else if (args == 'advertisement' || args == 'ad') {
        advertisement(client, message);
        client.logger.log(`Content 'advertisement' printed.`);
    } else if (args == 'guidelines' || args == 'rules') {
        guidelines(client, message, settings);
        client.logger.log(`Content 'guidelines' printed.`);
    } else {
      message.channel.send("Usage: g!content [alignment/costums]");
    }*/
}

//ALIGNMENT
const alignment = function(client, message, settings) {

  var embedArray = new Array();

    embedArray[0] = new Discord.RichEmbed()
      .setTitle("Welcome to Maker's End")
      .setDescription("You're now in the realm of the Sundom and the Sacred Lands.")
      .setColor(settings.colorGAIA)
      .setImage(settings.realmURL)
      .setAuthor(client.user.username, client.user.avatarURL);

    embedArray[1] = new Discord.RichEmbed()
      .setTitle("Stick to these costums to create a pleasant environment:")
      .addField("1.Follow Discord TOS and Community Guidelines",
                "https://discordapp.com/terms  & https://discordapp.com/guidelines")
      .addBlankField(true)
      .addField("2. Generally, be nice to your fellow user.*",
                "Don't try to be edgy or provoke anyone on purpose.")
      .addBlankField(true)
      .addField("2. No NSFW and continuous shitposting.",
                "This includes sexually explicit media, depictions of violence etc.")
      .addBlankField(true)
      .addField("3. No spoilers in public chat.",
                "Keep all major HZD spoilers in #sunfall (To access #sunfall, do *?rank Shadow Carja*).")
      .addBlankField(true)
      .addField("*For any in-detail questions about these rules, see:",
                "https://pastebin.com/UWP2bMyp")
      .addBlankField(true)
      .addField("Note that Admins and Mods act at their own discretion.",
                "Generally, they don't bite. ")
      .setColor(settings.colorRULES)
      .setThumbnail(settings.rulesIMG);

    embedArray[2] = new Discord.RichEmbed()
      .setTitle("How to join a tribe:")
      .setDescription("To agree to the rules and to verify yourself, please choose one of these two roles and type the command in this channel.")
      .setColor(settings.colorDISTINCT);

    embedArray[3] = new Discord.RichEmbed()
      .setTitle("The Carja:")
      .setColor(settings.colorDISTINCT)
      .setDescription("?carja")
      .setImage(settings.carjaURL)
      .setURL(settings.carjaURL);

    embedArray[4] = new Discord.RichEmbed()
      .setTitle("The Nora:")
      .setColor(settings.colorDISTINCT)
      .setDescription("?nora")
      .setImage(settings.noraURL)
      .setURL(settings.noraURL);

    embedArray[5] = new Discord.RichEmbed()
      .setTitle("Other information:")
      .setColor(settings.colorGAIA)
      .setTimestamp("3040-09-14T00:00:00.00")
      .setFooter("END OF TRANSMISSION", settings.avatarURL)
      .addBlankField(true)
      .addField("You've already completed the story of HZD?",
                "?rank Shadow Carja")
      .addBlankField(true)
      .addField("There's a HZD reference you don't understand?",
                "Try: **g!wiki** Example: g!wiki Snapmaw")
      .addBlankField(true)
      .addField("You reached a new tier, what now?",
                "By being active, you earn trophies of slain machines. With new trophies you get new titles with a new color!");

  for(let i = 0; i <= 5; i++) {
    client.channels.get(client.config.nonEssentialIDs.alignmentID).send(embedArray[i])
  }
  return;
}



//ADVERTISEMENTS
const advertisement = function(client, message) {
  message.channel.send("**Maker's End:**\nEnter the world of Horizon Zero Dawn and join a safe and mature community in a HZD themed server! We are looking for people who are passionate about gaming, movies & music and are eager to make friends! Even if you haven't played the game, we'd be happy to have you!\nhttps://discord.gg/KcjJ4fv", {files: [name='./img/advertisement01.png']});
  return;
}

//GUIDELINES
    /*let output = `As decreed by the <@&413096162028158976> and the <@&413076170762878976>, follow these simple costums to ensure a pleasant environment in the tribes:\n\n\n`;

        output += `**1. Use common sense.**\nNo one likes rudeness. This includes offensive usernames/avatars, excessive use of strong language, racism, sexism etc.\n\n`;
        output += `**2. Keep it at a certain level of maturity.**\nNSFW content and continuous shitposting are prohibited.\n\n`;
        output += `**3. Don't self promote or encourage piracy.**\nFor promotion, check in with the rulership.\n\n`;
        output += `**4. Keep it organised.**\nTry to keep content you post in the according channel (Check the channel descriptions!).\n\n`;
        output += `**5. No spoilers.**\nKeep all major spoilers in #sunfall (To access #sunfall, do *?rank Shadow Carja*).\n\n\n`;

        output += `Please be aware that the rulership has the right to act at their own discretion at any time.`;*/

const guidelines = function(client, message, settings) {

  const embed = new Discord.RichEmbed()
    .setTitle("Stick to these costums to create a pleasant environment:")
    .addField("1.Follow Discord TOS and Community Guidelines",
              "https://discordapp.com/terms  & https://discordapp.com/guidelines")
    .addBlankField(true)
    .addField("2. Generally, be nice to your fellow user.*",
              "Don't try to be edgy or provoke anyone on purpose.")
    .addBlankField(true)
    .addField("2. No NSFW and continuous shitposting.",
              "This includes sexually explicit media, depictions of violence etc.")
    .addBlankField(true)
    .addField("3. No spoilers in public chat.",
              "Keep all major HZD spoilers in #sunfall (To access #sunfall, do *?rank Shadow Carja*).")
    .addBlankField(true)
    .addField("*For any in-detail questions about these rules, see:",
              "https://pastebin.com/UWP2bMyp")
    .addBlankField(true)
    .addField("Note that Admins and Mods act at their own discretion.",
              "Generally, they don't bite.")
    .setColor(settings.colorRULES)
    .setThumbnail(settings.rulesIMG);
    message.channel.send(embed);

    return;
}

exports.conf = {
	enabled: true,
	aliases: ["c"],
	permLevel: "GAIA Maintenance"
};

exports.help = {
	name: "content",
	category: "Setup",
	description: "Prints content in the corresponding channels.",
	usage: "content [alignment][costums][advertisement/ad]"
};
