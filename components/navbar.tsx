'use client'

import type React from 'react'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from '@mui/material'
import { Person, Logout, Brightness4, Brightness7 } from '@mui/icons-material'
import { useUserStore } from '@/store/user-store'

interface NavbarProps {
  user: {
    name: string
    email: string
    username: string
    role: string
  }
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { mode, toggleTheme } = useUserStore()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    handleClose()
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      queryClient.clear()
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      setIsLoggingOut(false)
    }
  }

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : user?.username?.slice(0, 2).toUpperCase() || 'U'

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>

        <IconButton onClick={toggleTheme} color="inherit">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>

        <IconButton onClick={handleMenu} color="inherit">
          <Avatar>{initials}</Avatar>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box sx={{ px: 2, py: 1 }}>
            <Typography variant="subtitle1">
              {user?.name || user?.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>

          <Divider />

          <MenuItem disabled>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Role" secondary={user?.role} />
          </MenuItem>

          <Divider />

          <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText>
              {isLoggingOut ? 'Logging out...' : 'Log out'}
            </ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}
