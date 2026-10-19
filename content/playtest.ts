// Reusable playtest notes. Edit this file, then send friends a link like:
//   /playtest?tags=start-here,hoenn
// Tags in the same group (type / region) widen the view; tags from different groups narrow it
// (no tags = everything). Tag ids are in playtestTags below.

export type PlaytestTag = {
    id: string;
    label: string;
    group: "type" | "region";
};

export const playtestBanner = {
    src: "/games/concord-title.webp",
    alt: "Pokémon Legacy: Concord Edition title screen",
};

export const playtestBuild = {
    game: "Pokémon Legacy: Concord Edition",
    version: "0.2",
    status: "Work in progress. Expect hard locks and rough edges, that is what you are here to find.",
};

export const playtestTags: PlaytestTag[] = [
    { id: "start-here", label: "Start here", group: "type" },
    { id: "how-to-report", label: "How to report", group: "type" },
    { id: "known-issue", label: "Known issue", group: "type" },
    { id: "test-this", label: "Please test", group: "type" },
    { id: "fixed", label: "Fixed (recheck)", group: "type" },
    { id: "all-regions", label: "All regions", group: "region" },
    { id: "kanto", label: "Kanto", group: "region" },
    { id: "johto", label: "Johto", group: "region" },
    { id: "hoenn", label: "Hoenn", group: "region" },
    { id: "sinnoh", label: "Sinnoh", group: "region" },
];

export type PlaytestNote = {
    id: string;
    title: string;
    body: string;
    tags: string[];
};

export const playtestNotes: PlaytestNote[] = [
    {
        id: "protect-your-save",
        title: "Protect your save first",
        body: "Starting a New Game replaces the active campaign. Make a copy of your .sav before testing, and play on a throwaway save. Do not pick New Game on a save you care about.",
        tags: ["start-here", "all-regions"],
    },
    {
        id: "status",
        title: "What this build is",
        body: "This is an unofficial, non-commercial fan project and a work in progress, not a finished release. Not every region has had a full start-to-finish run yet, so hard locks are possible. No ROM is distributed.",
        tags: ["start-here", "all-regions"],
    },
    {
        id: "region-order",
        title: "Pick any region first",
        body: "New Game lets you choose a region, a protagonist and a name. Any region can come first and all four orders are supported. Each region is its own early-level campaign with its own badges and starter trio.",
        tags: ["start-here", "all-regions"],
    },
    {
        id: "report-template",
        title: "What to include in a bug report",
        body: "Please send: (1) what you were doing, (2) the last town/map you were in and the on-screen objective, (3) what happened: black screen, frozen text box, soft lock, wrong sprite, etc., (4) emulator or hardware, and (5) a screenshot or short clip if you can.",
        tags: ["how-to-report", "all-regions"],
    },
    {
        id: "save-test",
        title: "Test saving the normal way",
        body: "Save with the in-game Save option, fully close the emulator, reopen it and hit Continue. Savestates do not count for this one, I specifically need to know the regular save/load path works.",
        tags: ["test-this", "all-regions"],
    },
    {
        id: "kanto-start",
        title: "Kanto start",
        body: "Starts in Pallet Town. Meet Oak at his lab and pick Bulbasaur, Charmander or Squirtle. Check the first routes, the Pokémon Center and the Mart, then save and Continue.",
        tags: ["test-this", "kanto"],
    },
    {
        id: "johto-start",
        title: "Johto start",
        body: "Starts in New Bark Town. Visit Elm's lab and pick Chikorita, Cyndaquil or Totodile. The three Poké Balls used to be unreachable (hard lock), so confirm you can see and select all three.",
        tags: ["test-this", "fixed", "johto"],
    },
    {
        id: "johto-lab-lock",
        title: "Elm's lab hard lock (fixed)",
        body: "Previously there were no Poké Balls on the table in Elm's lab, so no starter could be chosen. That is fixed in this build. If you still can't pick a starter, tell me exactly what you see.",
        tags: ["fixed", "johto"],
    },
    {
        id: "hoenn-start",
        title: "Hoenn start",
        body: "Starts in Littleroot Town with the Route 101 Birch rescue. Later arrivals get the starter from Birch's lab instead, so the first-start and later-arrival flows are different on purpose.",
        tags: ["test-this", "hoenn"],
    },
    {
        id: "hoenn-wally",
        title: "Wally catching scene lock",
        body: "Some players hit a hard lock at Wally's catching tutorial in Petalburg. I need detail to track it down: did it happen before the battle, during it, or after \"Let's go back\"? Is the screen black, or is a text box frozen?",
        tags: ["known-issue", "hoenn"],
    },
    {
        id: "hoenn-trucks",
        title: "Moving trucks in Littleroot (fixed)",
        body: "The moving trucks used to sit in front of the wrong house and never leave. They are now hidden on every Littleroot load. Let me know if you still see one.",
        tags: ["fixed", "hoenn"],
    },
    {
        id: "sinnoh-start",
        title: "Sinnoh start",
        body: "Starts in Twinleaf Town. Follow Route 201 to Sandgem and Rowan's lab, then pick Turtwig, Chimchar or Piplup. The Starly rescue is an adapted text scene. Sinnoh needs the broadest pass, so wander and poke at things.",
        tags: ["test-this", "sinnoh"],
    },
    {
        id: "sinnoh-healing",
        title: "Pokémon Center healing (fixed)",
        body: "Sinnoh nurses were standing too far back to talk to, so nobody could heal. That is fixed. Please confirm healing works at every Pokémon Center you visit.",
        tags: ["fixed", "sinnoh"],
    },
    {
        id: "box-menu",
        title: "Start menu BOX option",
        body: "The BOX entry in the start menu has misbehaved for some players. If it does for you, tell me which region you were in and exactly what happened when you selected it.",
        tags: ["known-issue", "all-regions"],
    },
    {
        id: "unreachable-npcs",
        title: "Unreachable people and items",
        body: "Some imported maps may have NPCs, items or doors you can't reach (gyms and big buildings in Johto, Kanto and Sinnoh are the likely spots). If you can't talk to someone or open a door, send me the map name and where you were standing.",
        tags: ["known-issue", "all-regions", "johto", "kanto", "sinnoh"],
    },
    {
        id: "walk-speed",
        title: "Walking speed (fixed)",
        body: "Walking used to be too slow. It now moves at run-step speed. Tell me if it feels off.",
        tags: ["fixed", "all-regions"],
    },
];

// Within a group (type / region) tags are alternatives; across groups they narrow:
// "known-issue,hoenn" = known issues for Hoenn, "kanto,johto" = anything for either.
const isRegion = (id: string) => playtestTags.some((tag) => tag.id === id && tag.group === "region");

export function notesForTags(selected: string[]): PlaytestNote[] {
    const groups = (["type", "region"] as const)
        .map((group) =>
            selected.filter((id) => playtestTags.some((tag) => tag.id === id && tag.group === group))
        )
        .filter((ids) => ids.length > 0);
    // A specific region also pulls in the notes that apply everywhere.
    return playtestNotes.filter((note) =>
        groups.every((ids) => ids.some((id) => note.tags.includes(id)) || (isRegion(ids[0]) && note.tags.includes("all-regions")))
    );
}
