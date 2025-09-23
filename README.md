# workhorse-cli

一个旨在简化 git 和命令行操作的工具。

## 安装

```bash
pnpm install
```

## 使用

```bash
# 生产构建
pnpm build

# 运行 CLI
node dist/index.js [command]
```

或者，使用 `pnpm link` 创建全局链接：

```bash
pnpm link --global
```

然后就可以直接使用：

```bash
workhorse [command]
```
