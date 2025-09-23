import { execa } from 'execa';
import { describe, it, expect } from 'vitest';

describe('workhorse-cli', () => {
  it('should display structured help information', async () => {
    const { stdout } = await execa('node', ['dist/index.js', '--help']);

    // 检查基本结构和内容
    expect(stdout).toContain('Usage: workhorse <command> [options]');
    expect(stdout).toContain('A CLI tool designed to simplify git and command-line operations.');
    
    // 检查 Options/Flags
    expect(stdout).toContain('Options:');
    expect(stdout).toContain('-V, --version');
    expect(stdout).toContain('-h, --help');

    // 检查自定义部分
    expect(stdout).toContain('Examples:');
    expect(stdout).toContain('$ workhorse --help');
    expect(stdout).toContain('Learn More:');
  });
});
