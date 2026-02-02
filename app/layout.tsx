import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"

import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Geddy Dukes - AI/ML Engineer",
  description: "AI/ML systems engineer who builds production ML infrastructure from first principles. Domain expertise in financial systems, real estate, and regulated environments.",
  generator: 'v0.dev'
}

import AnimatedBackground from "@/components/animated-background"

import styles from "./layout.module.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${styles.body}`}>
        <AnimatedBackground />
        <div className={styles.layoutWrapper}>
          <Header />
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>

      </body>
    </html>
  )
}



import './globals.css'