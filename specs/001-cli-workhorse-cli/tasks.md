# Tasks: CLI 应用基础架构：workhorse-cli

**Input**: Design documents from `/Users/geniusk/Projects/cli/workhorse-cli/specs/001-cli-workhorse-cli/`
**Prerequisites**: plan.md (updated), research.md, quickstart.md, constitution.md (v1.1.0)

## Phase 3.1: 项目设置 (Setup)
- [X] T001 初始化 pnpm 项目: `pnpm init`.
- [X] T002 在 `package.json` 中添加 `"type": "module"` 以启用 ESM 支持。
- [X] T003 [P] 安装核心依赖: `pnpm add commander`.
- [X] T004 [P] 安装开发依赖: `pnpm add -D typescript vite vitest @types/node ts-node`.
- [X] T005 [P] 初始化 ESLint 配置: 运行 `npm init @eslint/config@latest`。在交互式引导中，请选择以下选项：
    - How would you like to use ESLint? -> To check syntax, find problems, and enforce code style
    - **What type of modules does your project use? -> JavaScript modules (import/export)**
    - Which framework does your project use? -> None of these
    - Does your project use TypeScript? -> Yes
    - Where does your code run? -> Node
    - What format do you want your config file to be in? -> JavaScript
    - (同意安装 `@typescript-eslint/eslint-plugin` 和 `@typescript-eslint/parser`)
    - Which package manager do you want to use? -> pnpm
- [X] T006 [P] 创建并配置 `tsconfig.json`。确保 `compilerOptions` 包含 `"module": "NodeNext"`, `"moduleResolution": "NodeNext"` 以及 `"types": ["vitest/globals"]` 以支持 Vitest 的全局 API。
- [X] T007 [P] 创建 `vite.config.ts` 并配置 `test` 属性以集成 Vitest。使用 `/// <reference types="vitest" />` 来获得 TypeScript 类型提示。
- [X] T008 在 `package.json` 中添加 `scripts`: `"dev": "vite"`, `"build": "vite build"`, `"test": "vitest"`, `"lint": "eslint ."`.

## Phase 3.2: 核心功能实现 (Core Implementation)
- [X] T009 创建项目目录结构: `src/` 和 `tests/unit/`.
- [X] T010 在 `src/index.ts` 中，使用 `commander.js` 初始化程序。导入 `Command` 类，设置版本、描述，并添加一个全局的 `--help` 选项。
- [X] T011 在 `src/index.ts` 中，实现默认命令行为：当用户仅输入 `workhorse` 时，在终端输出项目介绍和帮助信息。
- [X] T012 在 `src/index.ts` 文件顶部添加 shebang `#!/usr/bin/env node`，以确保脚本可以作为可执行文件直接运行。

## Phase 3.3: 测试 (Tests)
- [X] T013 [P] 在 `tests/unit/cli.test.ts` 中，编写单元测试来验证 `workhorse --help` 命令的输出。测试应捕获 stdout 并断言其内容符合 `quickstart.md` 中定义的格式和文本。

## Phase 3.4: 完善与文档 (Polish)
- [X] T014 在 `package.json` 中配置 `bin` 字段，将 `workhorse` 命令指向编译后的入口文件，例如 `"bin": {"workhorse": "./dist/index.js"}`。
- [X] T015 编写项目根目录下的 `README.md` 文件，清晰地说明 `workhorse-cli` 的用途、安装步骤和基本使用方法。

## 依赖关系 (Dependencies)
- **Setup (T001-T008)** 必须在所有其他阶段之前完成。
- **Core Implementation (T009-T012)** 必须在 **Tests (T013)** 之前完成，以提供可测试的代码。
- **Polish (T014-T015)** 应该是最后的步骤。

## 并行执行示例 (Parallel Example)
以下安装和配置任务可以并行执行以提高效率：
```
# T003, T004, T005, T006, T007 可以同时进行
Task: "安装核心依赖: pnpm add commander"
Task: "安装开发依赖: pnpm add -D typescript vite vitest @types/node ts-node"
Task: "初始化 ESLint 配置: npm init @eslint/config@latest"
Task: "创建并配置 tsconfig.json"
Task: "创建并配置 vite.config.ts"
```
