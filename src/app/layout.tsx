import React from 'react'
import './globals.css'
import { Inter, Merriweather } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
})

export const metadata = {
  title: 'Shivam\'s World',
  description: 'A collection of essays and writings by Shivam',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body className="min-h-screen bg-white">
        <header className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-serif font-bold">
              <a href="/" className="text-gray-900 hover:text-gray-700">
                Shivam's World
              </a>
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        <footer className="border-t border-gray-200 mt-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Shivam's World. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
} 