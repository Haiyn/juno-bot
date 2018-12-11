module.exports = async client => {

  await client.wait(1000);
  client.logger.log(`${client.user.tag}, ready to serve ${client.users.size} users.`, "ready");
  client.logger.warn("This Bot supports one guild only. DO NOT RUN IT ON MORE THAN ONE.");

};
