#!/usr/bin/env node
import { Command } from 'commander';

// 初始化 commander 程序
const program = new Command();

// 定义程序的基本信息
program
  .name('workhorse')
  .version('1.0.0') // 添加版本信息
  .description('A CLI tool designed to simplify git and command-line operations.')
  .usage('<command> [options]');

// 添加页脚信息，包含示例和更多信息
program.addHelpText('after', `
Examples:
  $ workhorse --help

Learn More:
  Use 'workhorse <command> --help' for more information about a command.
  Read the manual at <https://github.com/your-repo/workhorse-cli>`);

// 解析参数 - Commander 会自动处理 --help 和 --version 并退出
program.parse(process.argv);

// 如果解析后没有参数（意味着用户只输入了 'workhorse'），则显示帮助
if (!program.args.length) {
    program.help();
}
