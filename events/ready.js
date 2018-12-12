module.exports = async client => {
  await client.wait(1000);
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size - 1} users.`, "ready");
};
