exports.run = async (client, message, args) => {
  const msg = await message.channel.send("Checking...");
  msg.edit(`All systems online. Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  
};

exports.conf = {
	enabled: true,
	aliases: ["ping"],
	permLevel: "GAIA Tester"
};

exports.help = {
	name: "status",
    category: "System",
	description: "Checks the status of the bot.",
	usage: "status"
};
