#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import program from 'commander';

const require = (filepath, encoding = "utf8") => JSON.parse(fs.readFileSync(filepath, { encoding }));
const packageInfo = require('./package.json');

import {codegen} from './lib/codegen.js';

const red = text => `\x1b[31m${text}\x1b[0m`;
const magenta = text => `\x1b[35m${text}\x1b[0m`;
const yellow = text => `\x1b[33m${text}\x1b[0m`;
const green = text => `\x1b[32m${text}\x1b[0m`;

let swaggerFile;

const parseOutput = dir => path.resolve(dir);

program
  .version(packageInfo.version)
  .arguments('<swaggerFile>')
  .action((swaggerFilePath) => {
    swaggerFile = path.resolve(swaggerFilePath);
  })
  .option('-o, --output <outputDir>', 'directory where to put the generated files (defaults to current directory)', parseOutput, process.cwd())
  .parse(process.argv);

if (!swaggerFile) {
  console.error(red('> Path to Swagger file not provided.'));
  program.help(); // This exits the process
}

codegen({
  swagger: swaggerFile,
  target_dir: program.output,
}).then(() => {
  console.log(green('Done! ✨'));
  console.log(yellow('Check out your shiny new API at ') + magenta(program.output) + yellow('.'));
}).catch(err => {
  console.error(red('Aaww 💩. Something went wrong:'));
  console.error(red(err.stack || err.message));
});

process.on('unhandledRejection', (err) => console.error(err));
