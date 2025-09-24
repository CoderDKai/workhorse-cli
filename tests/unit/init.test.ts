import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { execa } from 'execa';

// 定义 CLI 入口点
const cliPath = path.resolve(process.cwd(), 'dist/index.js');
const workhorseDir = '.workhorse';

describe('init 命令', () => {
  let tempDir: string;
  let originalHome: string | undefined;

  beforeEach(async () => {
    // 创建一个临时目录作为项目目录
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'workhorse-cli-test-'));
    // 模拟 HOME 目录
    originalHome = process.env.HOME;
    process.env.HOME = tempDir;
  });

  afterEach(async () => {
    // 清理临时目录
    await fs.remove(tempDir);
    // 恢复 HOME 目录
    process.env.HOME = originalHome;
  });

  it('场景 1: 首次成功初始化', async () => {
    const { stdout } = await execa('node', [cliPath, 'init'], { cwd: tempDir });

    const globalPath = path.join(tempDir, workhorseDir);
    const projectPath = path.join(tempDir, workhorseDir);
    const settingsPath = path.join(projectPath, 'settings.json');

    expect(await fs.pathExists(globalPath)).toBe(true);
    expect(await fs.pathExists(projectPath)).toBe(true);
    expect(await fs.pathExists(settingsPath)).toBe(true);
    const settings = await fs.readJson(settingsPath);
    expect(settings).toEqual({});
    expect(stdout).toContain('Initialization successful!');
  });

  it('场景 4: 使用 --force 标志成功覆盖', async () => {
    const projectPath = path.join(tempDir, workhorseDir);
    await fs.ensureDir(projectPath);
    await fs.writeJson(path.join(projectPath, 'settings.json'), { old: 'data' });

    const { stdout } = await execa('node', [cliPath, 'init', '--force'], { cwd: tempDir });

    const settings = await fs.readJson(path.join(projectPath, 'settings.json'));
    expect(settings).toEqual({});
    expect(stdout).toContain('Initialization successful!');
  });

  it('场景 5: 因主目录权限不足而失败', async () => {
    // 在 Linux/macOS 上通过移除写权限来模拟
    if (process.platform !== 'win32') {
      await fs.chmod(tempDir, 0o555); // 只读权限
      const { stderr } = await execa('node', [cliPath, 'init'], { cwd: tempDir, reject: false });
      expect(stderr).toContain('Insufficient permissions');
      await fs.chmod(tempDir, 0o755); // 恢复权限
    }
  });

  it('场景 7: 因 .workhorse 是文件而不是目录而失败', async () => {
    const projectPath = path.join(tempDir, workhorseDir);
    await fs.ensureFile(projectPath); // 创建一个文件而不是目录

    const { stderr } = await execa('node', [cliPath, 'init'], { cwd: tempDir, reject: false });
    expect(stderr).toContain('already exists as a file');
  });
});
