'use client'

import { useQuery } from '@tanstack/react-query'
import { DashboardCard } from '@/components/dashboard-card'
import { Navbar } from '@/components/navbar'
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Alert,
  AlertTitle,
  Skeleton,
} from '@mui/material'
import { Refresh, ErrorOutline } from '@mui/icons-material'
import { useUserStore } from '@/store/user-store'

interface DashboardData {
  cards: {
    id: number
    title: string
    category: string
    value: number
    change: number
    description: string
    image: string
    color: string
    trend: 'up' | 'down'
  }[]
  role: string
}

interface UserData {
  id: string
  name: string
  email: string
  username: string
  role: string
}

export default function DashboardPage() {
  const setUser = useUserStore((state) => state.setUser)

  const { data: userData, isLoading: isUserLoading } = useQuery<UserData>({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/dashboard/user')
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      const data = await response.json()
      setUser(data)
      return data
    },
    staleTime: 60000,
  })

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<DashboardData>({
      queryKey: ['dashboard-cards'],
      queryFn: async () => {
        const response = await fetch('/api/dashboard/cards')

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized')
          }
          throw new Error('Failed to fetch cards')
        }

        return response.json()
      },
      retry: 1,
      staleTime: 30000,
    })

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {userData && <Navbar user={userData} />}

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Dashboard Overview
          </Typography>
          {data && (
            <Typography variant="body2" color="text.secondary">
              Showing {data.cards.length} cards for {data.role} role
            </Typography>
          )}
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => refetch()}
            disabled={isFetching}
            sx={{ mt: 2 }}
          >
            Refresh
          </Button>
        </Box>

        {(isLoading || isUserLoading) && (
          <Grid container spacing={3}>
            {[...Array(5)].map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={i}>
                <Skeleton variant="rectangular" height={300} />
              </Grid>
            ))}
          </Grid>
        )}

        {isError && (
          <Alert severity="error" icon={<ErrorOutline />}>
            <AlertTitle>Error</AlertTitle>
            <Typography>
              {error instanceof Error && error.message === 'Unauthorized'
                ? 'Your session has expired. Please log in again.'
                : 'Failed to load dashboard data. Please check your connection and try again.'}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => refetch()}
              sx={{ mt: 1 }}
            >
              Retry
            </Button>
          </Alert>
        )}

        {data && data.cards.length === 0 && (
          <Alert severity="info">
            <AlertTitle>No Cards Found</AlertTitle>
            There are no cards to display at the moment.
          </Alert>
        )}

        {data && data.cards.length > 0 && (
          <Grid container spacing={3}>
            {data.cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.id}>
                <DashboardCard
                  title={card.title}
                  category={card.category}
                  value={card.value}
                  change={card.change}
                  description={card.description}
                  image={card.image}
                  color={card.color}
                  trend={card.trend}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}
