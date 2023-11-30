import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css'

export const metadata: Metadata = {
  // todo: complete metadata for seo
  title: 'side-projects.link',
  description: 'Showcase your side-projects to the whole world.',
}

const cx = (...classes: string[]) => classes.filter(Boolean).join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={cx(
      "text-black bg-white dark:text-white dark:bg-[#111010]",
      GeistSans.variable,
      GeistMono.variable)}>
      <body className="p-4">
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
