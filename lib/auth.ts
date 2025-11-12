import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { verifyToken } from './jwt'

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  return await verifyToken(token)
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    return null
  }

  return session
}

export async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return null
  }

  return await verifyToken(token)
}
