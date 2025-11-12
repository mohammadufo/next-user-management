import type React from 'react'
import type { Metadata } from 'next'
import { QueryProvider } from '@/components/providers/query-provider'
import { MUIThemeProvider } from '@/components/providers/mui-theme-provider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Auth Dashboard',
  description: 'Authentication and Dashboard with role-based access',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <MUIThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </MUIThemeProvider>
      </body>
    </html>
  )
}
