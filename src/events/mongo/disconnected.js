const chalk = import('chalk').then(m=>m.default);

module.exports = {
  name: "disconnected",
  async execute()
  {
    const _chalk = await chalk;
    console.log(_chalk.red("[Database status]: Disconnected."));
  }
};
