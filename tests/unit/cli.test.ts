import { describe, it, expect } from 'vitest';
import { execa } from 'execa';

describe('workhorse-cli', () => {
  it('应该显示结构化的帮助信息', async () => {
    const { stdout } = await execa('node', ['dist/index.js', '--help']);

    // 检查基本结构和内容
    expect(stdout).toContain('Usage: workhorse-cli [options] [command]');
    expect(stdout).toContain('A CLI tool for automating development workflows');
    expect(stdout).toContain('Options:');
    expect(stdout).toContain('-V, --version');
    expect(stdout).toContain('-h, --help');
    expect(stdout).toContain('Commands:');
    expect(stdout).toContain('init');
  });
});

