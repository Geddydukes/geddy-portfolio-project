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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 to-gray-800 text-white`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </div>
        <CustomCursor />
      </body>
    </html>
  )
}



import './globals.css'