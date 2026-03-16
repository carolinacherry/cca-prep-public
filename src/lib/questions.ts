export interface Question {
  id: string;
  domain: number;
  taskStatements: string[];
  scenario: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  distractorExplanations: Record<string, string>;
}

const questions: Question[] = [
  {
    id: "d1-q1",
    domain: 1,
    taskStatements: ["1.4", "1.5"],
    scenario: "Customer Support Agent",
    question:
      "Production data shows that in 12% of cases, your agent skips get_customer entirely and calls lookup_order using only the customer's stated name, occasionally leading to misidentified accounts and incorrect refunds. What change would most effectively address this reliability issue?",
    options: [
      {
        label: "A",
        text: "Add a programmatic prerequisite that blocks lookup_order and process_refund calls until get_customer has returned a verified customer ID.",
      },
      {
        label: "B",
        text: "Enhance the system prompt to state that customer verification via get_customer is mandatory before any order operations.",
      },
      {
        label: "C",
        text: "Add few-shot examples showing the agent always calling get_customer first, even when customers volunteer order details.",
      },
      {
        label: "D",
        text: "Implement a routing classifier that analyzes each request and enables only the subset of tools appropriate for that request type.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "When a specific tool sequence is required for critical business logic (like verifying customer identity before processing refunds), programmatic enforcement provides deterministic guarantees that prompt-based approaches cannot. Options B and C rely on probabilistic LLM compliance, which is insufficient when errors have financial consequences. Option D addresses tool availability rather than tool ordering, which is not the actual problem.",
    distractorExplanations: {
      B: "Prompt-based instructions rely on probabilistic LLM compliance. With 12% failure rate on a critical path involving financial transactions, you need deterministic enforcement, not stronger suggestions.",
      C: "Few-shot examples improve compliance rates but still depend on the model following the pattern. They cannot guarantee the required sequence for every interaction.",
      D: "A routing classifier controls which tools are available, not the order in which they're called. The problem here is tool ordering, not tool selection.",
    },
  },
  {
    id: "d2-q1",
    domain: 2,
    taskStatements: ["2.1"],
    scenario: "Customer Support Agent",
    question:
      "Production logs show the agent frequently calls get_customer when users ask about orders (e.g., 'check my order #12345'), instead of calling lookup_order. Both tools have minimal descriptions ('Retrieves customer information' / 'Retrieves order details') and accept similar identifier formats. What's the most effective first step to improve tool selection reliability?",
    options: [
      {
        label: "A",
        text: "Add few-shot examples to the system prompt demonstrating correct tool selection patterns, with 5-8 examples showing order-related queries routing to lookup_order.",
      },
      {
        label: "B",
        text: "Expand each tool's description to include input formats, example queries, edge cases, and boundaries explaining when to use it versus similar tools.",
      },
      {
        label: "C",
        text: "Implement a routing layer that parses user input before each turn and pre-selects the appropriate tool based on detected keywords and identifier patterns.",
      },
      {
        label: "D",
        text: "Consolidate both tools into a single lookup_entity tool that accepts any identifier and internally determines which backend to query.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "Tool descriptions are the primary mechanism LLMs use for tool selection. When descriptions are minimal, models lack the context to differentiate between similar tools. Option B directly addresses this root cause with a low-effort, high-leverage fix. Few-shot examples (A) add token overhead without fixing the underlying issue. A routing layer (C) is over-engineered and bypasses the LLM's natural language understanding. Consolidating tools (D) is a valid architectural choice but requires more effort than a \"first step\" warrants when the immediate problem is inadequate descriptions.",
    distractorExplanations: {
      A: "Few-shot examples add token overhead without fixing the underlying issue. The model still lacks clear tool descriptions to reason about, so it would need examples for every possible query pattern.",
      C: "A keyword-based routing layer is over-engineered for this problem and bypasses the LLM's natural language understanding, which is the whole point of using an agent.",
      D: "Consolidating tools is a valid architectural choice but requires significantly more effort than improving descriptions. As a 'first step,' it's disproportionate when the root cause is simply inadequate descriptions.",
    },
  },
  {
    id: "d5-q1",
    domain: 5,
    taskStatements: ["5.2"],
    scenario: "Customer Support Agent",
    question:
      "Your agent achieves 55% first-contact resolution, well below the 80% target. Logs show it escalates straightforward cases (standard damage replacements with photo evidence) while attempting to autonomously handle complex situations requiring policy exceptions. What's the most effective way to improve escalation calibration?",
    options: [
      {
        label: "A",
        text: "Add explicit escalation criteria to your system prompt with few-shot examples demonstrating when to escalate versus resolve autonomously.",
      },
      {
        label: "B",
        text: "Have the agent self-report a confidence score (1-10) before each response and automatically route to humans when confidence falls below a threshold.",
      },
      {
        label: "C",
        text: "Deploy a separate classifier model trained on historical tickets to predict which requests need escalation before the main agent begins processing.",
      },
      {
        label: "D",
        text: "Implement sentiment analysis to detect customer frustration levels and automatically escalate when negative sentiment exceeds a threshold.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Adding explicit escalation criteria with few-shot examples directly addresses the root cause: unclear decision boundaries. This is the proportionate first response before adding infrastructure. Option B fails because LLM self-reported confidence is poorly calibrated\u2014the agent is already incorrectly confident on hard cases and uncertain on easy ones. Option C is over-engineered, requiring labeled data and ML infrastructure when prompt optimization hasn't been tried. Option D solves a different problem entirely; sentiment doesn't correlate with case complexity, which is the actual issue.",
    distractorExplanations: {
      B: "LLM self-reported confidence is poorly calibrated. The agent is already incorrectly confident on hard cases and uncertain on easy ones, so a confidence threshold would likely reinforce the existing miscalibration.",
      C: "Deploying a separate classifier requires labeled training data and ML infrastructure. This is over-engineered when prompt optimization (the simplest intervention) hasn't been tried yet.",
      D: "Sentiment analysis detects customer frustration, not case complexity. A calm customer with a complex policy exception still needs escalation, while a frustrated customer with a simple replacement doesn't.",
    },
  },
  {
    id: "d3-q1",
    domain: 3,
    taskStatements: ["3.2"],
    scenario: "Code Generation",
    question:
      "You want to create a custom /review slash command that runs your team's standard code review checklist. This command should be available to every developer when they clone or pull the repository. Where should you create this command file?",
    options: [
      {
        label: "A",
        text: "In the .claude/commands/ directory in the project repository",
      },
      {
        label: "B",
        text: "In ~/.claude/commands/ in each developer's home directory",
      },
      {
        label: "C",
        text: "In the CLAUDE.md file at the project root",
      },
      {
        label: "D",
        text: "In a .claude/config.json file with a commands array",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Project-scoped custom slash commands should be stored in the .claude/commands/ directory within the repository. These commands are version-controlled and automatically available to all developers when they clone or pull the repo. Option B (~/.claude/commands/) is for personal commands that aren't shared via version control. Option C (CLAUDE.md) is for project instructions and context, not command definitions. Option D describes a configuration mechanism that doesn't exist in Claude Code.",
    distractorExplanations: {
      B: "~/.claude/commands/ stores personal commands local to each developer's machine. These aren't version-controlled or shared when others clone the repository.",
      C: "CLAUDE.md is for project-level instructions and context that Claude reads automatically. It's not the mechanism for defining slash commands.",
      D: "There is no .claude/config.json commands array in Claude Code. This configuration mechanism doesn't exist.",
    },
  },
  {
    id: "d3-q2",
    domain: 3,
    taskStatements: ["3.4"],
    scenario: "Code Generation",
    question:
      "You've been assigned to restructure the team's monolithic application into microservices. This will involve changes across dozens of files and requires decisions about service boundaries and module dependencies. Which approach should you take?",
    options: [
      {
        label: "A",
        text: "Enter plan mode to explore the codebase, understand dependencies, and design an implementation approach before making changes.",
      },
      {
        label: "B",
        text: "Start with direct execution and make changes incrementally, letting the implementation reveal the natural service boundaries.",
      },
      {
        label: "C",
        text: "Use direct execution with comprehensive upfront instructions detailing exactly how each service should be structured.",
      },
      {
        label: "D",
        text: "Begin in direct execution mode and only switch to plan mode if you encounter unexpected complexity during implementation.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Plan mode is designed for complex tasks involving large-scale changes, multiple valid approaches, and architectural decisions\u2014exactly what monolith-to-microservices restructuring requires. It enables safe codebase exploration and design before committing to changes. Option B risks costly rework when dependencies are discovered late. Option C assumes you already know the right structure without exploring the code. Option D ignores that the complexity is already stated in the requirements, not something that might emerge later.",
    distractorExplanations: {
      B: "Incremental execution without a plan risks costly rework when hidden dependencies surface later. For a monolith restructuring, discovering service boundaries after making changes leads to backtracking.",
      C: "Providing comprehensive upfront instructions assumes you already understand the codebase well enough to dictate service structure. Without exploration, these instructions are likely incomplete or wrong.",
      D: "The complexity is already evident from the requirements (dozens of files, service boundaries, module dependencies). Waiting to encounter it during execution wastes effort on changes that may need to be reversed.",
    },
  },
  {
    id: "d3-q3",
    domain: 3,
    taskStatements: ["3.3"],
    scenario: "Code Generation",
    question:
      "Your codebase has distinct areas with different coding conventions: React components use functional style with hooks, API handlers use async/await with specific error handling, and database models follow a repository pattern. Test files are spread throughout the codebase alongside the code they test (e.g., Button.test.tsx next to Button.tsx), and you want all tests to follow the same conventions regardless of location. What's the most maintainable way to ensure Claude automatically applies the correct conventions when generating code?",
    options: [
      {
        label: "A",
        text: "Create rule files in .claude/rules/ with YAML frontmatter specifying glob patterns to conditionally apply conventions based on file paths",
      },
      {
        label: "B",
        text: "Consolidate all conventions in the root CLAUDE.md file under headers for each area, relying on Claude to infer which section applies",
      },
      {
        label: "C",
        text: "Create skills in .claude/skills/ for each code type that include the relevant conventions in their SKILL.md files",
      },
      {
        label: "D",
        text: "Place a separate CLAUDE.md file in each subdirectory containing that area's specific conventions",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Option A is correct because .claude/rules/ with glob patterns (e.g., **/*.test.tsx) allows conventions to be automatically applied based on file paths regardless of directory location\u2014essential for test files spread throughout the codebase. Option B relies on inference rather than explicit matching, making it unreliable. Option C requires manual skill invocation or relies on Claude choosing to load them, contradicting the need for deterministic \"automatic\" application based on file paths. Option D can't easily handle files spread across many directories since CLAUDE.md files are directory-bound.",
    distractorExplanations: {
      B: "Relying on Claude to infer which conventions apply from a single file is unreliable. There's no deterministic mechanism ensuring the right section is applied to the right file type.",
      C: "Skills require manual invocation or depend on Claude choosing to load them. This contradicts the requirement for automatic application based on file paths.",
      D: "CLAUDE.md files are directory-bound. For test files spread throughout the codebase (in many different directories), you'd need to duplicate the test conventions CLAUDE.md in every directory that contains tests.",
    },
  },
  {
    id: "d1-q2",
    domain: 1,
    taskStatements: ["1.2", "1.6"],
    scenario: "Multi-Agent Research",
    question:
      "After running the system on the topic 'impact of AI on creative industries,' you observe that each subagent completes successfully: the web search agent finds relevant articles, the document analysis agent summarizes papers correctly, and the synthesis agent produces coherent output. However, the final reports cover only visual arts, completely missing music, writing, and film production. When you examine the coordinator's logs, you see it decomposed the topic into three subtasks: 'AI in digital art creation,' 'AI in graphic design,' and 'AI in photography.' What is the most likely root cause?",
    options: [
      {
        label: "A",
        text: "The synthesis agent lacks instructions for identifying coverage gaps in the findings it receives from other agents.",
      },
      {
        label: "B",
        text: "The coordinator agent's task decomposition is too narrow, resulting in subagent assignments that don't cover all relevant domains of the topic.",
      },
      {
        label: "C",
        text: "The web search agent's queries are not comprehensive enough and need to be expanded to cover more creative industry sectors.",
      },
      {
        label: "D",
        text: "The document analysis agent is filtering out sources related to non-visual creative industries due to overly restrictive relevance criteria.",
      },
    ],
    correctAnswer: "B",
    explanation:
      "The coordinator's logs reveal the root cause directly: it decomposed \"creative industries\" into only visual arts subtasks (digital art, graphic design, photography), completely omitting music, writing, and film. The subagents executed their assigned tasks correctly\u2014the problem is what they were assigned. Options A, C, and D incorrectly blame downstream agents that are working correctly within their assigned scope.",
    distractorExplanations: {
      A: "The synthesis agent's job is to combine findings it receives, not to identify what the coordinator failed to assign. The coverage gap originates upstream at task decomposition.",
      C: "The web search agent found relevant articles for the tasks it was given. It searched correctly within its assigned scope\u2014the problem is that scope was too narrow.",
      D: "The document analysis agent summarized papers correctly for its assigned subtasks. There's no evidence of filtering; the non-visual sources were never searched for in the first place.",
    },
  },
  {
    id: "d5-q2",
    domain: 5,
    taskStatements: ["5.3"],
    scenario: "Multi-Agent Research",
    question:
      "The web search subagent times out while researching a complex topic. You need to design how this failure information flows back to the coordinator agent. Which error propagation approach best enables intelligent recovery?",
    options: [
      {
        label: "A",
        text: "Return structured error context to the coordinator including the failure type, the attempted query, any partial results, and potential alternative approaches.",
      },
      {
        label: "B",
        text: "Implement automatic retry logic with exponential backoff within the subagent, returning a generic \"search unavailable\" status only after all retries are exhausted.",
      },
      {
        label: "C",
        text: "Catch the timeout within the subagent and return an empty result set marked as successful.",
      },
      {
        label: "D",
        text: "Propagate the timeout exception directly to a top-level handler that terminates the entire research workflow.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Structured error context gives the coordinator the information it needs to make intelligent recovery decisions\u2014whether to retry with a modified query, try an alternative approach, or proceed with partial results. Option B's generic status hides valuable context from the coordinator, preventing informed decisions. Option C suppresses the error by marking failure as success, which prevents any recovery and risks incomplete research outputs. Option D terminates the entire workflow unnecessarily when recovery strategies could succeed.",
    distractorExplanations: {
      B: "A generic 'search unavailable' status hides the failure type, attempted query, and partial results from the coordinator. Without this context, the coordinator cannot make informed recovery decisions.",
      C: "Returning an empty result marked as successful suppresses the error entirely. The coordinator has no way to know data is missing and will produce incomplete output without any recovery attempt.",
      D: "Terminating the entire workflow for a single subagent timeout is disproportionate. The coordinator may have recovery strategies (modified queries, alternative sources, partial results) that could salvage the research.",
    },
  },
  {
    id: "d2-q2",
    domain: 2,
    taskStatements: ["2.3"],
    scenario: "Multi-Agent Research",
    question:
      "During testing, you observe that the synthesis agent frequently needs to verify specific claims while combining findings. Currently, when verification is needed, the synthesis agent returns control to the coordinator, which invokes the web search agent, then re-invokes synthesis with results. This adds 2-3 round trips per task and increases latency by 40%. Your evaluation shows that 85% of these verifications are simple fact-checks (dates, names, statistics) while 15% require deeper investigation. What's the most effective approach to reduce overhead while maintaining system reliability?",
    options: [
      {
        label: "A",
        text: "Give the synthesis agent a scoped verify_fact tool for simple lookups, while complex verifications continue delegating to the web search agent through the coordinator.",
      },
      {
        label: "B",
        text: "Have the synthesis agent accumulate all verification needs and return them as a batch to the coordinator at the end of its pass, which then sends them all to the web search agent at once.",
      },
      {
        label: "C",
        text: "Give the synthesis agent access to all web search tools so it can handle any verification need directly without round-trips through the coordinator.",
      },
      {
        label: "D",
        text: "Have the web search agent proactively cache extra context around each source during initial research, anticipating what the synthesis agent might need to verify.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Option A applies the principle of least privilege by giving the synthesis agent only what it needs for the 85% common case (simple fact verification) while preserving the existing coordination pattern for complex cases. Option B's batching approach creates blocking dependencies since synthesis steps may depend on earlier verified facts. Option C over-provisions the synthesis agent, violating separation of concerns. Option D relies on speculative caching that cannot reliably predict what the synthesis agent will need to verify.",
    distractorExplanations: {
      B: "Batching all verifications to the end creates blocking dependencies. The synthesis agent may need verified facts from step 2 to proceed with step 3, making end-of-pass batching impractical.",
      C: "Giving the synthesis agent full web search capabilities violates separation of concerns and the principle of least privilege. It over-provisions the agent beyond what 85% of cases require.",
      D: "Speculative caching cannot reliably predict what the synthesis agent will need to verify. It wastes resources fetching unnecessary context and still misses unpredictable verification needs.",
    },
  },
  {
    id: "d3-q4",
    domain: 3,
    taskStatements: ["3.6"],
    scenario: "CI/CD",
    question:
      "Your pipeline script runs `claude 'Analyze this pull request for security issues'` but the job hangs indefinitely. Logs indicate Claude Code is waiting for interactive input. What's the correct approach to run Claude Code in an automated pipeline?",
    options: [
      {
        label: "A",
        text: 'Add the -p flag: `claude -p "Analyze this pull request for security issues"`',
      },
      {
        label: "B",
        text: "Set the environment variable CLAUDE_HEADLESS=true before running the command",
      },
      {
        label: "C",
        text: 'Redirect stdin from /dev/null: `claude "Analyze this pull request for security issues" < /dev/null`',
      },
      {
        label: "D",
        text: 'Add the --batch flag: `claude --batch "Analyze this pull request for security issues"`',
      },
    ],
    correctAnswer: "A",
    explanation:
      "The -p (or --print) flag is the documented way to run Claude Code in non-interactive mode. It processes the prompt, outputs the result to stdout, and exits without waiting for user input\u2014exactly what CI/CD pipelines require. The other options reference non-existent features (CLAUDE_HEADLESS environment variable, --batch flag) or use Unix workarounds that don't properly address Claude Code's command syntax.",
    distractorExplanations: {
      B: "CLAUDE_HEADLESS is not a real environment variable recognized by Claude Code. This is a fabricated option.",
      C: "Redirecting stdin from /dev/null is a generic Unix trick, but it doesn't properly invoke Claude Code's non-interactive mode. The tool needs the -p flag to know it should process and exit.",
      D: "The --batch flag does not exist in Claude Code. The correct flag for non-interactive mode is -p (or --print).",
    },
  },
  {
    id: "d4-q1",
    domain: 4,
    taskStatements: ["4.5"],
    scenario: "CI/CD",
    question:
      "Your team wants to reduce API costs for automated analysis. Currently, real-time Claude calls power two workflows: (1) a blocking pre-merge check that must complete before developers can merge, and (2) a technical debt report generated overnight for review the next morning. Your manager proposes switching both to the Message Batches API for its 50% cost savings. How should you evaluate this proposal?",
    options: [
      {
        label: "A",
        text: "Use batch processing for the technical debt reports only; keep real-time calls for pre-merge checks.",
      },
      {
        label: "B",
        text: "Switch both workflows to batch processing with status polling to check for completion.",
      },
      {
        label: "C",
        text: "Keep real-time calls for both workflows to avoid batch result ordering issues.",
      },
      {
        label: "D",
        text: "Switch both to batch processing with a timeout fallback to real-time if batches take too long.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "The Message Batches API offers 50% cost savings but has processing times up to 24 hours with no guaranteed latency SLA. This makes it unsuitable for blocking pre-merge checks where developers wait for results, but ideal for overnight batch jobs like technical debt reports. Option B is wrong because relying on \"often faster\" completion isn't acceptable for blocking workflows. Option C reflects a misconception\u2014batch results can be correlated using custom_id fields. Option D adds unnecessary complexity when the simpler solution is matching each API to its appropriate use case.",
    distractorExplanations: {
      B: "Batch processing has no guaranteed latency SLA (up to 24 hours). Using it for blocking pre-merge checks would leave developers waiting indefinitely, which is unacceptable for merge workflows.",
      C: "Batch result ordering is not actually a problem\u2014the Message Batches API uses custom_id fields to correlate requests with responses. This concern is based on a misconception.",
      D: "Adding timeout fallback logic introduces unnecessary complexity. The simpler and more reliable approach is to use the right API for each use case from the start.",
    },
  },
  {
    id: "d4-q2",
    domain: 4,
    taskStatements: ["4.6", "1.6"],
    scenario: "CI/CD",
    question:
      "A pull request modifies 14 files across the stock tracking module. Your single-pass review analyzing all files together produces inconsistent results: detailed feedback for some files but superficial comments for others, obvious bugs missed, and contradictory feedback\u2014flagging a pattern as problematic in one file while approving identical code elsewhere in the same PR. How should you restructure the review?",
    options: [
      {
        label: "A",
        text: "Split into focused passes: analyze each file individually for local issues, then run a separate integration-focused pass examining cross-file data flow.",
      },
      {
        label: "B",
        text: "Require developers to split large PRs into smaller submissions of 3-4 files before the automated review runs.",
      },
      {
        label: "C",
        text: "Switch to a higher-tier model with a larger context window to give all 14 files adequate attention in one pass.",
      },
      {
        label: "D",
        text: "Run three independent review passes on the full PR and only flag issues that appear in at least two of the three runs.",
      },
    ],
    correctAnswer: "A",
    explanation:
      "Splitting reviews into focused passes directly addresses the root cause: attention dilution when processing many files at once. File-by-file analysis ensures consistent depth, while a separate integration pass catches cross-file issues. Option B shifts burden to developers without improving the system. Option C misunderstands that larger context windows don't solve attention quality issues. Option D would actually suppress detection of real bugs by requiring consensus on issues that may only be caught intermittently.",
    distractorExplanations: {
      B: "Requiring developers to split PRs shifts the burden to humans without improving the automated review system. Large PRs are sometimes necessary, and the system should handle them.",
      C: "Larger context windows don't solve attention quality issues. The problem isn't that the model can't fit 14 files\u2014it's that processing them all at once dilutes attention, leading to inconsistent depth.",
      D: "Requiring consensus across three runs would suppress real bugs that are only caught intermittently. This approach trades false positives for false negatives, missing genuine issues.",
    },
  },
  {
    id: "d2-q3",
    domain: 2,
    taskStatements: ["2.2"],
    scenario: "Customer Support Agent",
    question: "Your customer support agent calls lookup_order and receives an empty array. It retries 3 times, then escalates to a human agent saying 'the system is experiencing issues.' Investigation reveals the customer's account genuinely has no orders. What's the root cause of the agent's incorrect behavior?",
    options: [
      { label: "A", text: "The agent lacks retry logic with exponential backoff for transient failures." },
      { label: "B", text: "The tool returns an empty array for both 'no results found' and 'service unavailable,' making the agent unable to distinguish between access failure and valid empty results." },
      { label: "C", text: "The system prompt doesn't instruct the agent to check for empty results before retrying." },
      { label: "D", text: "The lookup_order tool should throw an exception when no orders are found instead of returning an empty array." }
    ],
    correctAnswer: "B",
    explanation: "The tool conflates two distinct outcomes: a successful query with no matches (valid empty result) and a failure to reach the data source (access failure). Without structured error metadata distinguishing these cases, the agent treats 'no orders' as a failure and retries unnecessarily. The fix is to return structured responses with an isError flag and error category.",
    distractorExplanations: {
      A: "The agent already has retry logic — that's actually the problem. It's retrying when it shouldn't because it can't tell the difference between an empty result and a failure.",
      C: "Prompt instructions alone can't solve this. The agent needs structured data (error categories, isRetryable flags) from the tool to make correct decisions.",
      D: "Throwing an exception for 'no orders' is incorrect — having no orders is a valid business state, not an error. The tool should return a successful response with an empty result set.",
    },
  },
  {
    id: "d2-q4",
    domain: 2,
    taskStatements: ["2.4"],
    scenario: "Developer Productivity Tools",
    question: "Your team needs to integrate with GitHub for issue tracking in their Claude-powered development workflow. One developer proposes building a custom MCP server. Another suggests using a community MCP server. What's the most appropriate first approach?",
    options: [
      { label: "A", text: "Build a custom MCP server tailored to the team's specific GitHub workflow, including only the endpoints they need." },
      { label: "B", text: "Evaluate existing community MCP servers for GitHub integration first, and only build custom if they lack required functionality." },
      { label: "C", text: "Use the GitHub REST API directly via Bash tool calls instead of MCP, avoiding the complexity of server configuration." },
      { label: "D", text: "Build a minimal custom MCP server now and plan to migrate to a community server later when one becomes available." }
    ],
    correctAnswer: "B",
    explanation: "Community MCP servers should be evaluated first for standard integrations like GitHub. They're maintained, tested, and reduce development burden. Custom servers should be reserved for team-specific workflows that community servers can't handle. Building custom first wastes effort when proven solutions likely exist.",
    distractorExplanations: {
      A: "Building custom before evaluating existing options wastes development time. Standard integrations like GitHub are well-served by community servers.",
      C: "Using Bash for API calls bypasses the benefits of MCP: structured tool descriptions, automatic discovery, and consistent error handling. It also makes the integration fragile and hard to maintain.",
      D: "Building something you plan to throw away is wasteful. Evaluate community servers first — if they work, there's nothing to migrate from.",
    },
  },
  {
    id: "d2-q5",
    domain: 2,
    taskStatements: ["2.5"],
    scenario: "Developer Productivity Tools",
    question: "An agent needs to find all files that import a deprecated function called 'legacyAuth' and also locate the test files for each of those importing files. Which tool sequence is correct?",
    options: [
      { label: "A", text: "Use Glob to find all TypeScript files, then Read each one to check for the import statement." },
      { label: "B", text: "Use Grep to search for 'legacyAuth' across the codebase to find importing files, then use Glob with patterns matching the caller filenames to find their test files." },
      { label: "C", text: "Use Read on the legacyAuth source file to find its export, then use Grep to search for the function name in all files." },
      { label: "D", text: "Use Bash with 'find . -name \"*.ts\" | xargs grep legacyAuth' to find all matches in one command." }
    ],
    correctAnswer: "B",
    explanation: "Grep searches file contents for patterns (like import statements containing 'legacyAuth') — finding all callers. Glob matches file paths by naming patterns (like **/*.test.tsx matching caller filenames) — finding associated test files. This is the correct combination: Grep for content search, Glob for path matching.",
    distractorExplanations: {
      A: "Using Glob to find ALL TypeScript files then Reading each one is extremely inefficient. Grep exists specifically for searching file contents across a codebase.",
      C: "Starting with the source file is backwards. You need to find files that import the function, not the file that exports it. Also, this approach requires two Grep searches when one would suffice.",
      D: "The exam expects you to use the built-in tools (Grep, Glob) rather than Bash equivalents. Built-in tools provide better integration, error handling, and are the recommended approach.",
    },
  },
  {
    id: "d3-q5",
    domain: 3,
    taskStatements: ["3.1"],
    scenario: "Code Generation",
    question: "Developer A's Claude Code follows the team's API naming conventions perfectly. Developer B, who joined last week and cloned the same repo, gets inconsistent naming from Claude Code. Both are working on the same branch. What's the most likely root cause?",
    options: [
      { label: "A", text: "Developer A has the naming conventions in their user-level ~/.claude/CLAUDE.md, which isn't shared via version control." },
      { label: "B", text: "Developer B needs to run /memory to refresh Claude Code's loaded configuration files." },
      { label: "C", text: "The project's .claude/rules/ directory has corrupted glob patterns that only work on Developer A's OS." },
      { label: "D", text: "Developer B's Claude Code version doesn't support the @import syntax used in the project CLAUDE.md." }
    ],
    correctAnswer: "A",
    explanation: "User-level configuration (~/.claude/CLAUDE.md) applies only to that user and is not shared via version control. If conventions live there instead of in the project-level .claude/CLAUDE.md, new team members won't receive them. The fix is to move the conventions to project-level configuration.",
    distractorExplanations: {
      B: "/memory is useful for diagnosing which files are loaded, but it doesn't fix the root cause. If the instructions aren't in version-controlled project config, refreshing won't help.",
      C: "Glob patterns in .claude/rules/ use standard syntax that works across operating systems. Corruption is unlikely and wouldn't explain why one developer works fine.",
      D: "This is extremely unlikely. Both developers are on the same repo and presumably similar Claude Code versions. The @import syntax is well-supported."
    },
  },
  {
    id: "d3-q6",
    domain: 3,
    taskStatements: ["3.5"],
    scenario: "Code Generation",
    question: "You describe a code transformation to Claude Code in natural language, but each time you run it, the output format is slightly different — sometimes using camelCase, sometimes snake_case, with inconsistent error handling patterns. What's the most effective technique to achieve consistent results?",
    options: [
      { label: "A", text: "Add more detailed prose instructions specifying exact formatting rules, error handling conventions, and naming patterns." },
      { label: "B", text: "Provide 2-3 concrete input/output examples showing the exact transformation you expect, including edge cases." },
      { label: "C", text: "Create a .claude/rules/ file with path-specific conventions that automatically apply during generation." },
      { label: "D", text: "Switch to plan mode to let Claude Code design the transformation approach before executing it." }
    ],
    correctAnswer: "B",
    explanation: "When prose descriptions produce inconsistent formatting, concrete input/output examples are the most effective technique. They show exactly what the transformation should produce, and the model generalizes from examples more reliably than from descriptions. 2-3 examples covering normal cases and edge cases typically resolve consistency issues.",
    distractorExplanations: {
      A: "More detailed prose instructions are what's already failing. Adding more description of the same kind won't fix the consistency issue — the model interprets prose differently across invocations.",
      C: "Path-specific rules define conventions for file types, not transformation behavior. They're useful for ongoing conventions but don't address one-time transformation consistency.",
      D: "Plan mode is for exploring approaches to complex tasks. The transformation itself isn't complex — the issue is output consistency, which examples solve more directly."
    },
  },
  {
    id: "d4-q3",
    domain: 4,
    taskStatements: ["4.1"],
    scenario: "CI/CD",
    question: "Your automated code review system flags too many false positives. Developers have started ignoring all automated feedback because the noise-to-signal ratio is too high. The comment categorization system flags style issues, potential bugs, and security vulnerabilities. Analysis shows the false positive rate for style issues is 40%, while bugs and security findings have only 5% false positive rates. What's the best first step?",
    options: [
      { label: "A", text: "Add 'only report high-confidence findings' to the system prompt to reduce overall false positives." },
      { label: "B", text: "Temporarily disable the style category while improving its prompts, keeping bug and security categories active to restore developer trust." },
      { label: "C", text: "Switch to a more capable model that can better distinguish real style issues from acceptable patterns." },
      { label: "D", text: "Add a confidence threshold that filters out any finding below 80% model-reported confidence." }
    ],
    correctAnswer: "B",
    explanation: "High false positive rates in one category destroy trust in ALL categories. The fix is to temporarily disable the high false-positive category (style) while improving its prompts, keeping accurate categories (bugs, security) active. This restores developer trust immediately while you iterate on the problematic category.",
    distractorExplanations: {
      A: "Vague instructions like 'only report high-confidence findings' don't improve precision. The model doesn't reliably calibrate confidence based on prose instructions. Explicit categorical criteria work better.",
      C: "A more capable model won't fix poorly defined criteria. The issue is the prompt, not the model's capability. Style issues need explicit rules about which patterns to flag vs skip.",
      D: "Model self-reported confidence is poorly calibrated. The model may report high confidence on false positives and low confidence on real issues. Filtering by confidence doesn't address the root cause."
    },
  },
  {
    id: "d4-q4",
    domain: 4,
    taskStatements: ["4.3"],
    scenario: "Structured Data Extraction",
    question: "You're building an extraction system that processes invoices from multiple vendors. Some invoices include a 'payment terms' field while others don't. When the field is absent, the model fabricates plausible-sounding payment terms (e.g., 'Net 30') to satisfy the required field in your JSON schema. How should you fix this?",
    options: [
      { label: "A", text: "Add a system prompt instruction: 'If a field is not present in the source document, output null instead of fabricating a value.'" },
      { label: "B", text: "Make the payment_terms field optional/nullable in the JSON schema so the model can return null when the information isn't in the source." },
      { label: "C", text: "Add few-shot examples showing invoices without payment terms being extracted with 'N/A' in that field." },
      { label: "D", text: "Use tool_choice: 'any' to let the model select from multiple extraction schemas, one with and one without the payment terms field." }
    ],
    correctAnswer: "B",
    explanation: "When source documents may not contain certain information, schema fields should be optional or nullable. Required fields force the model to produce a value even when none exists in the source, leading to fabrication. Making the field nullable gives the model a valid way to represent 'information not found.'",
    distractorExplanations: {
      A: "Prompt instructions help but don't provide deterministic guarantees. If the schema requires the field, the model faces conflicting constraints between the prompt and the schema. Schema design is the structural fix.",
      C: "Using 'N/A' is a workaround that pollutes the data. Downstream systems would need to special-case 'N/A' strings. Nullable fields are the clean solution.",
      D: "Multiple schemas add unnecessary complexity. A single schema with nullable fields handles the variance cleanly without requiring the model to choose between schemas."
    },
  },
  {
    id: "d4-q5",
    domain: 4,
    taskStatements: ["4.2"],
    scenario: "Structured Data Extraction",
    question: "Your extraction system processes research papers with varied citation formats. Some papers use inline citations (Smith, 2024), some use numbered references [1], and some embed citations in footnotes. Despite detailed instructions, the extractor inconsistently misses citations or places them in wrong fields. What technique would most improve extraction consistency?",
    options: [
      { label: "A", text: "Add more detailed prose descriptions of each citation format and how to handle them." },
      { label: "B", text: "Implement a pre-processing step that normalizes all citation formats before extraction." },
      { label: "C", text: "Provide 2-4 few-shot examples showing correct extraction from each citation format, with reasoning for why each was handled that way." },
      { label: "D", text: "Use a separate classification model to identify the citation format, then route to format-specific extraction prompts." }
    ],
    correctAnswer: "C",
    explanation: "Few-shot examples are the most effective technique when detailed instructions produce inconsistent results. Showing 2-4 examples of correct extraction from varied document structures (inline, numbered, footnotes) enables the model to generalize to novel patterns rather than just matching pre-specified cases. The reasoning in each example teaches the model how to handle ambiguous formats.",
    distractorExplanations: {
      A: "More prose descriptions are what's already failing. Adding more of the same approach won't fix the inconsistency — the model interprets detailed instructions differently across documents.",
      B: "Pre-processing adds engineering complexity and may introduce its own errors. Few-shot examples handle format variety directly without an intermediate transformation step.",
      D: "This is over-engineered for a problem that few-shot examples solve directly. Classification + routing adds latency and failure points when the extraction model can learn from examples."
    },
  },
  {
    id: "d4-q6",
    domain: 4,
    taskStatements: ["4.4"],
    scenario: "Structured Data Extraction",
    question: "Your extraction pipeline processes contracts and occasionally produces outputs where line item amounts don't sum to the stated total. The JSON schema is valid (no syntax errors), but the extracted data has semantic inconsistencies. What validation approach would catch these errors?",
    options: [
      { label: "A", text: "Switch to a stricter JSON schema with additional regex patterns to validate numeric formats." },
      { label: "B", text: "Extract both a calculated_total (sum of line items) and the stated_total, flagging discrepancies with a conflict_detected boolean for review." },
      { label: "C", text: "Add a retry loop that sends back the original document with the failed extraction and the specific validation error for model self-correction." },
      { label: "D", text: "Both B and C: extract calculated vs stated totals for detection, then retry with error feedback for correction." }
    ],
    correctAnswer: "D",
    explanation: "Semantic validation errors (values don't sum) require both detection and correction. Extracting calculated_total alongside stated_total detects discrepancies. When detected, a retry loop sending the original document, the failed extraction, and the specific validation error enables model self-correction. Together they form a complete validation-retry pipeline.",
    distractorExplanations: {
      A: "Stricter JSON schemas only prevent syntax errors (malformed JSON). They cannot catch semantic errors like incorrect sums — those require business logic validation.",
      B: "Detection alone identifies the problem but doesn't fix it. Without a retry mechanism, discrepancies would require manual intervention for every flagged document.",
      C: "Retry alone might fix some cases but without systematically detecting which documents have issues, you'd need to validate every output before deciding whether to retry."
    },
  },
  {
    id: "d5-q3",
    domain: 5,
    taskStatements: ["5.1"],
    scenario: "Customer Support Agent",
    question: "Your customer support agent handles multi-turn conversations. After 15+ turns, it starts referring to 'the customer's recent order' instead of the specific order number (#8891) and amount ($247.83) discussed earlier. Refund processing occasionally uses wrong amounts because the agent lost the precise details. What's the most effective fix?",
    options: [
      { label: "A", text: "Increase the model's max_tokens to give it more context window for longer conversations." },
      { label: "B", text: "Extract transactional facts (order numbers, amounts, dates, customer IDs) into a persistent 'case facts' block included in every prompt, never summarized." },
      { label: "C", text: "Implement progressive summarization that condenses earlier turns to make room for new context." },
      { label: "D", text: "Start a new session every 10 turns, injecting a summary of the prior conversation." }
    ],
    correctAnswer: "B",
    explanation: "Progressive summarization compresses numerical values, dates, and specific details into vague references. A persistent 'case facts' block extracts critical transactional data and includes it in every prompt without summarization. This ensures precise details (order #8891, $247.83) are never lost, regardless of conversation length.",
    distractorExplanations: {
      A: "More context window doesn't prevent the model from losing focus on specific details buried in long conversations. The 'lost in the middle' effect means details surrounded by verbose text can still be missed.",
      C: "Progressive summarization IS the problem. Summarizing 'customer wants a refund of $247.83 for order #8891' into 'customer wants a refund for a recent order' loses the precise data needed for correct processing.",
      D: "Starting new sessions disrupts conversation flow and the summary itself would lose the precise details unless you specifically extract them — which is what option B does more directly."
    },
  },
  {
    id: "d5-q4",
    domain: 5,
    taskStatements: ["5.4"],
    scenario: "Developer Productivity Tools",
    question: "An agent exploring a large unfamiliar codebase has been running for 30+ minutes. It starts giving contradictory advice: suggesting a function exists in one file when it was actually found in a different file earlier in the session. The agent references 'typical patterns' instead of specific classes it discovered. What's happening and what's the fix?",
    options: [
      { label: "A", text: "The model is hallucinating due to insufficient training data on this codebase. Fine-tune the model on the project's code." },
      { label: "B", text: "Context degradation from accumulated verbose tool outputs. Use /compact to reduce context, or delegate specific investigations to subagents that return summaries." },
      { label: "C", text: "The codebase has too many files for any model to handle. Split the project into smaller repositories." },
      { label: "D", text: "The agent needs a larger context window model. Switch to a higher-tier model with 200K+ context." }
    ],
    correctAnswer: "B",
    explanation: "Extended exploration sessions fill the context window with verbose discovery output (full file contents, search results, tool outputs), pushing earlier findings out of effective attention range. The fix is context management: /compact reduces context usage, subagent delegation isolates verbose output, and scratchpad files persist key findings outside the context window.",
    distractorExplanations: {
      A: "This isn't a training data issue. The model found the correct information earlier — it's losing grip on it due to context window saturation. Fine-tuning is irrelevant.",
      C: "Splitting repositories is a massive architectural change to work around a context management problem. The fix is managing context effectively, not restructuring the codebase.",
      D: "Larger context windows help but don't solve attention quality issues. A model with 200K context can still lose details 'in the middle' of long inputs. Context management strategies are needed regardless of window size."
    },
  },
  {
    id: "d5-q5",
    domain: 5,
    taskStatements: ["5.5"],
    scenario: "Structured Data Extraction",
    question: "Your extraction system reports 97% overall accuracy, so the team plans to fully automate it and remove human review. Before doing so, you run a detailed analysis. What should you check first?",
    options: [
      { label: "A", text: "Verify that the 97% accuracy holds consistently across all document types and field segments, not just in aggregate." },
      { label: "B", text: "Confirm the 97% accuracy was measured on a sufficiently large sample size to be statistically significant." },
      { label: "C", text: "Check that the accuracy metric accounts for both precision and recall, not just one measure." },
      { label: "D", text: "Validate the accuracy by comparing against a second independent extraction model." }
    ],
    correctAnswer: "A",
    explanation: "Aggregate metrics can mask poor performance on specific document types or fields. 97% overall might hide 40% error rates on a particular vendor's invoice format or a specific field like 'payment terms.' You must validate accuracy by document type AND field segment before automating, to ensure no category falls below acceptable thresholds.",
    distractorExplanations: {
      B: "Sample size matters, but even a large sample can hide segment-specific issues in the aggregate. Stratified analysis by document type and field is the critical first check.",
      C: "Precision/recall decomposition is valuable but secondary. The primary risk is aggregate metrics hiding segment-specific failures, which is what stratified analysis catches.",
      D: "A second model comparison validates the approach but doesn't reveal where the current model fails. Segment-specific analysis directly identifies which areas need continued human review."
    },
  },
  {
    id: "d5-q6",
    domain: 5,
    taskStatements: ["5.6"],
    scenario: "Multi-Agent Research",
    question: "Your multi-agent research system produces a report on global renewable energy adoption. Two credible sources report different statistics: the IEA says renewable capacity grew 15% in 2025, while BloombergNEF reports 18% growth. The synthesis agent selects the IEA figure and discards the Bloomberg number. What's wrong with this approach?",
    options: [
      { label: "A", text: "The synthesis agent should average the two figures (16.5%) to produce a more accurate estimate." },
      { label: "B", text: "The synthesis agent should use the more recent source and discard the older one." },
      { label: "C", text: "The synthesis agent should preserve both values with source attribution, annotating the conflict rather than arbitrarily selecting one." },
      { label: "D", text: "The synthesis agent should escalate to a human reviewer whenever sources conflict." }
    ],
    correctAnswer: "C",
    explanation: "When credible sources report different statistics, the synthesis agent should NOT arbitrarily select one value. Instead, it should annotate the conflict with both values and source attribution, preserving methodological context. The difference may reflect different measurement methodologies or time periods — information the consumer needs to interpret the data correctly.",
    distractorExplanations: {
      A: "Averaging conflicting statistics is statistically invalid. The sources may measure different things (installed capacity vs generation output), making an average meaningless.",
      B: "Recency alone doesn't determine which source is more accurate. Both may be current but use different methodologies. Discarding either loses valuable information.",
      D: "Human escalation for every source conflict doesn't scale. Most conflicts can be handled by preserving both values with attribution. Escalation should be reserved for cases that genuinely can't be automated."
    },
  },
  {
    id: "d1-q3",
    domain: 1,
    taskStatements: ["1.1"],
    scenario: "Customer Support Agent",
    question: "Your agent uses a while loop checking stop_reason to decide when to exit. It sometimes gets stuck in infinite loops. Investigation reveals the loop only exits on 'end_turn', but the agent sometimes calls tools indefinitely. What is the correct fix?",
    options: [
      { label: "A", text: "Add a maximum iteration cap of 25 turns and force-exit when reached." },
      { label: "B", text: "Parse the agent's text for phrases like 'Is there anything else?' and exit when detected." },
      { label: "C", text: "Continue looping while stop_reason is 'tool_use', and exit for any other stop_reason including 'end_turn'." },
      { label: "D", text: "After each tool result, inject a system message asking 'Are you done?' and exit if affirmative." },
    ],
    correctAnswer: "C",
    explanation: "The canonical agentic loop: continue on 'tool_use', exit on anything else including 'end_turn'. The original code only exited on 'end_turn', missing other stop reasons. Option A (iteration cap) and B (parsing natural language) are documented anti-patterns. Option D adds unnecessary latency.",
    distractorExplanations: {
      A: "Arbitrary iteration caps are a known anti-pattern. They mask the bug rather than fixing it and cut off legitimate long interactions.",
      B: "Parsing natural language for termination signals is a documented anti-pattern. Phrasing varies unpredictably.",
      D: "Injecting 'Are you done?' adds latency and token cost every turn. The stop_reason field already provides a deterministic signal.",
    },
  },
  {
    id: "d1-q4",
    domain: 1,
    taskStatements: ["1.1"],
    scenario: "Structured Data Extraction",
    question: "Your extraction agent exits the loop when the response contains JSON with an 'extracted_fields' key. Sometimes the agent emits partial JSON or wraps it in text, causing the loop to never terminate. What is the best fix?",
    options: [
      { label: "A", text: "Use regex to strip conversational text and attempt JSON parsing on whatever remains." },
      { label: "B", text: "Add a 10-iteration cap and return whatever partial data has been collected." },
      { label: "C", text: "Exit based on stop_reason rather than text content, and use a final structured output call with a JSON schema." },
      { label: "D", text: "Instruct the model in the system prompt to always respond with pure JSON." },
    ],
    correctAnswer: "C",
    explanation: "Checking text content as a completion signal is an anti-pattern. Use stop_reason for loop termination and constrain output format separately using structured output (JSON schema).",
    distractorExplanations: {
      A: "Regex-based parsing is fragile and grows complex as edge cases emerge.",
      B: "An arbitrary iteration cap returns incomplete data silently and doesn't fix the termination logic.",
      D: "Prompt instructions are probabilistic. The scenario shows the model already wraps JSON in text despite instructions.",
    },
  },
  {
    id: "d1-q5",
    domain: 1,
    taskStatements: ["1.2"],
    scenario: "Multi-Agent Research",
    question: "A coordinator assigns topics to three specialist subagents needing 50K tokens of reference material each. The coordinator has a 200K context window. What is the primary benefit of isolated subagent contexts?",
    options: [
      { label: "A", text: "Isolated contexts allow each subagent to run on a different LLM provider for cost optimization." },
      { label: "B", text: "Isolated contexts prevent domain-specific material from competing for attention, reducing cross-domain confusion and attention dilution." },
      { label: "C", text: "Isolated contexts enable parallel processing, reducing latency to the slowest subagent." },
      { label: "D", text: "Isolated contexts ensure one subagent's error doesn't affect others or the coordinator." },
    ],
    correctAnswer: "B",
    explanation: "The primary benefit is preventing attention dilution. 150K tokens of mixed material in one context degrades focus. Isolated contexts give each subagent a focused window.",
    distractorExplanations: {
      A: "Vendor flexibility is an operational concern, not the primary architectural motivation for context isolation.",
      C: "Parallel execution is about latency optimization, not the reason for context isolation specifically.",
      D: "Fault isolation is a secondary benefit. The primary issue is degraded reasoning from attention dilution.",
    },
  },
  {
    id: "d1-q6",
    domain: 1,
    taskStatements: ["1.2"],
    scenario: "CI/CD",
    question: "Your CI/CD coordinator dispatches build, test, and deploy tasks to subagents. The deploy subagent sometimes contradicts security policies from the build phase because it lacks that context. How should you fix this?",
    options: [
      { label: "A", text: "Switch to a single-agent architecture so all phases share one context." },
      { label: "B", text: "Have the coordinator extract relevant security decisions from build and pass them explicitly to the deploy subagent." },
      { label: "C", text: "Give the deploy subagent access to the build subagent's full conversation history." },
      { label: "D", text: "Add the complete security policy document to every subagent's system prompt." },
    ],
    correctAnswer: "B",
    explanation: "The coordinator is responsible for explicit context passing between subagents. Extracting relevant decisions and passing them downstream is the standard pattern.",
    distractorExplanations: {
      A: "Abandons multi-agent benefits to solve a coordination problem the hub agent should handle.",
      C: "Sharing full history defeats context isolation and reintroduces attention dilution.",
      D: "Wastes context tokens. The deploy agent needs specific build-phase decisions, not the entire policy document.",
    },
  },
  {
    id: "d1-q7",
    domain: 1,
    taskStatements: ["1.3"],
    scenario: "Code Generation",
    question: "Your agent must generate unit tests for 8 independent files. Using the Task tool, what is the most efficient invocation pattern?",
    options: [
      { label: "A", text: "Spawn 8 subagents sequentially, waiting for each to complete before the next." },
      { label: "B", text: "Spawn one subagent with all 8 files in its context to generate all tests in one pass." },
      { label: "C", text: "Spawn 8 subagents in parallel, each with scoped allowedTools and only its target file's context." },
      { label: "D", text: "Spawn 2 sequential batches of 4 parallel subagents to balance throughput against rate limits." },
    ],
    correctAnswer: "C",
    explanation: "When tasks are independent, parallel subagent spawning is correct. Each subagent gets focused context and scoped tools, running concurrently.",
    distractorExplanations: {
      A: "Sequential execution wastes time when tasks are independent.",
      B: "Loading all 8 files into one context causes attention dilution and eliminates parallelism.",
      D: "Manual batching adds orchestration complexity. Rate limiting should be handled at the infrastructure level.",
    },
  },
  {
    id: "d1-q8",
    domain: 1,
    taskStatements: ["1.3"],
    scenario: "Developer Productivity Tools",
    question: "A tool uses fork_session to explore 'what if we used Redis instead of PostgreSQL?' while preserving the original conversation. What key property of fork_session makes this work?",
    options: [
      { label: "A", text: "fork_session creates an independent copy of conversation state, so changes in the fork don't modify the original." },
      { label: "B", text: "fork_session creates shared memory between sessions, letting the original observe the fork's findings." },
      { label: "C", text: "fork_session automatically merges the fork's conclusions back into the original when complete." },
      { label: "D", text: "fork_session pauses the original until the fork completes, then presents both paths to choose between." },
    ],
    correctAnswer: "A",
    explanation: "fork_session creates an independent copy. The fork explores freely without contaminating the original context, allowing the user to return to the original unchanged.",
    distractorExplanations: {
      B: "Shared memory would mean changes leak into the original — the opposite of fork_session's purpose.",
      C: "fork_session does not auto-merge. Results must be explicitly passed back if desired.",
      D: "fork_session does not pause the original. Both sessions operate independently.",
    },
  },
  {
    id: "d1-q9",
    domain: 1,
    taskStatements: ["1.4"],
    scenario: "CI/CD",
    question: "Your CI/CD agent has three phases: build, integration test, deploy. The system prompt says 'Always run tests before deploying.' Monitoring shows 8% of deployments skip tests when users say 'just deploy it.' What should you implement?",
    options: [
      { label: "A", text: "Stronger prompt: 'CRITICAL: Under NO circumstances deploy without tests.'" },
      { label: "B", text: "Make the deploy tool require a valid integration test result ID as an input parameter." },
      { label: "C", text: "Log all deployments and flag those that skipped tests for post-hoc review." },
      { label: "D", text: "Add a confirmation: 'Are you sure you want to deploy without tests?'" },
    ],
    correctAnswer: "B",
    explanation: "Programmatic prerequisites create deterministic gates. Making deploy require a test result ID cannot be bypassed regardless of user pressure or context load.",
    distractorExplanations: {
      A: "Stronger language is still probabilistic. The scenario shows prompt-based instructions already failing.",
      C: "Post-hoc review catches problems after untested code reaches production. Prevention beats detection.",
      D: "A confirmation still allows users to bypass. Mandatory requirements need programmatic enforcement.",
    },
  },
  {
    id: "d1-q10",
    domain: 1,
    taskStatements: ["1.4"],
    scenario: "Structured Data Extraction",
    question: "Your extraction pipeline must normalize dates to ISO 8601 and verify claim amounts within policy limits before database insertion. The agent sometimes inserts records with non-normalized dates. Which approach best enforces validation?",
    options: [
      { label: "A", text: "Add validation examples to the system prompt showing correct date normalization." },
      { label: "B", text: "Run a deterministic validation function on extracted fields after the agent produces them, rejecting and re-prompting on failures." },
      { label: "C", text: "Use a second LLM call specifically for validation with a focused prompt." },
      { label: "D", text: "Have the agent output confidence levels and only insert records above 95% confidence." },
    ],
    correctAnswer: "B",
    explanation: "Date format normalization and range checking are deterministic operations that should be enforced programmatically, not probabilistically.",
    distractorExplanations: {
      A: "Prompt examples improve compliance but can't guarantee every date is correctly formatted.",
      C: "Using an LLM for deterministic validation (date formats, ranges) is wasteful and still probabilistic.",
      D: "Self-reported confidence is poorly calibrated and doesn't correspond to actual field accuracy.",
    },
  },
  {
    id: "d1-q11",
    domain: 1,
    taskStatements: ["1.5"],
    scenario: "Structured Data Extraction",
    question: "Your agent calls save_record on a regulated database. Compliance requires phone numbers stored as digits-only. The agent sometimes passes formatted numbers. Using Agent SDK hooks, which approach is correct?",
    options: [
      { label: "A", text: "PreToolCall hook that intercepts save_record input, strips non-digit characters from phone fields, and passes normalized input to the tool." },
      { label: "B", text: "PostToolUse hook that reads the result and if formatted, deletes and re-inserts with correct format." },
      { label: "C", text: "PostToolUse hook that normalizes the phone in the result message so the model sees the correct format." },
      { label: "D", text: "PreToolCall hook that rejects the call entirely if phone contains non-digit characters." },
    ],
    correctAnswer: "A",
    explanation: "A PreToolCall hook that normalizes input before execution is the correct pattern. Deterministic, happens before the write, doesn't require model to fix behavior.",
    distractorExplanations: {
      B: "Post-write correction creates a window where non-compliant data exists in the regulated database.",
      C: "Normalizing the result only changes model perception, not actual stored data.",
      D: "Rejecting and forcing retry wastes tokens when the fix is a simple deterministic transformation.",
    },
  },
  {
    id: "d1-q12",
    domain: 1,
    taskStatements: ["1.5"],
    scenario: "Customer Support Agent",
    question: "Your agent has a send_email tool. Compliance requires outgoing emails never contain customer SSNs. You want a hard block, not probabilistic safeguard. Which hook pattern?",
    options: [
      { label: "A", text: "PostToolUse hook that checks sent email and sends a retraction if SSN detected." },
      { label: "B", text: "System prompt stating SSNs must never be in emails, with few-shot redaction examples." },
      { label: "C", text: "PreToolCall hook that scans email body for SSN patterns and blocks the call if found." },
      { label: "D", text: "PostToolUse hook that logs emails containing SSNs for compliance review within 24 hours." },
    ],
    correctAnswer: "C",
    explanation: "For hard compliance requirements, PreToolCall interception that blocks before execution prevents the violation from occurring.",
    distractorExplanations: {
      A: "A retraction doesn't un-send the original. The customer already received their SSN.",
      B: "Prompt instructions are probabilistic. Hard compliance needs deterministic enforcement.",
      D: "Logging detects but doesn't prevent. The SSN has already been emailed.",
    },
  },
  {
    id: "d1-q13",
    domain: 1,
    taskStatements: ["1.6"],
    scenario: "Code Generation",
    question: "Your agent analyzes 15 files for consistent error handling. When all are loaded simultaneously, it misses inconsistencies in later files. What decomposition strategy addresses this?",
    options: [
      { label: "A", text: "Two-pass: per-file analysis for error handling patterns, then a cross-file pass comparing collected patterns." },
      { label: "B", text: "Increase context window size to reduce attention pressure on later files." },
      { label: "C", text: "Randomize file loading order so different files get high-attention positions across runs." },
      { label: "D", text: "Prompt chaining processing files sequentially with a running summary of patterns found." },
    ],
    correctAnswer: "A",
    explanation: "Per-file plus cross-file passes directly address attention dilution. Each file gets focused analysis, then extracted patterns (not full contents) are compared.",
    distractorExplanations: {
      B: "More context doesn't mean better attention distribution. The problem is focus, not space.",
      C: "Nondeterministic, requires multiple runs, doesn't guarantee any single run catches all issues.",
      D: "Running summary still accumulates context. By file 15, the summary competes for attention.",
    },
  },
  {
    id: "d1-q14",
    domain: 1,
    taskStatements: ["1.6"],
    scenario: "Multi-Agent Research",
    question: "A research agent handles both simple three-step queries (search, summarize, cite) and complex queries requiring dynamic follow-up research. Which decomposition approach is most appropriate?",
    options: [
      { label: "A", text: "Always use fixed prompt chaining for predictability." },
      { label: "B", text: "Always use dynamic adaptive decomposition for flexibility." },
      { label: "C", text: "Route simple questions to fixed prompt chains and complex questions to dynamic adaptive agents." },
      { label: "D", text: "Use prompt chaining for all but add an optional 'research more' branch." },
    ],
    correctAnswer: "C",
    explanation: "Match decomposition strategy to task complexity. Simple questions benefit from prompt chaining's predictability. Complex questions need dynamic adaptive decomposition. A classifier routes between them.",
    distractorExplanations: {
      A: "Fixed chains can't handle questions where next steps depend on intermediate findings.",
      B: "Dynamic decomposition for every question adds unnecessary cost for simple queries.",
      D: "A single escape hatch can't accommodate multiple dynamic pivots.",
    },
  },
  {
    id: "d1-q15",
    domain: 1,
    taskStatements: ["1.7"],
    scenario: "Developer Productivity Tools",
    question: "A developer resumes a session from two days ago. The module was modified by three teammates since then. The agent makes edits based on stale file state, creating conflicts. Best practice?",
    options: [
      { label: "A", text: "Disable --resume in team environments to force fresh sessions." },
      { label: "B", text: "On resume, inject a summary of changes since the session was active and instruct re-reading modified files before editing." },
      { label: "C", text: "Set maximum session age of 24 hours after which sessions can't be resumed." },
      { label: "D", text: "Configure the agent to always run git pull before any file edits." },
    ],
    correctAnswer: "B",
    explanation: "Summary injection on resume alerts the agent to changes and prompts re-reading files. Addresses stale context without removing the useful --resume feature.",
    distractorExplanations: {
      A: "Eliminates a useful feature entirely when the problem is manageable.",
      C: "Arbitrary time cutoffs don't match actual staleness. A session could be stale in 2 hours on a busy repo.",
      D: "git pull updates filesystem but not the agent's context. It still has stale file contents in conversation history.",
    },
  },
  {
    id: "d1-q16",
    domain: 1,
    taskStatements: ["1.7"],
    scenario: "Multi-Agent Research",
    question: "After 40+ queries, your coordinator's context is at 85% capacity. It produces lower-quality decompositions and repeats completed research. What is the most effective intervention?",
    options: [
      { label: "A", text: "Increase context window to the maximum available size." },
      { label: "B", text: "Compress accumulated findings into a structured summary and start a new session with that summary as initial context." },
      { label: "C", text: "Add deduplication checking that compares new queries against all previous using string similarity." },
      { label: "D", text: "Switch to a model with better long-context performance." },
    ],
    correctAnswer: "B",
    explanation: "Summary injection is the standard pattern for long-running sessions. Compressing findings into a structured summary preserves knowledge while restoring context quality.",
    distractorExplanations: {
      A: "Larger window delays but doesn't prevent degradation. Same issues at 85% of a bigger window.",
      C: "String similarity catches near-identical queries but not rephrased duplicates, and doesn't address degraded decomposition quality.",
      D: "This is an architectural problem, not a model capability problem. Any model degrades with unbounded context growth.",
    },
  },
  {
    id: "d2-q6",
    domain: 2,
    taskStatements: ["2.1"],
    scenario: "Customer Support Agent",
    question: "An agent has three tools but frequently calls search_knowledge_base when users provide order numbers, instead of lookup_order. The lookup_order description reads: 'Retrieves order information from the database.' What is the most effective first step?",
    options: [
      { label: "A", text: "Force tool_choice to lookup_order whenever the message contains a number." },
      { label: "B", text: "Add routing examples to the system prompt and implement a routing classifier." },
      { label: "C", text: "Rewrite lookup_order's description to include when to use it, accepted inputs, and example queries." },
      { label: "D", text: "Remove search_knowledge_base to eliminate ambiguity." },
    ],
    correctAnswer: "C",
    explanation: "Tool descriptions are the primary selection mechanism. Improving them is always the recommended first fix for misrouting.",
    distractorExplanations: {
      A: "Forcing tool_choice based on pattern matching is brittle and removes Claude's reasoning ability.",
      B: "System prompt guidance helps but descriptions are the primary mechanism. Fix descriptions first.",
      D: "Removing useful functionality is not the answer. Help Claude distinguish between tools instead.",
    },
  },
  {
    id: "d2-q7",
    domain: 2,
    taskStatements: ["2.2"],
    scenario: "Code Generation",
    question: "A compile_code tool can fail from syntax errors, service unavailability, or quota limits. All failures return plain string messages. Which error response design best enables recovery?",
    options: [
      { label: "A", text: "{ isError: true, message: string } for all errors, letting Claude infer the type." },
      { label: "B", text: "{ isError: true, category: 'transient'|'validation'|'business', message: string, isRetryable: boolean }." },
      { label: "C", text: "Throw exceptions for outages, return strings for code issues." },
      { label: "D", text: "{ isError: false } with error details in content so Claude always processes them." },
    ],
    correctAnswer: "B",
    explanation: "Structured errors with category and isRetryable let Claude retry transient failures, fix validation errors, and inform users about business limits.",
    distractorExplanations: {
      A: "Inferring failure type from unstructured text is unreliable.",
      C: "Exceptions can crash the pipeline. MCP tools should return structured responses.",
      D: "isError: false for actual errors misleads Claude into treating failures as success.",
    },
  },
  {
    id: "d2-q8",
    domain: 2,
    taskStatements: ["2.3"],
    scenario: "Multi-Agent Research",
    question: "A coordinator has all 14 specialist tools plus delegation tools. It frequently calls specialist tools directly instead of delegating. How should tools be restructured?",
    options: [
      { label: "A", text: "Keep all 14 tools but set tool_choice to 'any' on every turn." },
      { label: "B", text: "Keep all tools but add 'never call specialist tools directly' to the system prompt." },
      { label: "C", text: "Give the coordinator only delegation tools, scope specialist tools to their respective agents." },
      { label: "D", text: "Give each specialist 4-5 tools plus read-only versions of all tools to the coordinator." },
    ],
    correctAnswer: "C",
    explanation: "Scoping tools enforces correct delegation. With only delegation tools, the coordinator must route to specialists. Follows the 4-5 tools per agent principle.",
    distractorExplanations: {
      A: "tool_choice 'any' forces a tool call but doesn't prevent calling the wrong one.",
      B: "Prompt instructions are weak enforcement. Removing tools is more reliable.",
      D: "Read-only versions still present 14+ tools, exceeding recommended limits.",
    },
  },
  {
    id: "d2-q9",
    domain: 2,
    taskStatements: ["2.4"],
    scenario: "Developer Productivity Tools",
    question: "A team configures an MCP server for Jira. Developers need different project access. The server requires JIRA_API_TOKEN and JIRA_PROJECT_KEY. All should use the same binary with personalized config. Correct approach?",
    options: [
      { label: "A", text: "Define in .mcp.json with both variables hardcoded." },
      { label: "B", text: "Define in each developer's ~/.claude.json with personal tokens." },
      { label: "C", text: "Define in .mcp.json with env var expansion: ${JIRA_API_TOKEN} and ${JIRA_PROJECT_KEY}." },
      { label: "D", text: "Pass credentials as tool input parameters on every call." },
    ],
    correctAnswer: "C",
    explanation: "Project .mcp.json with env var expansion keeps secrets out of version control while allowing per-developer customization through local environment variables.",
    distractorExplanations: {
      A: "Hardcoding tokens commits secrets to version control.",
      B: "Splitting config across project and user files adds maintenance complexity.",
      D: "Passing credentials as inputs is insecure and defeats MCP's purpose.",
    },
  },
  {
    id: "d2-q10",
    domain: 2,
    taskStatements: ["2.5"],
    scenario: "CI/CD",
    question: "A CI agent needs to investigate a 15,000-line build log failure. It must find the error, locate the source file, and suggest a fix. Optimal built-in tool sequence?",
    options: [
      { label: "A", text: "Read entire log, Read source file, Edit to fix." },
      { label: "B", text: "Grep for error patterns, Read with offset/limit around match, Glob for source file, Read it, Edit fix." },
      { label: "C", text: "Glob for all logs, Read each completely, Write to rewrite source." },
      { label: "D", text: "Bash with grep/cat/sed for everything." },
    ],
    correctAnswer: "B",
    explanation: "Grep for content search, Read with offset for targeted examination, Glob for path matching, Edit for targeted modifications. Avoids loading 15K lines into context.",
    distractorExplanations: {
      A: "Reading 15K lines is wasteful. Grep first, then Read only relevant sections.",
      C: "Reading all logs completely is a shotgun approach. Write overwrites entire files — use Edit.",
      D: "Built-in tools are preferred over Bash equivalents for better integration.",
    },
  },
  {
    id: "d2-q11",
    domain: 2,
    taskStatements: ["2.2"],
    scenario: "Structured Data Extraction",
    question: "A parse_invoice tool receives a valid PDF that's actually a resume — no invoice data. How should the tool respond so Claude tells the user no invoice was found?",
    options: [
      { label: "A", text: "{ isError: true, message: 'No invoice data found' }." },
      { label: "B", text: "Return empty object {} and let Claude figure it out." },
      { label: "C", text: "{ isError: false, content: { found: false, documentType: 'non-invoice' } } as a valid empty result." },
      { label: "D", text: "Throw a validation error for incorrect document type." },
    ],
    correctAnswer: "C",
    explanation: "Successfully analyzing a PDF that contains no invoice is a valid empty result, not an error. isError: false with explicit metadata gives Claude clear signal without risking hallucination.",
    distractorExplanations: {
      A: "isError: true mischaracterizes a successful analysis. Claude might retry unnecessarily.",
      B: "Empty object gives no signal. Claude might hallucinate invoice data to fill fields.",
      D: "Document type can't be validated before parsing. Exceptions risk crashing the pipeline.",
    },
  },
  {
    id: "d3-q7",
    domain: 3,
    taskStatements: ["3.1"],
    scenario: "Customer Support Agent",
    question: "All developers need shared tone guidelines, but one senior dev wants to override max response length for local testing. The project has .claude/CLAUDE.md with tone rules. How to configure?",
    options: [
      { label: "A", text: "Edit .claude/CLAUDE.md on a personal branch." },
      { label: "B", text: "Add the override in ~/.claude/CLAUDE.md which layers on top of project-level." },
      { label: "C", text: "Create a directory-level CLAUDE.md that replaces project-level instructions." },
      { label: "D", text: "Use /memory to store the override in the shared memory file." },
    ],
    correctAnswer: "B",
    explanation: "User-level ~/.claude/CLAUDE.md layers on top of project-level, allowing personal overrides without affecting shared configuration.",
    distractorExplanations: {
      A: "Personal branches create merge conflicts. The hierarchy exists to avoid this.",
      C: "Directory-level CLAUDE.md adds instructions — doesn't replace project-level. All levels are additive.",
      D: "/memory writes to a shared file. Not appropriate for individual overrides.",
    },
  },
  {
    id: "d3-q8",
    domain: 3,
    taskStatements: ["3.2"],
    scenario: "Code Generation",
    question: "A team wants a reusable slash command that generates microservice boilerplate, accepts a service name, forks to avoid polluting context, and only allows file-writing. Where and how?",
    options: [
      { label: "A", text: "SKILL.md in .claude/commands/ with context: fork, allowed-tools, and argument-hint frontmatter." },
      { label: "B", text: "SKILL.md in ~/.claude/commands/ since platform commands must be user-level." },
      { label: "C", text: "Markdown in .claude/commands/ with context: isolated and tool-whitelist." },
      { label: "D", text: "SKILL.md in .claude/commands/ with context: fork and --param flag in file body." },
    ],
    correctAnswer: "A",
    explanation: "Project-level commands go in .claude/commands/. SKILL.md supports context: fork, allowed-tools, and argument-hint frontmatter.",
    distractorExplanations: {
      B: "~/.claude/commands/ is personal. Shared commands belong in the project repo.",
      C: "context: isolated and tool-whitelist are not valid frontmatter fields.",
      D: "No --param flag exists. argument-hint is the correct frontmatter field.",
    },
  },
  {
    id: "d3-q9",
    domain: 3,
    taskStatements: ["3.3"],
    scenario: "Multi-Agent Research",
    question: "A monorepo has Python pipelines, TypeScript APIs, and protobufs. The team wants type-checking reminders only when editing Python files. Most token-efficient approach?",
    options: [
      { label: "A", text: "Add all rules to project .claude/CLAUDE.md with a comment about Python only." },
      { label: "B", text: "Create CLAUDE.md inside pipelines/ directory." },
      { label: "C", text: "Create .claude/rules/ file with paths: ['pipelines/**/*.py'] so rules load only for matching files." },
      { label: "D", text: "Use @import to always include typing-rules.md in project CLAUDE.md." },
    ],
    correctAnswer: "C",
    explanation: ".claude/rules/ with path globs conditionally loads rules only for matching files. Most token-efficient — instructions never load for non-Python work.",
    distractorExplanations: {
      A: "Project-level CLAUDE.md is always loaded, wasting tokens.",
      B: "Directory-level activates by working directory, not file type. Globs are more precise.",
      D: "@import pulls content unconditionally, defeating token efficiency.",
    },
  },
  {
    id: "d3-q10",
    domain: 3,
    taskStatements: ["3.4"],
    scenario: "Developer Productivity Tools",
    question: "Refactoring a logging system across 12 files in 3 packages: replacing custom logger with a structured library. Requires understanding call sites, designing the interface, updating consumers. Best approach?",
    options: [
      { label: "A", text: "Direct execution to refactor all 12 files in one prompt." },
      { label: "B", text: "Direct execution file-by-file, reviewing each diff." },
      { label: "C", text: "Plan mode to analyze and design, then direct execution to apply the plan." },
      { label: "D", text: "Explore subagent to make all changes since it specializes in multi-file refactors." },
    ],
    correctAnswer: "C",
    explanation: "Plan mode for investigation and design, then direct execution for implementation. The hybrid approach balances thoroughness with speed.",
    distractorExplanations: {
      A: "No planning risks inconsistent design and missed call sites.",
      B: "Sequential without planning means early changes may need revision later.",
      D: "Explore is for research, not making changes.",
    },
  },
  {
    id: "d3-q11",
    domain: 3,
    taskStatements: ["3.5"],
    scenario: "Structured Data Extraction",
    question: "A PDF invoice parser mostly works but mishandles multi-row line items and misparses currency symbols. Most effective iterative refinement?",
    options: [
      { label: "A", text: "Rewrite the entire prompt with more detailed instructions." },
      { label: "B", text: "Add: 'Be more careful with edge cases.'" },
      { label: "C", text: "Provide 2-3 concrete example invoices showing the failures with expected correct output." },
      { label: "D", text: "Switch to a larger model with the same prompt." },
    ],
    correctAnswer: "C",
    explanation: "Concrete examples with expected outputs are more effective than prose for iterative refinement. Shows specific failing inputs and correct output.",
    distractorExplanations: {
      A: "Discards working parts. Target specific failures instead.",
      B: "Vague instructions give no actionable signal.",
      D: "The issue is specification, not capability.",
    },
  },
  {
    id: "d3-q12",
    domain: 3,
    taskStatements: ["3.6"],
    scenario: "CI/CD",
    question: "Setting up Claude Code as automated PR reviewer in GitHub Actions with structured JSON output. Which configuration ensures isolated, deterministic reviews?",
    options: [
      { label: "A", text: "claude -p 'Review' --output-format json without a schema." },
      { label: "B", text: "claude -p 'Review' --output-format json --json-schema with defined fields, plus .claude/CLAUDE.md with CI guidelines." },
      { label: "C", text: "claude 'Review' --json-schema interactively in CI." },
      { label: "D", text: "claude -p with --json-schema and --resume for cross-PR consistency." },
    ],
    correctAnswer: "B",
    explanation: "-p for headless CI mode, --json-schema for structured output, CLAUDE.md for review context. Each run gets an isolated session.",
    distractorExplanations: {
      A: "Without schema, output may lack required fields in predictable format.",
      C: "Without -p, Claude runs interactively — unsuitable for CI.",
      D: "--resume violates session isolation. Each PR needs independent review.",
    },
  },
  {
    id: "d4-q7",
    domain: 4,
    taskStatements: ["4.1"],
    scenario: "Customer Support Agent",
    question: "A ticket classifier marks too many password resets as 'urgent'. The prompt says 'Be conservative about marking things urgent.' How to fix?",
    options: [
      { label: "A", text: "Few-shot examples showing password resets classified as 'normal'." },
      { label: "B", text: "Replace vague instruction with explicit criteria: 'urgent' requires data breach, multi-user outage, or regulatory deadline; password resets are always 'normal'." },
      { label: "C", text: "Validation-retry loop that re-checks 'urgent' tickets and downgrades if they mention passwords." },
      { label: "D", text: "Multi-instance review where two Claude instances must agree on 'urgent' classification." },
    ],
    correctAnswer: "B",
    explanation: "Vague instructions like 'be conservative' create false positives. Explicit categorical criteria with specific conditions and exclusions give unambiguous boundaries.",
    distractorExplanations: {
      A: "Examples help but don't define the boundary. Without criteria, novel ticket types are still ambiguous.",
      C: "Retry adds cost without fixing why misclassification happens.",
      D: "Multi-instance doubles cost. Fix unclear criteria first.",
    },
  },
  {
    id: "d4-q8",
    domain: 4,
    taskStatements: ["4.2"],
    scenario: "Structured Data Extraction",
    question: "An earnings call extractor sometimes fabricates revenue figures when the transcript only says 'significant increase in top-line revenue.' How to reduce hallucination while maintaining consistency?",
    options: [
      { label: "A", text: "Increase temperature to 1.0 for more interpretations." },
      { label: "B", text: "Add system prompt: 'Never make up numbers.'" },
      { label: "C", text: "Provide 2-4 few-shot examples including ambiguous cases where correct output uses null, with reasoning." },
      { label: "D", text: "Use Message Batches API for batch-level consistency." },
    ],
    correctAnswer: "C",
    explanation: "Few-shot examples with ambiguous case handling are most effective for hallucination reduction. Showing that vague language maps to null teaches correct behavior.",
    distractorExplanations: {
      A: "Higher temperature increases randomness and makes hallucination worse.",
      B: "'Never make up numbers' is vague criteria. Concrete examples of correct null handling are needed.",
      D: "Batches API is cost optimization. No effect on output quality.",
    },
  },
  {
    id: "d4-q9",
    domain: 4,
    taskStatements: ["4.3"],
    scenario: "Code Generation",
    question: "A code review tool uses tool_use with a severity enum ['critical','warning','info']. Claude sometimes reports 'warning' for informational issues and fabricates file paths. Which schema changes address BOTH?",
    options: [
      { label: "A", text: "Add 'unclear' to severity enum and make file_path nullable." },
      { label: "B", text: "Validation-retry loop checking if file_path exists." },
      { label: "C", text: "Switch tool_choice from 'auto' to 'any'." },
      { label: "D", text: "Add a 'reasoning' field so Claude justifies severity." },
    ],
    correctAnswer: "A",
    explanation: "'unclear' enum gives Claude a legitimate escape for ambiguous severity. Nullable file_path prevents fabrication by allowing null. Both address forced confabulation.",
    distractorExplanations: {
      B: "Addresses file_path but not severity misclassification.",
      C: "Forcing tool use doesn't improve semantic accuracy of values.",
      D: "Reasoning may help severity but doesn't address file_path fabrication.",
    },
  },
  {
    id: "d4-q10",
    domain: 4,
    taskStatements: ["4.5"],
    scenario: "CI/CD",
    question: "A security scan analyzes 200-400 files per PR with separate synchronous API calls, taking 15-20 minutes and hitting rate limits. How to reduce cost and improve throughput?",
    options: [
      { label: "A", text: "Message Batches API: submit all analyses as one batch, poll for completion, correlate with custom_id." },
      { label: "B", text: "Message Batches API with multi-turn tool calling for cross-file context." },
      { label: "C", text: "Keep synchronous but sample 50 random files per PR." },
      { label: "D", text: "Switch to streaming responses for faster first-token." },
    ],
    correctAnswer: "A",
    explanation: "Each file analysis is independent — perfect batch use case. 50% cost savings, custom_id correlation, and the CI pipeline can wait for async results.",
    distractorExplanations: {
      B: "Batches API does NOT support multi-turn tool calling.",
      C: "Sampling reduces coverage and could miss vulnerabilities.",
      D: "Streaming doesn't reduce total processing time or help with rate limits.",
    },
  },
  {
    id: "d4-q11",
    domain: 4,
    taskStatements: ["4.4"],
    scenario: "Developer Productivity Tools",
    question: "A TypeScript interface generator has a validation-retry loop. It fixes syntax errors reliably but fails when users provide vague descriptions missing required fields. Why?",
    options: [
      { label: "A", text: "The loop needs more iterations — 5 instead of 2." },
      { label: "B", text: "Retry loops fix format errors where the compiler gives actionable feedback, but missing data from vague descriptions has no error signal to feed back." },
      { label: "C", text: "The TypeScript compiler doesn't catch semantic issues — use a runtime validator." },
      { label: "D", text: "Claude's self-correction is fundamentally limited — retry loops never work." },
    ],
    correctAnswer: "B",
    explanation: "Retry-with-error-feedback works for format errors (actionable compiler messages) but not missing data. When specifications omit fields, there's no error to feed back.",
    distractorExplanations: {
      A: "More retries don't help without an error signal pointing to what's missing.",
      C: "The compiler does catch syntax effectively. The limitation is about missing specs, not the validator.",
      D: "Overstates the limitation. Retry works well for format errors specifically.",
    },
  },
  {
    id: "d4-q12",
    domain: 4,
    taskStatements: ["4.6"],
    scenario: "Multi-Agent Research",
    question: "A single Claude instance reviews 50-page reports and catches 60% of planted errors. Having it re-read its own review barely improves accuracy. What architectural change would be most effective?",
    options: [
      { label: "A", text: "Summarize the document first and review the summary." },
      { label: "B", text: "Multiple independent instances: per-section fact-checking plus cross-section consistency, with confidence scores routing disagreements to humans." },
      { label: "C", text: "Message Batches API processing each page separately." },
      { label: "D", text: "Few-shot examples of common factual errors." },
    ],
    correctAnswer: "B",
    explanation: "Self-review retains blind spots. Independent instances with different attention patterns catch more. Per-section + cross-section ensures both local and document-wide checks. Confidence routing sends ambiguous cases to humans.",
    distractorExplanations: {
      A: "Summarizing loses detail needed for accuracy checking.",
      C: "Batches optimize cost, not detection quality. Per-page also loses cross-page context.",
      D: "Examples help with known patterns but don't fix the self-review limitation.",
    },
  },
  {
    id: "d5-q7",
    domain: 5,
    taskStatements: ["5.3"],
    scenario: "CI/CD",
    question: "A CI agent silently skips a failed dependency resolution and reports 11/12 services passing with no mention of the skipped one. What is the primary problem?",
    options: [
      { label: "A", text: "Should terminate the entire pipeline on any failure." },
      { label: "B", text: "Should retry at least three times before proceeding." },
      { label: "C", text: "Exhibits silent suppression anti-pattern by omitting the error from output." },
      { label: "D", text: "Should escalate to human reviewer on dependency failures." },
    ],
    correctAnswer: "C",
    explanation: "Silent suppression swallows errors without surfacing them. The report creates a misleading picture. The fix is structured error context for the failed service.",
    distractorExplanations: {
      A: "Terminating everything is the workflow termination anti-pattern.",
      B: "Retrying may help, but the core problem is the failure being invisible.",
      D: "Dependency failures are routine operational issues, not escalation triggers.",
    },
  },
  {
    id: "d5-q8",
    domain: 5,
    taskStatements: ["5.1"],
    scenario: "Customer Support Agent",
    question: "After 15+ exchanges, an agent confuses details between issues. A persistent case facts block is implemented. An engineer says it's unnecessary since full history is in context. Why is the block still valuable?",
    options: [
      { label: "A", text: "Reduces token usage by removing earlier messages." },
      { label: "B", text: "Mitigates lost-in-the-middle effect where models attend less to information in the middle of long contexts." },
      { label: "C", text: "Provides structured format for tool-based fact retrieval." },
      { label: "D", text: "Creates a legal compliance record." },
    ],
    correctAnswer: "B",
    explanation: "Lost-in-the-middle means LLMs attend more to beginning and end. In long conversations, early facts drift to the middle. A case facts block at the top keeps them in a high-attention position.",
    distractorExplanations: {
      A: "The question states history is in context. The value is attention reliability, not token savings.",
      C: "Case facts are read directly from context, not via tool calls.",
      D: "Compliance is outside the scope of context management.",
    },
  },
  {
    id: "d5-q9",
    domain: 5,
    taskStatements: ["5.6"],
    scenario: "Multi-Agent Research",
    question: "Three agents report different market sizes: Agent A $4.2B (2024 report), Agent B $6.8B (2025 forecast), Agent C $5.1B (no source). How should the orchestrator synthesize?",
    options: [
      { label: "A", text: "Average all three and cite all agents." },
      { label: "B", text: "Use Agent B's value since it's most recent." },
      { label: "C", text: "Discard Agent C (unsourced), present A and B's figures with sources and dates, noting the discrepancy may reflect different methodologies." },
      { label: "D", text: "Confidence-weighted average based on response speed." },
    ],
    correctAnswer: "C",
    explanation: "Proper provenance: reject unsourced claims, note temporal differences, present both sourced values with attribution rather than silently resolving discrepancies.",
    distractorExplanations: {
      A: "Averaging obscures meaningful differences and includes unsourced data.",
      B: "Recency doesn't equal authority. Both may measure different things.",
      D: "Response speed has no relationship to accuracy.",
    },
  },
];

export function getQuestionsByDomain(domain: number): Question[] {
  return questions.filter((q) => q.domain === domain);
}
