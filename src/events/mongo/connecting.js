const chalk = import('chalk').then(m=>m.default);

module.exports = {
  name: "connecting",
  async execute()
  {
    const _chalk = await chalk;
    console.log(_chalk.cyan("[Database status]: Connecting..."));
  }
}
