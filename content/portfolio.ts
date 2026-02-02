export const me = {
    name: "Geddy Dukes",
    title: "ML Engineer",
    tagline:
        "ML Engineer who builds AI for high-stakes environments. I specialize in systems where hallucinations aren't acceptable and every decision needs an audit trail—from training 67M-parameter models from scratch to shipping production underwriting platforms for $30M portfolios.",
    socialProof: "TinyLLM blog post featured in TLDR AI Newsletter",
    socialProofLink: "/blog/tiny-llm",
    location: "SF Bay Area · Available immediately · Open to in-person and remote",
    email: "geddydukes@gmail.com",
    phone: "707-799-1271",
    links: {
        site: "https://geddydukes.com",
        github: "https://github.com/Geddydukes",
        linkedin: "https://www.linkedin.com/in/geddy-dukes",
        resume: "/Geddy-Dukes-ML-Engineer-SF.pdf",
    },
};

export const valuePropositions = [
    {
        icon: "⚡",
        title: "Ship production systems fast",
        description:
            "Built a complete financial analysis platform and AI underwriting system while simultaneously managing a $30M loan portfolio. Comfortable across the full stack—PyTorch training loops to React frontends to PostgreSQL schemas. I prototype rapidly and ship incrementally.",
    },
    {
        icon: "🏦",
        title: "Domain expertise in finance",
        description:
            "Spent years as a credit analyst underwriting deals up to $3M and managing compliance workflows across ~$100M in programs. I understand lending requirements, risk assessment, and regulatory constraints—not just the ML. This means I can build AI systems that actually work in regulated environments without months of onboarding.",
    },
    {
        icon: "🔒",
        title: "Safety-first, neuro-symbolic architecture",
        description:
            "Every production system I've built separates probabilistic extraction from deterministic decisions using neuro-symbolic design patterns. Complete audit trails, provenance tracking, and confidence thresholds at every layer. I know when to use LLMs and when to use rules—and I build the infrastructure to enforce that boundary.",
    },
];

export const skills = {
    engineering: [
        "TypeScript", "Python", "Node.js", "React/Next.js", "React Native",
        "SQL (PostgreSQL + Supabase)", "Docker", "AWS", "Vercel", "Git/CI/CD",
    ],
    aiSystems: [
        "LLM orchestration", "Agent frameworks", "RAG", "Neuro-symbolic AI",
        "Symbolic–LLM hybrids", "Embeddings & vector search", "Multi-agent coordination",
        "Multimodal SSL (PyTorch)", "Evaluation infrastructure",
    ],
    delivery: [
        "Agile/Scrum", "Program leadership", "Risk analysis",
        "Stakeholder alignment", "Auditability & compliance design",
    ],
};

export type ExperienceItem = {
    company: string;
    role: string;
    range: string;
    location?: string;
    bullets: string[];
    highlight?: string;
};

export const experience: ExperienceItem[] = [
    {
        company: "Community Vision Capital & Consulting",
        role: "Credit Analyst & Catalytic Capital Program Manager",
        range: "Dec 2023 – Nov 2025 · Remote",
        bullets: [
            "Built production financial spreading platform (TypeScript/Next.js/PostgreSQL/Supabase) with RBAC, audit logs, and real-time calculation pipelines — used by underwriting teams to analyze loan applications across millions in volume",
            "Managed $30M catalytic capital program and personally underwrote loan deals up to $3M, gaining deep hands-on experience in lending compliance, risk assessment, and regulatory requirements",
            "Encoded complex financial rules as deterministic backend logic, creating reliable automated workflows that became the foundation for later AI underwriting systems",
            "Integrated lending logic directly into internal tooling, reducing manual analysis overhead and standardizing underwriting processes",
        ],
        highlight: "Finance → software builder: moved complex domain rules into auditable, production workflows.",
    },
    {
        company: "Community Vision",
        role: "Catalytic Capital Program Analyst",
        range: "Jun 2022 – Dec 2023",
        bullets: [
            "Improved program operational efficiency ~20% through data modeling and financial analysis optimization",
            "Coordinated budgeting and performance tracking across ~$100M in programs",
            "Managed AHP and AHEAD compliance cycles, building deep expertise in regulatory requirements and audit processes",
        ],
    },
    {
        company: "Dorjil Company",
        role: "Finance Project Manager",
        range: "May 2020 – Oct 2021",
        bullets: [
            "Built Python/SQL automation tools that secured $400K+ in operating subsidies for affordable housing portfolios",
            "Led multi-year audit that recovered $2M in overdue operating subsidies",
            "Automated financial data pipelines, achieving ~25% efficiency improvements in reporting and compliance workflows",
        ],
    },
    {
        company: "Blindly",
        role: "Full-Stack Software Engineer (Contract)",
        range: "Jun 2020 – Sep 2020",
        bullets: [
            "Implemented ID parsing and verification system (Node.js/React/Redux) for identity authentication workflows",
            "Shipped production authentication features in fast-paced, cross-functional startup environment",
        ],
    },
];

export type Project = {
    slug: string;
    name: string;
    label: string;
    impactStatement: string;
    description: string;
    capabilities: string[];
    stack: string[];
    links: { type: "github" | "npm" | "docs" | "demo" | "site" | "blog" | "pypi" | "case-study" | "writeup"; href: string; label: string }[];
    featured?: boolean;
};

export const projects: Project[] = [
    {
        slug: "tiny-llm",
        name: "TinyLLM – Language Model from Scratch",
        label: "Research · Featured on TLDR AI",
        impactStatement: "67M parameter transformer trained entirely on consumer hardware — proving deep understanding of architecture, not just API calls.",
        description: "Built a GPT-style language model from scratch including RoPE positional encodings, RMSNorm, and SwiGLU activations. Designed a custom continual learning system with replay buffers and evaluation gating to prevent catastrophic forgetting. Achieved 93.94% exact-match accuracy on CLI command generation. This project demonstrates first-principles understanding of transformer architecture and training dynamics — the kind of depth that informs how I design and debug production LLM systems.",
        capabilities: [
            "Full transformer implementation (RoPE, RMSNorm, SwiGLU)",
            "Continual learning with replay buffers",
            "Evaluation gating to prevent catastrophic forgetting",
            "Trained on consumer GPU",
            "93.94% exact-match accuracy on CLI commands",
        ],
        stack: ["Python", "PyTorch", "WandB"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/tiny_llm", label: "GitHub" },
            { type: "demo", href: "https://huggingface.co/spaces/Geddydukes/Tiny_llm", label: "Demo" },
            { type: "blog", href: "/blog/tiny-llm", label: "Blog Post" },
        ],
        featured: true,
    },
    {
        slug: "underwriting-agent",
        name: "Underwriting Agent – AI-Native Credit Decision Platform",
        label: "In Development",
        impactStatement: "AI underwriting platform designed to reduce loan analysis from weeks to days while maintaining full regulatory compliance for CDFIs.",
        description: "End-to-end underwriting workspace that automates financial document processing, surfaces risks with complete provenance tracking, and generates audit-ready credit memos. Built for CDFIs where every lending decision requires documentation and regulatory compliance.\n\nThe challenge: using LLMs for analysis while maintaining the auditability required in financial services. The solution: strict separation between probabilistic document extraction and deterministic decision logic, with every recommendation tied directly to source documents and calculations.",
        capabilities: [
            "Agent-orchestrated workflow with deterministic + LLM hybrid analysis",
            "Three-tier OCR pipeline for financial documents",
            "Automated risk surfacing with full source provenance",
            "End-to-end auditability for regulatory compliance",
            "Applicant portals + analyst dashboards",
        ],
        stack: ["Python", "TypeScript", "FastAPI", "PostgreSQL", "LLMs"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/underwriting_agent", label: "GitHub" },
            { type: "case-study", href: "#", label: "Case Study (Coming Soon)" },
        ],
        featured: true,
    },
    {
        slug: "claims-policy-engine",
        name: "Claims & Policy Decision Engine",
        label: "In Progress",
        impactStatement: "Neuro-symbolic decision engine that converts probabilistic LLM outputs into deterministic, auditable decisions for regulated workflows.",
        description: "Policy and claims decision system designed for environments where \"the model said so\" isn't good enough. Uses LLMs to interpret unstructured documents, then enforces strict validation, confidence thresholds, and deterministic rule evaluation before any decision is made. Every output includes complete audit trails showing which documents informed which conclusions.\n\nA working proof-of-concept for the neuro-symbolic architecture that now underpins the underwriting platform — demonstrating the pattern at a smaller scale before productizing it.",
        capabilities: [
            "Neuro-symbolic architecture: probabilistic extraction → deterministic validation",
            "Confidence-gated decision workflows",
            "Complete document provenance tracking",
            "Deterministic rule enforcement",
            "Audit-ready decision logs",
        ],
        stack: ["Python", "FastAPI", "Pydantic", "PostgreSQL"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Policy-and-Claims-Processing-Decision-Engine", label: "GitHub" },
            { type: "writeup", href: "#", label: "Technical Writeup" },
        ],
        featured: true,
    },
    {
        slug: "agentft",
        name: "AgentFT – Agent Evaluation Framework",
        label: "Open Source · npm + PyPI",
        impactStatement: "Testing infrastructure that makes AI agent reliability measurable, repeatable, and debuggable. Everyone is building agents — almost no one knows how to test them.",
        description: "Evaluation harness that treats AI agents as testable software artifacts. Supports task abstractions, async execution, composite judging, and trace-level logging to detect regressions across versions and workflows.\n\nCritical for production deployments where you need to know if your agent got worse after an update. Published as open-source packages on both npm and PyPI — because good developer experience matters.",
        capabilities: [
            "Async evaluation engine for agent tasks",
            "Regression detection across versions",
            "Trace-level observability",
            "Composite judge patterns",
            "Published on npm and PyPI",
        ],
        stack: ["Python", "AsyncIO", "PyTorch", "Jinja2"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/agentflowtest", label: "GitHub" },
            { type: "pypi", href: "https://pypi.org/project/agentft/", label: "PyPI" },
        ],
        featured: true,
    },
    {
        slug: "financial-platform",
        name: "Financial Analysis Platform",
        label: "Live · Used by underwriting teams",
        impactStatement: "Real-time financial computation engine that powered underwriting decisions across millions in loan volume.",
        description: "Production fintech platform built while managing a $30M CDFI portfolio. Supports real-time financial analysis, metric computation, and compliance workflows with sub-second latency. Architected deterministic calculation pipelines with role-based access control and full audit logging.\n\nThis became the deterministic financial core later integrated into the AI underwriting platform — proving the value of building reliable calculation engines before layering AI on top.",
        capabilities: [
            "Real-time financial metric computation",
            "Deterministic calculation pipelines",
            "RBAC + complete audit logs",
            "Compliance workflow automation",
            "Sub-second latency across millions in loan decisions",
        ],
        stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/FinancialAnalysisTool", label: "GitHub" },
        ],
        featured: true,
    },
    {
        slug: "research-discovery-agent",
        name: "Research Discovery Agent",
        label: "Demo",
        impactStatement: "Provenance-tracked research extraction system that prioritizes correctness and traceability over fluency.",
        description: "Research discovery platform that converts unstructured academic papers into a structured, queryable knowledge graph while enforcing provenance and confidence at every step. LLMs propose extractions, which are then validated deterministically before graph ingestion.\n\nBuilt to explore how to combine LLM flexibility with symbolic validation — every claim in the knowledge graph can be traced back to its source document with a confidence score.",
        capabilities: [
            "Provenance-first document extraction",
            "Confidence-gated claims before graph insertion",
            "Neuro-symbolic validation layer",
            "Queryable knowledge graph with relationship tracking",
            "Full source traceability",
        ],
        stack: ["TypeScript", "Node.js", "PostgreSQL", "LLMs"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Research_Agent", label: "GitHub" },
            { type: "demo", href: "https://research-agent-auzoksqnx-geddydukes-projects.vercel.app/", label: "Live Demo" },
        ],
        featured: true,
    },
];

export const contactInfo = {
    heading: "Let's work together",
    body: `If your current AI strategy is "just use a bigger prompt," let's talk about how to build a system that actually survives an audit.

I'm looking for ML engineering roles where I can build AI systems that ship to production and handle real consequences. Particularly interested in companies working in regulated industries; fintech, healthcare, insurance, legal.`,
    location: "Based in SF Bay Area · Available immediately · Open to in-person and remote",
};
