import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'

const cardCategories = [
  { category: 'Revenue', color: 'blue' },
  { category: 'Users', color: 'green' },
  { category: 'Orders', color: 'purple' },
  { category: 'Products', color: 'orange' },
  { category: 'Analytics', color: 'pink' },
  { category: 'Traffic', color: 'cyan' },
  { category: 'Sales', color: 'emerald' },
  { category: 'Customers', color: 'violet' },
  { category: 'Inventory', color: 'amber' },
  { category: 'Growth', color: 'rose' },
]

const generateCards = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const categoryData = cardCategories[i % cardCategories.length]
    const value = Math.floor(Math.random() * 10000) + 1000
    const change = (Math.random() * 40 - 10).toFixed(1)

    return {
      id: i + 1,
      title: `${categoryData.category} Analytics`,
      category: categoryData.category,
      value: value,
      change: Number.parseFloat(change),
      description: `Track and monitor your ${categoryData.category.toLowerCase()} performance in real-time`,
      image: `https://picsum.photos/400/200?random=${i}`,
      color: categoryData.color,
      trend: Number.parseFloat(change) > 0 ? 'up' : 'down',
      lastUpdated: new Date().toISOString(),
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    const cardCount = session.role === 'owner' ? 10 : 5

    const cards = generateCards(cardCount)

    return NextResponse.json({
      cards,
      role: session.role,
    })
  } catch (error) {
    console.error('Cards API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
