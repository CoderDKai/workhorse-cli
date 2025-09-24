#!/usr/bin/env node
import { Command } from 'commander';
import { initCommand } from './commands/init';

const program = new Command();

program
  .name('workhorse-cli')
  .description('A CLI tool for automating development workflows')
  .version('0.0.1');

program.addCommand(initCommand);

program.parse(process.argv);

// 如果解析后没有参数（意味着用户只输入了 'workhorse'），则显示帮助
if (!program.args.length) {
    program.help();
}
