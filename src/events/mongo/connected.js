const chalk = import('chalk').then(m=>m.default);

module.exports = {
  name: "connected",
  async execute(client)
  {
    const _chalk = await chalk;
    console.log(_chalk.green("[Database status]: Connected."));
  }
}
