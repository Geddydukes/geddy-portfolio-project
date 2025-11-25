import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Geddy Dukes - Technical Program Manager",
  description: "Experienced Technical Program Manager with a passion for Agile methodologies and data-driven solutions",
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
        <CustomCursor />
      </body>
    </html>
  )
}



import './globals.css'