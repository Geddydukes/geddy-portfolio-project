export const me = {
    name: "Geddy Dukes",
    title: "AI Systems Engineer • Technical Program Manager • Builder",
    tagline:
        "I design and ship auditable, AI-native systems — from neuro-symbolic reasoning and agent runtimes to multimodal world models and finance platforms.",
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
    name: string;
    tagline: string;
    status: "live" | "deploying" | "private-beta" | "ready-to-publish" | "archive";
    stack: string[];
    summary: string;
    highlights: string[];
    links: { type: "github" | "npm" | "docs" | "demo" | "site"; href: string; label?: string }[];
    featured?: boolean;
};

export const projects: Project[] = [
    {
        slug: "hydra",
        name: "Hydra System",
        tagline: "Neuro-symbolic reasoning with auditable agent flows",
        status: "deploying",
        stack: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis"],
        summary:
            "Hybrid multi-agent framework that composes deterministic symbolic rules with LLM agents for explainable, traceable decisions in regulated contexts.",
        highlights: [
            "Dynamic rule graphs + agent coordination",
            "Retrieval memory + model routing",
            "Deterministic–LLM hybrid control flows with audit trails",
        ],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/Hydra_system" },
            // Add demo/docs when ready
        ],
        featured: true,
    },
    {
        slug: "feather-agent",
        name: "Feather Agent Runtime",
        tagline: "Provider-agnostic agent orchestration runtime (open source)",
        status: "live",
        stack: ["TypeScript", "Node.js"],
        summary:
            "Open-source runtime for stateful agents, tool execution, model routing, and transparent streaming plans with config-driven state/behavior/lifecycle.",
        highlights: ["Structured returns", "Robust error handling", "npm package: feather-agent"],
        links: [
            { type: "github", href: "https://github.com/Geddydukes/feather-agent" },
            { type: "npm", href: "https://www.npmjs.com/package/feather-agent", label: "npm" },
        ],
        featured: true,
    },
    {
        slug: "world-model-poc",
        name: "World Model POC",
        tagline: "Multimodal self-supervised learning with episodic memory",
        status: "live",
        stack: ["Python", "PyTorch", "JEPA", "CPC", "NumPy"],
        summary:
            "Vision–audio contrastive learning with episodic memory; nightly training/validation and rollout evaluation to test temporal dynamics and embedding coherence.",
        highlights: ["Temporal retrieval", "Automated pipelines", "Rollout evaluation"],
        links: [{ type: "github", href: "https://github.com/Geddydukes/world-model-poc" }],
        featured: true,
    },
    {
        slug: "wisely",
        name: "Wisely (LearningAccelerator)",
        tagline: "Multi-agent personalized learning engine",
        status: "private-beta",
        stack: ["TypeScript", "Supabase"],
        summary:
            "Adaptive learning orchestrated by role agents (CLO/Instructor/TA) with explainable checkpoints and progress tracking.",
        highlights: ["Agent orchestration", "Adaptive paths", "Explainable milestones"],
        links: [],
        featured: true,
    },
    {
        slug: "safemama",
        name: "SafeMama",
        tagline: "Pregnancy-safety ingredient scanner (launch-ready)",
        status: "ready-to-publish",
        stack: ["React Native", "Supabase", "Stripe"],
        summary:
            "Mobile app that checks ingredient safety during pregnancy. Built and tested; pending App Store listing.",
        highlights: ["On-device UX", "Content classification", "Launch-ready build"],
        links: [],
    },
    {
        slug: "financial-platform",
        name: "Financial Analysis Platform",
        tagline: "Real-time underwriting metrics with RBAC + audit",
        status: "live",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Node.js"],
        summary:
            "Underwriting workflow platform processing millions in loan volume; 15+ metrics with sub-second latency, RBAC, audit logs, and secure APIs.",
        highlights: ["Sub-second calc engine", "Compliance-ready", "Used in production"],
        links: [],
    },
    {
        slug: "audio-routing-sim",
        name: "Audio Routing Simulator",
        tagline: "Deterministic + learnable audio event routing",
        status: "live",
        stack: ["Python", "DSP/ML"],
        summary:
            "Ingests multi-track audio events (speech/SFX/music), classifies via rule + ML, and dynamically routes stems through a virtual post-production graph.",
        highlights: ["Multimodal reasoning", "Classification + routing", "Real-time-friendly design"],
        links: [{ type: "github", href: "https://github.com/Geddydukes/Audio_routing_sim" }],
    },
    {
        slug: "media-ingest-search",
        name: "Media Metadata Ingest & Search",
        tagline: "Audio feature extraction + lightning-fast tagging/search",
        status: "live",
        stack: ["PostgreSQL", "Redis", "REST/gRPC"],
        summary:
            "Cloud-first pipeline: ingest audio + sidecar metadata, extract technical/musical features, store in Postgres + Redis, expose APIs for fast search and tagging.",
        highlights: ["Feature extraction", "Indexing & search", "Production-ready API surface"],
        links: [{ type: "github", href: "https://github.com/Geddydukes/Media_metadata_ingest_search" }],
    },
    {
        slug: "forever-context",
        name: "Forever Context Memory Store",
        tagline: "Long-horizon memory inspired by human recall",
        status: "live",
        stack: ["TypeScript"],
        summary:
            "Long-term memory store for agentic systems; supports embeddings and retrieval policies for 'forever context' personalization.",
        highlights: ["Embedding memory", "Retrieval policies", "Agent-ready interfaces"],
        links: [{ type: "github", href: "https://github.com/Geddydukes/Forever-context-Memory-Store" }],
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
