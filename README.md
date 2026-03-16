# CCA Prep

Interactive study guide for the Claude Certified Architect — Foundations (CCA-F) certification exam.

60 scenario-based practice questions across all 5 exam domains, with answer explanations and distractor breakdowns. Built with Next.js, styled to match Anthropic's design language.

Based on the [official Anthropic exam guide](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request).

## Setup

```bash
git clone https://github.com/carolinacherry/cca-prep-public.git
cd cca-prep-public
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What's Inside

- 60 practice questions weighted by domain importance
- All 12 official sample questions from Anthropic's exam guide
- 48 additional scenario-based questions covering all 30 task statements
- Interactive quiz with answer reveal, distractor explanations, and score tracking
- Task statement reference cards with expandable knowledge and skills sections
- Study progress tracking per task statement

## Exam Overview

| Detail | Value |
|--------|-------|
| Questions | 60 multiple-choice |
| Duration | 120 minutes |
| Passing Score | 720 / 1000 |
| Format | Scenario-based, 4 of 6 scenarios per exam |
| Eligibility | Anthropic partners |

The certification is partner-exclusive, but the knowledge applies to anyone building production applications with Claude.

## Domains

| # | Domain | Weight | Questions |
|---|--------|--------|-----------|
| 1 | Agentic Architecture and Orchestration | 27% | 16 |
| 2 | Tool Design and MCP Integration | 18% | 11 |
| 3 | Claude Code Configuration and Workflows | 20% | 12 |
| 4 | Prompt Engineering and Structured Output | 20% | 12 |
| 5 | Context Management and Reliability | 15% | 9 |

## Exam Scenarios

Questions are framed within these production contexts:

1. Customer Support Resolution Agent
2. Code Generation with Claude Code
3. Multi-Agent Research System
4. Developer Productivity Tools
5. Claude Code for CI/CD
6. Structured Data Extraction

## Claude Code Plugin

For a terminal-based study experience inside Claude Code, install the [claude-certified-architect](https://github.com/carolinacherry/claude-certified-architect) plugin:

```
/plugin marketplace add carolinacherry/claude-certified-architect
/plugin install claude-certified-architect
/claude-certified-architect
```

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS

## Source

Content derived from the [Claude Certified Architect — Foundations Certification Exam Guide](https://anthropic.skilljar.com/claude-certified-architect-foundations-access-request) by Anthropic.

## License

MIT
