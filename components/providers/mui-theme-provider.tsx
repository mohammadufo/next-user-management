'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { type ReactNode, useMemo } from 'react'
import { useUserStore } from '@/store/user-store'

export function MUIThemeProvider({ children }: { children: ReactNode }) {
  const mode = useUserStore((state) => state.mode)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#2563eb' : '#3b82f6',
            light: '#60a5fa',
            dark: '#1e40af',
          },
          secondary: {
            main: mode === 'light' ? '#d97706' : '#f59e0b',
            light: '#fbbf24',
            dark: '#b45309',
          },
          background: {
            default: mode === 'light' ? '#f8fafc' : '#0f172a',
            paper: mode === 'light' ? '#ffffff' : '#1e293b',
          },
          text: {
            primary: mode === 'light' ? '#0f172a' : '#f1f5f9',
            secondary: mode === 'light' ? '#475569' : '#94a3b8',
          },
        },
        shape: {
          borderRadius: 8,
        },
        typography: {
          fontFamily: 'system-ui, -apple-system, sans-serif',
        },
      }),
    [mode]
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
