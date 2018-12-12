module.exports = async client => {
  try {
    message.member.guild.defaultGuild.send(`Hail there, traveler! ${member.user.username} was just spotted traversing the local clusters!`);
  } catch (ex) {
    client.logger.log("Error on GuildMemberAdd event: " + ex);
  }
};
