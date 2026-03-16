export interface TaskStatement {
  id: string;
  title: string;
  knowledge: string[];
  skills: string[];
}

export interface Domain {
  id: number;
  name: string;
  weight: number;
  taskStatements: TaskStatement[];
  scenarios: string[];
}

export const scenarios = [
  "Customer Support Agent",
  "Code Generation",
  "Multi-Agent Research",
  "Developer Productivity Tools",
  "CI/CD Integration",
  "Structured Data Extraction",
] as const;

export type Scenario = (typeof scenarios)[number];

export const domains: Domain[] = [
  {
    id: 1,
    name: "Agentic Architecture & Orchestration",
    weight: 27,
    scenarios: [
      "Customer Support Agent",
      "Multi-Agent Research",
      "Developer Productivity Tools",
    ],
    taskStatements: [
      {
        id: "1.1",
        title:
          "Design and implement agentic loops for autonomous task execution",
        knowledge: [
          "Agentic loop structure: prompt, tool calls, evaluation, iteration",
          "Stop conditions and convergence criteria",
          "Token budget management within loops",
          "Retry and backoff strategies for tool failures",
        ],
        skills: [
          "Implementing agentic loops with proper termination logic",
          "Designing evaluation criteria for loop convergence",
          "Managing token consumption across iterations",
        ],
      },
      {
        id: "1.2",
        title:
          "Orchestrate multi-agent systems with coordinator-subagent patterns",
        knowledge: [
          "Coordinator-subagent architecture patterns",
          "Task routing and delegation strategies",
          "Inter-agent communication protocols",
          "Parallelism and sequential orchestration tradeoffs",
        ],
        skills: [
          "Implementing coordinator agents that decompose and delegate tasks",
          "Designing communication interfaces between agents",
          "Balancing parallel and sequential agent execution",
        ],
      },
      {
        id: "1.3",
        title:
          "Configure subagent invocation, context passing, and spawning",
        knowledge: [
          "Subagent spawning mechanisms and lifecycle management",
          "Context window sharing vs isolation tradeoffs",
          "Prompt injection risks in context passing",
          "Cost implications of context duplication",
        ],
        skills: [
          "Configuring subagent invocation with appropriate context scoping",
          "Implementing secure context passing between agents",
          "Managing subagent lifecycle and resource cleanup",
        ],
      },
      {
        id: "1.4",
        title:
          "Implement multi-step workflows with enforcement and handoff patterns",
        knowledge: [
          "Workflow state machines and transition logic",
          "Enforcement patterns for step ordering and validation",
          "Handoff protocols between workflow stages",
          "Error recovery and compensation in multi-step flows",
        ],
        skills: [
          "Building enforced multi-step workflows with validation gates",
          "Implementing clean handoff between workflow stages",
          "Designing rollback and compensation strategies",
        ],
      },
      {
        id: "1.5",
        title:
          "Apply Agent SDK hooks for tool call interception and data normalization",
        knowledge: [
          "Agent SDK hook lifecycle and invocation points",
          "Tool call interception patterns for logging and modification",
          "Data normalization strategies across tool responses",
          "Hook ordering and composition",
        ],
        skills: [
          "Implementing hooks for tool call pre/post-processing",
          "Normalizing heterogeneous tool outputs into consistent formats",
          "Using hooks for audit logging and observability",
        ],
      },
      {
        id: "1.6",
        title: "Design task decomposition strategies for complex workflows",
        knowledge: [
          "Task decomposition heuristics and granularity tradeoffs",
          "Dependency graph analysis for task ordering",
          "Dynamic vs static decomposition strategies",
          "Cost-quality tradeoffs in decomposition depth",
        ],
        skills: [
          "Breaking complex tasks into well-scoped subtasks",
          "Identifying parallelizable vs sequential dependencies",
          "Adjusting decomposition granularity based on task complexity",
        ],
      },
      {
        id: "1.7",
        title: "Manage session state, resumption, and forking",
        knowledge: [
          "Session persistence and serialization strategies",
          "Resumption from checkpoints after failures",
          "Session forking for parallel exploration",
          "State consistency guarantees across resumptions",
        ],
        skills: [
          "Implementing session checkpointing for long-running tasks",
          "Designing resumption logic that handles partial completion",
          "Managing forked sessions with proper state isolation",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Tool Design & MCP Integration",
    weight: 18,
    scenarios: [
      "Customer Support Agent",
      "Code Generation",
      "Developer Productivity Tools",
    ],
    taskStatements: [
      {
        id: "2.1",
        title:
          "Design effective tool interfaces with clear descriptions and boundaries",
        knowledge: [
          "Tool description best practices for LLM comprehension",
          "Parameter schema design with types and constraints",
          "Tool boundary definition and single-responsibility principle",
          "Naming conventions that improve tool selection accuracy",
        ],
        skills: [
          "Writing tool descriptions that guide correct usage",
          "Designing parameter schemas with appropriate validation",
          "Scoping tool functionality to avoid ambiguity",
        ],
      },
      {
        id: "2.2",
        title: "Implement structured error responses for MCP tools",
        knowledge: [
          "MCP error response format and conventions",
          "Error categorization: retryable vs terminal failures",
          "Error message design for LLM consumption",
          "Graceful degradation patterns for tool failures",
        ],
        skills: [
          "Implementing error responses that help the model recover",
          "Categorizing errors to enable appropriate retry behavior",
          "Designing fallback paths for critical tool failures",
        ],
      },
      {
        id: "2.3",
        title:
          "Distribute tools appropriately across agents and configure tool choice",
        knowledge: [
          "Tool distribution strategies in multi-agent systems",
          "Tool choice configuration: auto, any, specific tool forcing",
          "Tool overload and its impact on model performance",
          "Principle of least privilege for tool access",
        ],
        skills: [
          "Assigning tools to agents based on role and responsibility",
          "Configuring tool_choice to guide model behavior",
          "Managing tool count to avoid decision paralysis",
        ],
      },
      {
        id: "2.4",
        title:
          "Integrate MCP servers into Claude Code and agent workflows",
        knowledge: [
          "MCP server architecture: stdio and HTTP transports",
          "MCP configuration in Claude Code settings",
          "Server lifecycle management and connection handling",
          "Security considerations for MCP server access",
        ],
        skills: [
          "Configuring MCP servers in Claude Code projects",
          "Implementing MCP servers with proper transport handling",
          "Managing MCP server connections in production workflows",
        ],
      },
      {
        id: "2.5",
        title:
          "Select and apply built-in tools (Read, Write, Edit, Bash, Grep, Glob) effectively",
        knowledge: [
          "Built-in tool capabilities, strengths, and limitations",
          "Tool selection criteria for different file operations",
          "Performance characteristics of search tools (Grep vs Glob)",
          "Safety considerations for Bash and Write operations",
        ],
        skills: [
          "Choosing the optimal built-in tool for each operation",
          "Composing built-in tools for complex file operations",
          "Applying safety practices when using destructive tools",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Claude Code Configuration & Workflows",
    weight: 20,
    scenarios: [
      "Code Generation",
      "Developer Productivity Tools",
      "CI/CD Integration",
    ],
    taskStatements: [
      {
        id: "3.1",
        title:
          "Configure CLAUDE.md files with appropriate hierarchy, scoping, and modular organization",
        knowledge: [
          "CLAUDE.md hierarchy: global, project, directory-level",
          "Scoping rules and precedence for conflicting instructions",
          "Modular organization with imports and references",
          "Content categories: style, constraints, context, workflows",
        ],
        skills: [
          "Structuring CLAUDE.md files for maintainability",
          "Implementing directory-scoped conventions",
          "Organizing instructions by category and priority",
        ],
      },
      {
        id: "3.2",
        title: "Create and configure custom slash commands and skills",
        knowledge: [
          "Slash command definition syntax and configuration",
          "Skill file format and capability specification",
          "Parameter passing and argument handling",
          "Command discovery and documentation patterns",
        ],
        skills: [
          "Creating custom slash commands for repeated workflows",
          "Defining skills with appropriate tool access",
          "Documenting commands for team discoverability",
        ],
      },
      {
        id: "3.3",
        title: "Apply path-specific rules for conditional convention loading",
        knowledge: [
          "Path-based rule matching and glob patterns",
          "Conditional loading based on file type and location",
          "Rule inheritance and override behavior",
          "Performance implications of rule evaluation",
        ],
        skills: [
          "Configuring path-specific rules for different project areas",
          "Implementing conditional conventions based on file context",
          "Testing and validating rule matching behavior",
        ],
      },
      {
        id: "3.4",
        title: "Determine when to use plan mode vs direct execution",
        knowledge: [
          "Plan mode capabilities and use cases",
          "Direct execution tradeoffs: speed vs safety",
          "Task complexity indicators for mode selection",
          "Plan mode for multi-file architectural changes",
        ],
        skills: [
          "Evaluating task complexity to choose the right mode",
          "Using plan mode for exploration before committing to changes",
          "Combining plan and execution modes in complex workflows",
        ],
      },
      {
        id: "3.5",
        title:
          "Apply iterative refinement techniques for progressive improvement",
        knowledge: [
          "Iterative refinement loop patterns",
          "Feedback incorporation strategies",
          "Quality convergence indicators",
          "Diminishing returns and stopping criteria",
        ],
        skills: [
          "Implementing iterative improvement workflows",
          "Evaluating output quality across iterations",
          "Knowing when to stop refining and ship",
        ],
      },
      {
        id: "3.6",
        title: "Integrate Claude Code into CI/CD pipelines",
        knowledge: [
          "CI/CD integration patterns for Claude Code",
          "Headless and non-interactive mode configuration",
          "Pipeline authentication and security",
          "Cost management in automated pipelines",
        ],
        skills: [
          "Configuring Claude Code for headless CI/CD execution",
          "Implementing automated code review in pipelines",
          "Managing costs and rate limits in automated workflows",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Prompt Engineering & Structured Output",
    weight: 20,
    scenarios: [
      "Customer Support Agent",
      "Code Generation",
      "Structured Data Extraction",
    ],
    taskStatements: [
      {
        id: "4.1",
        title:
          "Design prompts with explicit criteria to improve precision and reduce false positives",
        knowledge: [
          "Explicit criteria specification techniques",
          "Negative constraints and boundary definitions",
          "Precision-recall tradeoffs in prompt design",
          "Evaluation rubrics for prompt effectiveness",
        ],
        skills: [
          "Writing prompts with clear acceptance criteria",
          "Defining negative examples and boundary cases",
          "Measuring and improving prompt precision",
        ],
      },
      {
        id: "4.2",
        title:
          "Apply few-shot prompting to improve output consistency and quality",
        knowledge: [
          "Few-shot example selection strategies",
          "Example ordering and diversity considerations",
          "Token cost tradeoffs for few-shot examples",
          "When few-shot outperforms zero-shot and vice versa",
        ],
        skills: [
          "Curating effective few-shot example sets",
          "Balancing example diversity with consistency",
          "Optimizing few-shot token usage",
        ],
      },
      {
        id: "4.3",
        title: "Enforce structured output using tool use and JSON schemas",
        knowledge: [
          "Tool-based structured output enforcement",
          "JSON schema design for output validation",
          "Schema complexity and model compliance tradeoffs",
          "Fallback strategies for schema violations",
        ],
        skills: [
          "Designing JSON schemas that balance strictness and flexibility",
          "Using tool_choice to force structured output",
          "Implementing validation and correction for malformed outputs",
        ],
      },
      {
        id: "4.4",
        title:
          "Implement validation, retry, and feedback loops for extraction quality",
        knowledge: [
          "Validation strategies for extracted data",
          "Retry loop design with progressive prompting",
          "Feedback loop patterns for self-correction",
          "Quality metrics for extraction tasks",
        ],
        skills: [
          "Building validation pipelines for extracted data",
          "Implementing retry logic with enhanced prompting",
          "Designing feedback loops that improve extraction quality",
        ],
      },
      {
        id: "4.5",
        title: "Design efficient batch processing strategies",
        knowledge: [
          "Batch size optimization for throughput and cost",
          "Parallel vs sequential batch processing tradeoffs",
          "Rate limiting and concurrency management",
          "Error handling in batch workflows",
        ],
        skills: [
          "Designing batch processing pipelines for large datasets",
          "Optimizing batch sizes for cost and quality",
          "Implementing robust error handling for batch failures",
        ],
      },
      {
        id: "4.6",
        title: "Design multi-instance and multi-pass review architectures",
        knowledge: [
          "Multi-instance voting and consensus patterns",
          "Multi-pass review for quality improvement",
          "Cost-quality tradeoffs in review architectures",
          "Judge-reviewer separation of concerns",
        ],
        skills: [
          "Implementing multi-instance generation with consensus",
          "Designing multi-pass review pipelines",
          "Balancing review thoroughness with cost constraints",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Context Management & Reliability",
    weight: 15,
    scenarios: [
      "Multi-Agent Research",
      "CI/CD Integration",
      "Customer Support Agent",
    ],
    taskStatements: [
      {
        id: "5.1",
        title:
          "Preserve critical information across long conversations and agent handoffs",
        knowledge: [
          "Context preservation strategies across conversation turns",
          "Summarization and compression techniques",
          "Handoff protocols that maintain critical context",
          "Information loss detection and mitigation",
        ],
        skills: [
          "Implementing context preservation across agent boundaries",
          "Designing handoff protocols that minimize information loss",
          "Building summarization pipelines for long conversations",
        ],
      },
      {
        id: "5.2",
        title:
          "Design escalation triggers and ambiguity resolution strategies",
        knowledge: [
          "Confidence thresholds for escalation decisions",
          "Ambiguity detection heuristics",
          "Escalation routing and priority systems",
          "Human-in-the-loop integration points",
        ],
        skills: [
          "Configuring confidence-based escalation triggers",
          "Implementing ambiguity detection and clarification flows",
          "Designing escalation paths with appropriate urgency levels",
        ],
      },
      {
        id: "5.3",
        title:
          "Implement structured error propagation in multi-agent systems",
        knowledge: [
          "Error propagation patterns in distributed agent systems",
          "Error classification and severity levels",
          "Cascading failure prevention strategies",
          "Error context preservation across agent boundaries",
        ],
        skills: [
          "Implementing structured error propagation between agents",
          "Designing circuit breaker patterns for agent failures",
          "Building error recovery flows that preserve context",
        ],
      },
      {
        id: "5.4",
        title:
          "Manage context degradation during extended codebase exploration",
        knowledge: [
          "Context window utilization patterns during exploration",
          "Information prioritization in limited context",
          "Progressive summarization strategies",
          "Tool-based context augmentation techniques",
        ],
        skills: [
          "Monitoring and managing context window usage",
          "Implementing progressive summarization for long explorations",
          "Using tools to offload context when windows fill",
        ],
      },
      {
        id: "5.5",
        title:
          "Design human review workflows with confidence-calibrated routing",
        knowledge: [
          "Confidence calibration techniques for model outputs",
          "Review queue design and prioritization",
          "Threshold tuning for automation vs review routing",
          "Feedback incorporation from human reviewers",
        ],
        skills: [
          "Implementing confidence-calibrated routing logic",
          "Designing review interfaces that surface relevant context",
          "Tuning automation thresholds based on review feedback",
        ],
      },
      {
        id: "5.6",
        title: "Maintain information provenance and source attribution",
        knowledge: [
          "Provenance tracking across agent processing chains",
          "Source attribution formats and standards",
          "Citation accuracy and hallucination prevention",
          "Audit trail design for multi-step processing",
        ],
        skills: [
          "Implementing provenance tracking in agent workflows",
          "Designing attribution systems that resist hallucination",
          "Building audit trails for compliance and debugging",
        ],
      },
    ],
  },
];

export function getDomain(id: number): Domain | undefined {
  return domains.find((d) => d.id === id);
}

export function getTotalTaskStatements(): number {
  return domains.reduce((sum, d) => sum + d.taskStatements.length, 0);
}
