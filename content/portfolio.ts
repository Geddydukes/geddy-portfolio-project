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
AI-native systems engineer and builder who turns complex rules and models into auditable, production software. 
I’ve built a neuro-symbolic reasoning framework (Hydra), a provider-agnostic agent runtime (Feather), 
and a multimodal world model — while leading development of a finance platform used in real underwriting workflows. 
With a PMP backbone and experience managing $30M–$100M programs, I design systems that are explainable, measurable, 
and ready for regulated environments. Currently deploying Hydra and Wisely; SafeMama is launch-ready.
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
    links: { type: "github" | "npm" | "docs" | "demo" | "site" | "blog"; href: string; label?: string }[];
    featured?: boolean;
};

export const projects: Project[] = [
    // Deep Learning Research
    {
        slug: "tiny-llm",
        category: "Deep Learning Research",
        name: "TinyLLM - Language Model from Scratch",
        tagline: "67M parameter transformer with continual learning system",
        status: "live",
        stack: ["Python", "PyTorch", "WandB"],
        summary: "Implemented a 67M parameter transformer from scratch, featuring a custom continual learning system to prevent catastrophic forgetting.",
        highlights: ["67M Parameters", "Continual Learning", "Transformer Architecture"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/TinyLLM", label: "GitHub" },
            { type: "demo", href: "#", label: "Demo" },
            { type: "blog", href: "#", label: "Blog Post" },
        ],
        featured: true,
    },
    {
        slug: "world-model-poc",
        category: "Deep Learning Research",
        name: "World Model - Multimodal Self-Supervised Learning",
        tagline: "JEPA + CPC + CLIP implementation with episodic memory",
        status: "live",
        stack: ["Python", "PyTorch", "JEPA", "CPC", "NumPy"],
        summary:
            "Vision–audio contrastive learning with episodic memory; nightly training/validation and rollout evaluation to test temporal dynamics and embedding coherence.",
        highlights: ["JEPA + CPC + CLIP", "Episodic Memory", "Self-Supervised"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/world-model-poc", label: "GitHub" },
            { type: "demo", href: "#", label: "Demo" },
            { type: "docs", href: "#", label: "Technical Doc" },
        ],
        featured: true,
    },

    // AI Infrastructure & Frameworks
    {
        slug: "daedelos",
        category: "AI Infrastructure & Frameworks",
        name: "Daedelos SDK - Neuro-Symbolic AI Platform",
        tagline: "Enterprise AI governance with audit trails and hybrid reasoning",
        status: "deploying",
        stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis"],
        summary:
            "Hybrid multi-agent framework that composes deterministic symbolic rules with LLM agents for explainable, traceable decisions in regulated contexts.",
        highlights: ["Neuro-Symbolic", "Audit Trails", "Hybrid Reasoning"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Hydra_system", label: "GitHub" },
            { type: "docs", href: "#", label: "Documentation" },
            { type: "docs", href: "#", label: "Architecture" },
        ],
        featured: true,
    },
    {
        slug: "feather-agent",
        category: "AI Infrastructure & Frameworks",
        name: "Feather Agent - Open-Source Agent Runtime",
        tagline: "Provider-agnostic agent framework (published on npm)",
        status: "live",
        stack: ["TypeScript", "Node.js"],
        summary:
            "Open-source runtime for stateful agents, tool execution, model routing, and transparent streaming plans with config-driven state/behavior/lifecycle.",
        highlights: ["Provider-Agnostic", "npm Package", "Agent Runtime"],
        links: [
            { type: "npm", href: "https://www.npmjs.com/package/feather-agent", label: "npm Package" },
            { type: "github", href: "https://github.com/Geddydukes/feather-agent", label: "GitHub" },
            { type: "docs", href: "#", label: "API Docs" },
        ],
        featured: true,
    },
    {
        slug: "agentbench",
        category: "AI Infrastructure & Frameworks",
        name: "agentbench – Open-Source Agent Evaluation Framework",
        tagline: "Framework for benchmarking LLM and tool-using agents",
        status: "live",
        stack: ["Python", "AsyncIO"],
        summary:
            "Framework for benchmarking LLM and tool-using agents. Supports async execution, retries, rate limits, composite judges, JSONL artifacts, traces, and HTML reports.",
        highlights: ["Agent Benchmarking", "Open Source", "Python Package", "Report Generation"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/agentbench", label: "GitHub" },
            { type: "docs", href: "https://pypi.org/project/agentbench/", label: "PyPI" },
        ],
        featured: true,
    },

    // Full Stack Applications
    {
        slug: "audio-routing-sim",
        category: "Full Stack Applications",
        name: "Audio Routing System - Hybrid ML + Rules",
        tagline: "Intelligent audio classification and dynamic stem routing",
        status: "live",
        stack: ["Python", "DSP/ML"],
        summary:
            "Ingests multi-track audio events (speech/SFX/music), classifies via rule + ML, and dynamically routes stems through a virtual post-production graph.",
        highlights: ["Hybrid ML + Rules", "Dynamic Routing", "Audio Classification"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Audio_routing_sim", label: "GitHub" },
            { type: "docs", href: "#", label: "Technical Overview" },
        ],
        featured: true,
    },
    {
        slug: "financial-platform",
        category: "Full Stack Applications",
        name: "Financial Analysis Platform",
        tagline: "Real-time underwriting metrics with RBAC + audit",
        status: "live",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Node.js"],
        summary:
            "Underwriting workflow platform processing millions in loan volume; 15+ metrics with sub-second latency, RBAC, audit logs, and secure APIs.",
        highlights: ["Sub-second calc engine", "Compliance-ready", "Used in production"],
        links: [],
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
