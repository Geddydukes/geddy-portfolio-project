export type CreativeProject = {
    slug: string;
    name: string;
    label: string;
    kind: string;
    impactStatement: string;
    description: string;
    highlights: string[];
    stack: string[];
    links: { label: string; href: string }[];
    image?: { src: string; alt: string };
    disclaimer?: string;
    featured?: boolean;
};

export const creativeIntro = {
    heading: "Creative Engineering",
    body: "Games and design-driven builds where systems thinking meets craft: data pipelines that generate content, tooling that keeps a huge codebase honest, and design rules that hold up under four-way branching progression.",
};

// Add new games / design pieces here and they show up on the home page and /creative automatically.
export const creativeProjects: CreativeProject[] = [
    {
        slug: "concord-edition",
        name: "Pokémon Legacy: Concord Edition",
        label: "In development · Playtesting",
        kind: "Game · GBA ROM hack",
        impactStatement:
            "One game, four regions, any order: Kanto, Johto, Hoenn and Sinnoh joined into a single connected journey with 24 supported campaign orders.",
        description:
            "A Game Boy Advance project built on pokeemerald-expansion. Every region is a fresh early-level campaign with its own badges, League and starter trio; what carries over is the trainer and, through Legacy Reversion, one chosen Pokémon that returns as the same individual.\n\nMost of the work is engineering the design: a versioned save layout with explicit migrations, a content registry that generates trainer and map data from JSON, and host-script plus ARM test suites that catch regressions before anything reaches an emulator.",
        highlights: [
            "Legacy Reversion: a chosen Pokémon returns at level 5 with IVs, nature, shininess, ball, nickname and OT intact",
            "All 24 region orders supported, with independent badges, story and League progress per region",
            "Content pipeline: authoring JSON and generators produce trainer and map headers, validated by host scripts",
            "256 Gym history variants plus rivals, League and villain teams driven from one registry",
            "Versioned save format with explicit migrations and ARM test coverage",
            "Playtest-driven fixes, e.g. a scan that found unreachable NPCs behind counters across imported maps",
        ],
        stack: ["C", "ARM assembly", "Python", "Make", "mGBA test runner"],
        links: [
            { label: "Source", href: "https://github.com/Geddydukes/Pokemon-Legacy-Concord" },
            { label: "Playtest notes", href: "/playtest" },
        ],
        image: { src: "/games/concord-title.webp", alt: "Pokémon Legacy: Concord Edition title screen showing the four regions" },
        disclaimer:
            "Unofficial, non-commercial fan project made for fun. Not affiliated with or endorsed by Nintendo, Game Freak, Creatures Inc. or The Pokémon Company. Pokémon and its characters are trademarks of their respective owners.",
        featured: true,
    },
];
