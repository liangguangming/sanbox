#!/usr/bin/env node
const program = require('commander');
const fs = require("fs");
const path = require("path");

const createSanbox = require("./sanbox");

program
  .version(require('./package.json').version, '-v, --version')
  .requiredOption("-s, --srcPath <srcPath>", "src code path")
  .requiredOption("-d, --dataPath <dataPath>", "origin input data path")
  .action(() => {
    const {srcPath, dataPath} = program.opts();
    const src = fs.readFileSync(path.resolve(srcPath)).toString();
    const input = fs.readFileSync(path.resolve(dataPath)).toString();
    console.log(createSanbox(src, input));
  });

program.parse(process.argv);