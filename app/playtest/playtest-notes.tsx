"use client"

import { useState } from "react"
import { Check, Copy, Link as LinkIcon } from "lucide-react"
import { notesForTags, playtestNotes, playtestTags } from "@/content/playtest"
import styles from "./page.module.css"

const tagLabel = (id: string) => playtestTags.find((tag) => tag.id === id)?.label ?? id

export default function PlaytestNotes({ initialTags }: { initialTags: string[] }) {
    const validIds = playtestTags.map((tag) => tag.id)
    const [selected, setSelected] = useState<string[]>(initialTags.filter((tag) => validIds.includes(tag)))
    const [copied, setCopied] = useState<string | null>(null)

    const notes = notesForTags(selected)

    const updateUrl = (tags: string[]) => {
        const url = tags.length ? `/playtest?tags=${tags.join(",")}` : "/playtest"
        window.history.replaceState(null, "", url)
    }

    const toggle = (id: string) => {
        const next = selected.includes(id) ? selected.filter((tag) => tag !== id) : [...selected, id]
        setSelected(next)
        updateUrl(next)
    }

    const flash = (key: string) => {
        setCopied(key)
        setTimeout(() => setCopied(null), 1500)
    }

    const copyText = async (key: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            flash(key)
        } catch {
            // Clipboard can be blocked (insecure context); nothing else to do.
        }
    }

    const noteText = (title: string, body: string) => `${title}\n${body}`

    const shareLink = () =>
        copyText(
            "link",
            `${window.location.origin}/playtest${selected.length ? `?tags=${selected.join(",")}` : ""}`
        )

    const copyAllShown = () =>
        copyText("all", notes.map((note) => `• ${noteText(note.title, note.body)}`).join("\n\n"))

    const groups: { title: string; group: "type" | "region" }[] = [
        { title: "Type", group: "type" },
        { title: "Region", group: "region" },
    ]

    return (
        <>
            <div className={styles.filters}>
                {groups.map(({ title, group }) => (
                    <div key={group} className={styles.filterRow}>
                        <span className={styles.filterLabel}>{title}</span>
                        <div className={styles.tagRow}>
                            {playtestTags
                                .filter((tag) => tag.group === group)
                                .map((tag) => (
                                    <button
                                        key={tag.id}
                                        type="button"
                                        aria-pressed={selected.includes(tag.id)}
                                        onClick={() => toggle(tag.id)}
                                        className={`${styles.tagButton} ${selected.includes(tag.id) ? styles.tagButtonActive : ""}`}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.toolbar}>
                <span className={styles.count}>
                    Showing {notes.length} of {playtestNotes.length} notes
                    {selected.length > 0 && (
                        <button type="button" className={styles.clear} onClick={() => { setSelected([]); updateUrl([]) }}>
                            Clear filters
                        </button>
                    )}
                </span>
                <div className={styles.actions}>
                    <button type="button" className={styles.actionButton} onClick={shareLink}>
                        {copied === "link" ? <Check className="h-4 w-4" /> : <LinkIcon className="h-4 w-4" />}
                        {copied === "link" ? "Link copied" : "Copy link to this view"}
                    </button>
                    <button type="button" className={styles.actionButton} onClick={copyAllShown}>
                        {copied === "all" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        {copied === "all" ? "Copied" : "Copy notes as text"}
                    </button>
                </div>
            </div>

            <ul className={styles.noteList}>
                {notes.map((note) => (
                    <li key={note.id} id={note.id} className={styles.note}>
                        <div className={styles.noteHeader}>
                            <h2 className={styles.noteTitle}>{note.title}</h2>
                            <button
                                type="button"
                                className={styles.iconButton}
                                aria-label={`Copy "${note.title}"`}
                                onClick={() => copyText(note.id, noteText(note.title, note.body))}
                            >
                                {copied === note.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </button>
                        </div>
                        <p className={styles.noteBody}>{note.body}</p>
                        <div className={styles.noteTags}>
                            {note.tags.map((tag) => (
                                <span key={tag} className={styles.noteTag}>{tagLabel(tag)}</span>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}
