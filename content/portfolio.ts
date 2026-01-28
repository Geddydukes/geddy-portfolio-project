export const me = {
    name: "Geddy Dukes",
    title: "AI/ML Engineer",
    tagline:
        "AI/ML systems engineer who builds production ML infrastructure from first principles. Implemented a 67M-parameter language model from scratch, multimodal self-supervised learning systems (JEPA/CPC), and neuro-symbolic AI frameworks. Published open-source agent runtime on npm. Deep experience in full-stack development, LLM orchestration, and production deployment. Domain expertise in financial systems, real estate, and regulated environments.",
    location: "San Francisco Bay Area, CA (remote-friendly)",
    email: "geddydukes@gmail.com",
    phone: "(707) 799-1271",
    links: {
        site: "https://geddydukes.com",
        github: "https://github.com/Geddydukes",
        linkedin: "https://www.linkedin.com/in/geddy-dukes",
        // You can upload this PDF to /public and change this path later.
        resume: "/mnt/data/Geddy-Dukes Resume.pdf",
    },
};

export const brandSummary = `
AI/ML systems engineer who designs production ML infrastructure with reliability and evaluation as first principles. Built and evaluated a 67M-parameter language model from scratch achieving 93.94% exact-match accuracy under consumer hardware constraints. Built and open-sourced agent runtimes and evaluation frameworks used to measure and debug agent reliability over time. Specializes in neuro-symbolic systems, multimodal learning, and building trustworthy AI systems for regulated environments.

`.trim();

export const skills = {
    engineering: [
        "TypeScript", "Python", "Node.js", "React/Next.js", "React Native",
        "SQL (PostgreSQL + Supabase)", "Docker", "AWS", "Vercel", "Git/CI/CD",
    ],
    aiSystems: [
        "LLM orchestration", "agent frameworks", "RAG", "symbolic–LLM hybrids",
        "embeddings & vector search", "multi-agent coordination", "multimodal SSL (PyTorch)",
    ],
    delivery: ["Agile/Scrum", "program leadership", "risk analysis", "stakeholder alignment", "auditability & compliance design"],
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
        role: "Credit Analyst & Program Manager, Catalytic Capital",
        range: "Dec 2023 – Nov 2025 · Remote",
        bullets: [
            "Built a financial spreading platform (TypeScript/Next.js/PostgreSQL/Supabase) with RBAC, audit logs, and real-time pipelines used by underwriting teams.",
            "Encoded complex financial rules as reliable backend logic across automated workflows.",
            "Managed $30M program and underwrote deals up to $3M; integrated lending logic into internal tooling.",
        ],
        highlight: "Finance → software builder: moved complex rules into auditable, real workflows.",
    },
    {
        company: "Community Vision",
        role: "Catalytic Capital Program Analyst",
        range: "Jun 2022 – Dec 2023",
        bullets: [
            "Improved program efficiency ~20% via data models and analysis.",
            "Coordinated budgeting/performance across ~$100M in programs; managed AHP/AHEAD compliance cycles.",
        ],
    },
    {
        company: "Dorjil Company",
        role: "Finance Project Manager",
        range: "May 2020 – Oct 2021",
        bullets: [
            "Built Python/SQL tools securing $400K+ in subsidies; automated data pipelines for ~25% efficiency.",
            "Led multi-year audit recovering $2M in overdue operating subsidies.",
        ],
    },
    {
        company: "Blindly (contract)",
        role: "Full-Stack Software Engineer",
        range: "Jun 2020 – Sep 2020",
        bullets: [
            "Implemented ID parsing/verification (Node/React/Redux) and shipped authentication flows in a cross-functional team.",
        ],
    },
    // Earlier sales/ops roles intentionally omitted from site to keep AI/engineering focus tight.
];

export type Project = {
    slug: string;
    category: string;
    name: string;
    tagline: string;
    status: "live" | "deploying" | "private-beta" | "ready-to-publish" | "archive";
    stack: string[];
    summary: string;
    highlights: string[];
    links: { type: "github" | "npm" | "docs" | "demo" | "site" | "blog" | "pypi"; href: string; label?: string }[];
    featured?: boolean;
};

export const projects: Project[] = [
    // AI Infrastructure & Agentic Systems
    {
        slug: "underwriting-agent",
        category: "AI Infrastructure & Agentic Systems",
        name: "Underwriting Agent – AI-Native Credit Decision Platform",
        tagline: "End-to-end underwriting workspace with agentic analysis, risk surfacing, and provenance",
        status: "live",
        stack: ["Python", "TypeScript", "FastAPI", "PostgreSQL", "LLMs"],
        summary:
            "Full-stack underwriting platform that unifies financial analysis, document ingestion, and policy-aware decisioning into a single workflow. The system orchestrates multiple domain-specific agents to surface risks, validate assumptions, and generate auditable decision support tied directly to source documents and deterministic calculations.\n\nBuilt by productizing earlier deterministic finance and policy engines into a workflow underwriters can actually use.",
        highlights: ["Agent-Orchestrated Workflow", "Deterministic + LLM Hybrid", "End-to-End Auditability"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/underwriting_agent" },
            { type: "docs", href: "#", label: "Case Study" },
        ],
        featured: true,
    },
    {
        slug: "claims-policy-engine",
        category: "AI Infrastructure & Agentic Systems",
        name: "Claims & Policy Decision Engine",
        tagline: "Neuro-symbolic decision engine for regulated workflows",
        status: "live",
        stack: ["Python", "FastAPI", "Pydantic", "PostgreSQL"],
        summary:
            "Policy and claims decision engine designed to convert probabilistic LLM extraction into deterministic, auditable outcomes. The system explicitly separates AI-powered document interpretation from rule evaluation, enforcing strict validation, confidence thresholds, and traceable decision paths.\n\nDesigned for environments where hallucination is unacceptable and every decision must be defensible.",
        highlights: ["Neuro-Symbolic Architecture", "Deterministic Rule Enforcement", "Audit Trails & Provenance"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Policy-and-Claims-Processing-Decision-Engine", label: "GitHub" },
            { type: "docs", href: "#", label: "Technical Writeup" },
        ],
        featured: true,
    },
    {
        slug: "research-discovery-agent",
        category: "AI Infrastructure & Agentic Systems",
        name: "Research Discovery Agent",
        tagline: "Provenance-tracked research extraction and knowledge graph",
        status: "live",
        stack: ["TypeScript", "Node.js", "PostgreSQL", "LLMs"],
        summary:
            "Research discovery system that converts unstructured papers into a structured, queryable knowledge graph while enforcing provenance and confidence at every step. LLMs propose extractions, which are then validated deterministically before graph ingestion.\n\nDesigned to prioritize correctness and traceability over fluency.",
        highlights: ["Provenance-First Extraction", "Confidence-Gated Claims", "Neuro-Symbolic Validation"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Research_Agent", label: "GitHub" },
            { type: "demo", href: "https://research-agent-auzoksqnx-geddydukes-projects.vercel.app/", label: "Live Demo" },
        ],
        featured: true,
    },
    {
        slug: "agentft",
        category: "AI Infrastructure & Agentic Systems",
        name: "AgentFT – Agent Evaluation Framework",
        tagline: "Reproducible evaluation harness for agentic systems",
        status: "live",
        stack: ["Python", "AsyncIO", "PyTorch", "Jinja2"],
        summary:
            "Evaluation framework for testing and benchmarking AI agents as software artifacts. Supports task abstractions, async execution, composite judging, and trace-level logging to detect regressions across versions and workflows.\n\nBuilt to make agent reliability measurable, repeatable, and debuggable.",
        highlights: ["Async Evaluation Engine", "Regression Detection", "Trace-Level Observability"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/agentflowtest", label: "GitHub" },
            { type: "pypi", href: "https://pypi.org/project/agentft/", label: "PyPI" },
        ],
        featured: true,
    },

    // Deep Learning Research
    {
        slug: "tiny-llm",
        category: "Deep Learning Research",
        name: "TinyLLM – Language Model from Scratch",
        tagline: "67M parameter transformer with continual learning system",
        status: "live",
        stack: ["Python", "PyTorch", "WandB"],
        summary:
            "Implemented a 67M parameter GPT-style transformer from scratch, including RoPE, RMSNorm, and SwiGLU, trained entirely on consumer hardware. Designed a custom continual learning system with replay buffers and evaluation gating to prevent catastrophic forgetting.\n\nAchieved 93.94% exact-match accuracy on CLI command generation tasks.",
        highlights: ["67M Parameters", "Continual Learning", "Transformer Architecture"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/tiny_llm", label: "GitHub" },
            { type: "demo", href: "#", label: "Demo" },
            { type: "blog", href: "/blog/tiny-llm", label: "Blog Post" },
        ],
        featured: true,
    },
    {
        slug: "world-model",
        category: "Deep Learning Research",
        name: "World Model – Multimodal Self-Supervised Learning",
        tagline: "JEPA + CPC + CLIP implementation with episodic memory",
        status: "live",
        stack: ["Python", "PyTorch", "JEPA", "CPC", "NumPy"],
        summary:
            "Vision–audio contrastive learning system with episodic memory, trained using self-supervised objectives. Includes nightly training and validation pipelines plus rollout evaluation to test temporal consistency, representation coherence, and downstream retrieval behavior.\n\nExplores representation learning for reasoning rather than standalone embeddings.",
        highlights: ["JEPA + CPC + CLIP", "Episodic Memory", "Self-Supervised Learning"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/world-model-poc", label: "GitHub" },
        ],
        featured: true,
    },

    // Full Stack Applications
    {
        slug: "financial-platform",
        category: "Full Stack Applications",
        name: "Financial Analysis Platform",
        tagline: "Real-time financial computation engine for underwriting teams",
        status: "live",
        stack: ["TypeScript", "Next.js", "PostgreSQL", "RBAC"],
        summary:
            "Production fintech platform supporting real-time financial analysis, metric computation, and compliance workflows. Architected deterministic calculation pipelines, role-based access control, and full audit logging to support underwriting decisions across millions in loan volume with sub-second latency requirements.\n\nServed as the deterministic financial core later reused in agentic underwriting systems.",
        highlights: ["Deterministic Computation", "Real-Time Metrics", "Compliance-First Design"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/FinancialAnalysisTool", label: "GitHub" },
        ],
        featured: true,
    },
];

export const education = [
    { label: "M.S. Analytics (Computational Data)", org: "Georgia Tech", note: "Starting Mar 2026" },
    { label: "B.S. Computer Science", org: "Western Governors University", note: "Expected 2026" },
    { label: "B.S. Business Administration", org: "Western Governors University", note: "2024" },
];

export const certifications = [
    "PMP (Project Management Institute, 2023)",
    "Google Data Analytics (2022)",
];
