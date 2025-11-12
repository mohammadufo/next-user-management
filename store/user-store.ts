import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  username: string
  name: string
  email: string
  role: 'ADMIN' | 'OWNER'
}

interface UserState {
  user: User | null
  mode: 'light' | 'dark'
  setUser: (user: User | null) => void
  clearUser: () => void
  toggleTheme: () => void
  isAuthenticated: boolean
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      mode: 'light',
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      toggleTheme: () =>
        set((state) => ({ mode: state.mode === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'user-storage',
    }
  )
)
