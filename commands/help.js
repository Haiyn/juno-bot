exports.run = (client, message, args, level) => {
  /*if (!args[0]) {

      const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

      const commandNames = myCommands.keyArray();
      const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
      let output = `\`* Command List *\`\n`;

      let currentCategory = "";
      const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      sorted.forEach( c => {
        const cat = c.help.category.toProperCase();
        if (currentCategory !== cat) {
          output += `\n\n **${cat}** \n`;
          currentCategory = cat;
        }
        output += `\`${c.help.name}${" ".repeat(longest - c.help.name.length)}\` `;
      });
      output += `\n\nFor further info about a specific command, use \`${client.config.defaultSettings.prefix}help [command]\`\nExample: \`g!help info\``
      message.channel.send(output);
  } else {

    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      message.channel.send(`**${command.help.name.toProperCase()}** - \`${client.config.defaultSettings.prefix}${command.help.name}\`\n${command.help.description}\n\nUsage: \`${client.config.defaultSettings.prefix}${command.help.usage}\`\nAliases: ${command.conf.aliases.join(", ")}`);
    }
  }*/

  client.logger.cmd("Ran command help");
};

exports.conf = {
  enabled: true,
  aliases: ["h"],
  permLevel: "GAIA Tester"
};

exports.help = {
  name: "help",
  category: "Info",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
