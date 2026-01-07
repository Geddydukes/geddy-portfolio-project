import type { Metadata } from "next"
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "AI Learning Accelerator | Geddy Dukes",
    description: "Interactive AI Learning Accelerator hosted on Geddy Dukes' portfolio.",
}

export default function LearnBetterPage() {
    return (
        <div className={styles.container}>
            <h1 className="text-2xl font-bold mb-4">AI Learning Accelerator</h1>
            <iframe
                src="https://ai-learning-accelerator-306803202416.us-west1.run.app"
                className={styles.iframe}
                title="AI Learning Accelerator"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}
