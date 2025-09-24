/**
 * @file 包含 `init` 命令的实现。
 */

import { Command } from 'commander';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import inquirer from 'inquirer';
import chalk from 'chalk';

const globalWorkhorseDir = path.join(os.homedir(), '.workhorse');
const projectWorkhorseDir = path.join(process.cwd(), '.workhorse');
const settingsFile = 'settings.json';

/**
 * 检查路径是否存在，如果存在则验证它是一个目录。
 * @param dirPath - 要检查的目录路径。
 * @returns 如果目录存在则返回 true，否则返回 false。
 * @throws 如果路径存在但是一个文件，则抛出错误。
 */
async function checkDirectoryExists(dirPath: string): Promise<boolean> {
  if (await fs.pathExists(dirPath)) {
    const stats = await fs.stat(dirPath);
    if (!stats.isDirectory()) {
      throw new Error(`Error: Path ${chalk.cyan(dirPath)} already exists as a file. Please remove or rename it.`);
    }
    return true;
  }
  return false;
}

/**
 * `init` 命令的选项类型定义。
 */
type InitCommandOptions = {
  force: boolean;
};

/**
 * `init` 命令：初始化全局和项目级别的配置。
 */
export const initCommand = new Command()
  .name('init')
  .description('Initialize project and global configuration')
  .option('-f, --force', 'Force overwrite existing configuration', false)
  .action(async (options: InitCommandOptions) => {
    try {
      const globalExists = await checkDirectoryExists(globalWorkhorseDir);
      const projectExists = await checkDirectoryExists(projectWorkhorseDir);

      if ((globalExists || projectExists) && !options.force) {
        const answers: { overwrite: boolean } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'overwrite',
            message: 'Existing configuration detected. Do you want to overwrite it?',
            default: false,
          },
        ]);
        if (!answers.overwrite) {
          console.log(chalk.yellow('Operation cancelled.'));
          return;
        }
      }

      // 创建全局目录
      await fs.ensureDir(globalWorkhorseDir);
      console.log(chalk.green(`✔ Global configuration directory ensured at ${chalk.cyan(globalWorkhorseDir)}.`));

      // 创建项目目录和 settings.json
      await fs.ensureDir(projectWorkhorseDir);
      await fs.writeJson(path.join(projectWorkhorseDir, settingsFile), {}, { spaces: 2 });
      console.log(chalk.green(`✔ Project configuration created in ${chalk.cyan(projectWorkhorseDir)}.`));

      console.log(chalk.blue.bold('\nInitialization successful!'));

    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'EACCES') {
        console.error(chalk.red(`Error: Insufficient permissions to write to the directory. Please check your permissions.`));
      } else if (error instanceof Error) {
        console.error(chalk.red(`An error occurred: ${error.message}`));
      } else {
        console.error(chalk.red('An unknown error occurred.'));
      }
      process.exit(1);
    }
  });
