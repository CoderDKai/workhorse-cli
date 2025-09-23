<!--
---
Sync Impact Report
---
Version change: 1.0.0 → 1.1.0
Modified principles:
  - Added: VI. 代码规范自动化
Added sections: n/a
Removed sections: n/a
Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (no changes needed)
  - ✅ .specify/templates/spec-template.md (no changes needed)
  - ✅ .specify/templates/tasks-template.md (no changes needed)
Follow-up TODOs: none
-->
# workhorse-cli 技术规约

## 核心原则

### I. 统一包管理
项目必须使用 `pnpm` 作为唯一的包管理器。所有依赖项的添加、更新和删除都应通过 `pnpm` 命令执行，以确保依赖一致性、高效的磁盘空间利用和确定性的安装。

### II. 现代化构建体系
项目必须采用 `Vite` 进行代码的构建、打包和本地开发服务。这旨在利用其快速的冷启动、模块热更新（HMR）能力和优化的构建输出来提升开发效率和最终产品性能。

### III. 技术决策的时效性
在引入或使用任何关键技术（例如：库、框架、重要工具）之前，必须使用 Context7 MCP 来获取其最新的官方文档。此举旨在确保技术选型和实现方式基于最新、最稳定和最安全的信息，避免使用过时或已废弃的 API。

### IV. 规范化依赖管理
所有新的依赖项必须通过 `pnpm add <package-name>` 命令添加。禁止直接手动编辑 `package.json` 文件然后执行安装，除非需要锁定一个特定的、无法通过常规方式获取的依赖版本，并且有充分的文档化理由。此原则旨在保证依赖关系图的准确性和可追溯性。

### V. 中文优先原则
所有项目内的代码注释、文档、提交信息（commit messages）以及与项目相关的团队交流都必须优先使用中文。这旨在降低团队成员之间的沟通和理解成本，确保信息传达的准确性。

### VI. 代码规范自动化
项目必须集成 `ESLint` 来进行静态代码分析和风格检查。所有代码提交前都应通过 ESLint 的校验，以确保代码质量、风格统一，并尽早发现潜在的错误。

## 治理
本规约是项目开发的最高准则，其效力高于所有其他实践或个人偏好。对本规约的任何修订都必须经过团队评审，并以更新版本号的形式记录在案。

- **修订流程**: 通过 Pull Request 提出修订建议，经过至少一名核心成员批准后方可合并。
- **版本管理**: 版本号遵循语义化版本（Semantic Versioning）规则。
  - **主版本号 (MAJOR)**: 当做出不兼容的重大原则修订或删除时。
  - **次版本号 (MINOR)**: 当添加新的原则或对现有原则做出重大扩展时。
  - **修订号 (PATCH)**: 当进行文字修正、格式调整或澄清性说明时。
- **合规性**: 所有的代码提交和审查都必须以遵守本规约为前提。

**版本**: 1.1.0 | **批准日期**: 2025-09-23 | **最后修订日期**: 2025-09-23