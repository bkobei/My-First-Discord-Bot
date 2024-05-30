const chalk = import('chalk').then(m=>m.default);

module.exports = {
  name: "err",
  async execute(err)
  {
    const _chalk = await chalk;
    console.log(
      _chalk.red(`An error occurred with the database connection:\n${err}`)
    );
  }
};
