const Discord = require("discord.js");
const Attachment = new Discord.Attachment();
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const client = new Discord.Client();
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");

require("./modules/functions.js")(client);
require("./modules/rolemanagement.js")(client);
client.config = require("./config.js");
client.logger = require("./util/Logger");

client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

// APP INIT FUNCTION
const init = async () => {

		// COMMAND LOADER
	  const cmdFiles = await readdir("./commands/");
	  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
	  cmdFiles.forEach(f => {
	    if (!f.endsWith(".js")) return;
	    const response = client.loadCommand(f);
	    if (response) client.logger.warn(response);
	  });

		// EVENT LOADER
		console.log("");
	  const evtFiles = await readdir("./events/");
	  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
	  evtFiles.forEach(file => {
			const response = client.loadEvents(file);
			if (response) client.logger.warn(response);
			const eventName = file.split(".")[0];
	    const event = require(`./events/${file}`);
	    client.on(eventName, event.bind(null, client));
	    delete require.cache[require.resolve(`./events/${file}`)];
	  });

	  client.login(client.config.token);
};

init();
