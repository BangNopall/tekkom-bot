const chalk =  require('chalk');

module.exports = {
    name: "err",
    execute(err) {
        console.log(chalk.red(`[MONGO] An error occured with database connection: \n${err}!`));
    },
};