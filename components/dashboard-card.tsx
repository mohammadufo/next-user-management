import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Box,
} from '@mui/material'
import { TrendingUp, TrendingDown } from '@mui/icons-material'

interface DashboardCardProps {
  title: string
  category: string
  value: number
  change: number
  description: string
  image: string
  color: string
  trend: 'up' | 'down'
}

export function DashboardCard({
  title,
  category,
  value,
  change,
  description,
  image,
  trend,
}: DashboardCardProps) {
  const isPositive = change > 0

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="160"
          image={image || '/placeholder.svg'}
          alt={title}
        />
        <Chip
          label={category}
          size="small"
          color="primary"
          sx={{ position: 'absolute', top: 8, right: 8 }}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Typography variant="h4" component="div">
          {value.toLocaleString()}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
          {trend === 'up' ? (
            <TrendingUp color={isPositive ? 'success' : 'error'} />
          ) : (
            <TrendingDown color={isPositive ? 'success' : 'error'} />
          )}
          <Typography
            variant="body2"
            color={isPositive ? 'success.main' : 'error.main'}
          >
            {isPositive ? '+' : ''}
            {change}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}
