# Quickstart: workhorse-cli

## 1. 安装依赖

确保你已经安装了 `pnpm`。在项目根目录运行：

```bash
pnpm install
```

## 2. 构建项目

本项目使用 Vite 进行实时编译和构建。

```bash
# 开发模式 (带文件监听)
pnpm dev

# 生产构建
pnpm build
```

## 3. 运行 CLI

你可以通过以下命令来执行 CLI 应用：

```bash
node dist/index.js [command]
```
或者配置 `package.json` 的 `bin` 字段后，通过 `pnpm link` 创建全局链接：
```bash
pnpm link --global
# 然后就可以直接使用
workhorse [command]
```

---

## 预期输出

### `workhorse --help`
运行 `workhorse --help` 或 `workhorse -h` 将显示以下帮助信息：

```
workhorse-cli: 一个旨在简化 git 和命令行操作的工具。

用法:
  workhorse [command] [options]

命令:
  (暂无)

选项:
  -h, --help     显示此帮助信息
  
示例:
  workhorse --help
```

### `workhorse`
不带任何参数运行 `workhorse` 将显示项目介绍和完整的帮助信息：

```
欢迎使用 workhorse-cli！
一个旨在简化 git 和命令行操作的工具，助您高效工作。

---

workhorse-cli: 一个旨在简化 git 和命令行操作的工具。

用法:
  workhorse [command] [options]

命令:
  (暂无)

选项:
  -h, --help     显示此帮助信息
  
示例:
  workhorse --help
```
