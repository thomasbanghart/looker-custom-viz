#!/usr/bin/env node

"use strict"

const chalk = require('chalk');
const { Command } = require('commander');
const fs = require('fs-extra');


let projectName;
function main() {
    const program = new Command()
      .version('1.0.0')
      .arguments('<project-directory>')
      .usage(`${chalk.green('<project-directory>')} [options]`)
      .action(name => {
        projectName = name
      })
      .option('-t, --type <type>', 'choose either \'ts\' or \'js\'', 'ts')
      .parse(process.argv)
      
      createCustomVizTemplate(projectName, program.opts())
}

function createCustomVizTemplate(projectName, options) {
  try {
    fs.copySync(
      __dirname + `/templates/looker-custom-viz-${options.type}`
      , projectName
    )
    console.log(`${chalk.green(`Success! New viz template created at ${projectName}`)}`)
  } catch(err) {
    console.log(`${chalk.cyan(err.message)}`);
    process.exit(1);
  }
} 

main();
