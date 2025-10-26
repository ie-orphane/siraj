import type React from "react"
import type { Metadata } from "next"
import { Amiri, Kufam, Tajawal } from "next/font/google"
import { Analytics } from "@vercel/analytics/react";
import "./globals.css"
import { Suspense } from "react"
import { JoinAuthHandler } from "@/components/join-auth-handler"
import { ToastProvider } from "@/components/providers/toast-provider"

const amiri = Amiri({
  weight: ["400", "700"],
  subsets: ["arabic"],
  variable: "--font-amiri",
  display: "swap",
});

const kufam = Kufam({
  weight: ["400", "600", "500", "700", "800", "900"],
  subsets: ["arabic"],
  variable: "--font-kufam",
  display: "swap",
});

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700"],
  subsets: ["arabic"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "سراج",
  description: "نادي سراج هو نادي طلابي يهدف إلى تطوير الطلبة في مناح كثيرة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`font-tajawal ${kufam.variable} ${amiri.variable} ${tajawal.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <JoinAuthHandler />
        <ToastProvider />
        <Analytics />
      </body>
    </html>
  )
}
