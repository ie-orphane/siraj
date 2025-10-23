import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/react";
import "./globals.css"
import { Suspense } from "react"

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
})

export const metadata: Metadata = {
  title: "سراج - نادي طلابي",
  description: "نادي سراج هو نادي طلابي يهدف إلى تطوير الطلبة في مناح كثيرة",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${amiri.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
