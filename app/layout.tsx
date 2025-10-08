import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import type React from "react"
import { Suspense } from "react"
import { ReduxProvider } from "@/lib/store/providers/ReduxProvider"
import { AuthProvider } from "@/lib/store/providers/AuthProvider"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Blueprint.xyz - Community for Architects",
  description: "A community platform merging discussions, reels, and portfolios for architects",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${GeistMono.variable}`}>
        <ReduxProvider>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </AuthProvider>
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  )
}
