
# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## 摘要
该计划概述了 `init` 命令的实施，该命令用于在用户的主目录和当前项目中设置配置目录。它将处理现有配置、权限错误和文件冲突。

## 技术背景
**语言/版本**: TypeScript (v5.x)
**主要依赖**: commander.js (用于CLI路由), fs-extra (用于文件系统操作), chalk (用于终端着色)
**存储**: 本地文件系统 (`~/.workhorse` 和 `./.workhorse`)
**测试**: Jest
**目标平台**: Node.js v20+
**项目类型**: 单一项目
**性能目标**: N/A
**约束**: 必须处理并发文件系统访问（尽管在此命令中不太可能发生）
**规模/范围**: 小范围，单个命令

## 章程检查
*GATE: 必须在第 0 阶段研究之前通过。在第 1 阶段设计之后重新检查。*

- **I. 统一包管理**: [PASS] 将使用 `pnpm` 添加新依赖。
- **II. 现代化构建体系**: [PASS] `Vite` 已配置。
- **III. 技术决策的时效性**: [PASS] 将为任何新库使用 Context7 MCP。
- **IV. 规范化依赖管理**: [PASS] 将使用 `pnpm add`。
- **V. 中文优先原则**: [PASS] 所有文档、注释和提交信息将使用中文。
- **VI. 代码规范自动化**: [PASS] `ESLint` 已集成。

## 项目结构

### 文档 (此功能)
```
specs/002-init-workhorse-workhorse/
├── plan.md              # 此文件 (/plan 命令输出)
├── research.md          # 第 0 阶段输出 (/plan 命令)
├── data-model.md        # 第 1 阶段输出 (/plan 命令)
├── quickstart.md        # 第 1 阶段输出 (/plan 命令)
├── contracts/           # 第 1 阶段输出 (/plan 命令)
└── tasks.md             # 第 2 阶段输出 (/tasks 命令 -不由 /plan 创建)
```

### 源代码 (仓库根目录)
```
# 选项 1: 单一项目 (默认)
src/
├── models/
├── services/
├── commands/
└── lib/

tests/
├── contract/
├── integration/
└── unit/
```

**结构决策**: 选项 1: 单一项目

## 第 0 阶段: 大纲与研究
1. **从上面的技术背景中提取未知项**:
   - 已全部解决。

2. **生成并分派研究代理**:
   - 无需研究任务。

3. **在 `research.md` 中整合发现**:
   - 已完成。

**输出**: `research.md`，所有“需要澄清”已解决

## 第 1 阶段: 设计与合约
*先决条件: research.md 已完成*

1. **从功能规格说明中提取实体** → `data-model.md`:
   - 实体名称、字段、关系
   - 来自需求中的验证规则
   - 状态转换（如果适用）

2. **从功能需求生成 API 合约**:
   - 对于每个用户操作 → 端点
   - 使用标准的 REST/GraphQL 模式
   - 将 OpenAPI/GraphQL 模式输出到 `/contracts/`

3. **从合约生成合约测试**:
   - 每个端点一个测试文件
   - 断言请求/响应模式
   - 测试必须失败（尚无实现）

4. **从用户故事中提取测试场景**:
   - 每个故事 → 集成测试场景
   - 快速入门测试 = 故事验证步骤

5. **增量更新代理文件** (O(1) 操作):
   - 运行 `.specify/scripts/bash/update-agent-context.sh gemini`
     **重要提示**: 严格按照上面指定的方式执行。不要添加或删除任何参数。
   - 如果存在: 仅从当前计划中添加**新**技术
   - 保留标记之间的手动添加
   - 更新最近的更改（保留最近 3 个）
   - 保持在 150 行以下以提高令牌效率
   - 输出到仓库根目录

**输出**: data-model.md, /contracts/*, 失败的测试, quickstart.md, 特定于代理的文件

## 第 2 阶段: 任务规划方法
*本节描述 /tasks 命令将执行的操作 - 不要在 /plan 期间执行*

**任务生成策略**:
- 加载 `.specify/templates/tasks-template.md` 作为基础
- 从第 1 阶段设计文档（合约、数据模型、快速入门）生成任务
- 每个合约 → 合约测试任务 [P]
- 每个实体 → 模型创建任务 [P]
- 每个用户故事 → 集成测试任务
- 实现任务以使测试通过

**排序策略**:
- TDD 顺序: 测试先于实现
- 依赖顺序: 模型先于服务先于 UI
- 标记 [P] 用于并行执行（独立文件）

**预计输出**: 在 tasks.md 中包含 25-30 个编号、有序的任务

**重要提示**: 此阶段由 /tasks 命令执行，而不是由 /plan 执行

## 第 3+ 阶段: 未来的实施
*这些阶段超出了 /plan 命令的范围*

**第 3 阶段**: 任务执行 (/tasks 命令创建 tasks.md)
**第 4 阶段**: 实施 (遵循章程原则执行 tasks.md)
**第 5 阶段**: 验证 (运行测试, 执行 quickstart.md, 性能验证)

## 复杂性跟踪
*仅当章程检查存在必须证明合理性的违规时填写*

| 违规 | 为何需要 | 拒绝更简单替代方案的原因 |
|-----------|------------|-------------------------------------|
| [例如, 第 4 个项目] | [当前需求] | [为何 3 个项目不足] |
| [例如, 仓库模式] | [具体问题] | [为何直接访问数据库不足] |


## 进度跟踪
*此清单在执行流程中更新*

**阶段状态**:
- [x] 第 0 阶段: 研究完成 (/plan 命令)
- [x] 第 1 阶段: 设计完成 (/plan 命令)
- [x] 第 2 阶段: 任务规划完成 (/plan 命令 - 仅描述方法)
- [ ] 第 3 阶段: 任务生成 (/tasks 命令)
- [ ] 第 4 阶段: 实施完成
- [ ] 第 5 阶段: 验证通过

**门禁状态**:
- [x] 初始章程检查: 通过
- [x] 设计后章程检查: 通过
- [x] 所有“需要澄清”已解决
- [ ] 复杂性偏差已记录

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*
