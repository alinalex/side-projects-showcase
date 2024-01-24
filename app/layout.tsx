import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: 'Side Projects Showcase',
  description: 'Showcase your side-projects to the whole world.',
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning={true} className={cx(
        "text-content bg-app-bg w-full h-full",
        GeistSans.variable,
        GeistMono.variable)}>
        <body className="p-4 w-full min-h-full" suppressHydrationWarning={true}>
          <main className="w-full h-full">
            {children}
          </main>
          <Toaster />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
