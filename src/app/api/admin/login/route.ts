import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body = (await request.json()) as { password: string }
    const adminPassword = process.env.ADMIN_PASSWORD ?? 'noir_elite_admin'

    if (body.password !== adminPassword) {
      return NextResponse.json(
        { success: false, error: 'Senha incorreta' },
        { status: 401 },
      )
    }

    // Create a simple session token (hash of password + timestamp)
    const token = Buffer.from(`admin:${Date.now()}`).toString('base64')

    const cookieStore = await cookies()
    cookieStore.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { success: false, error: 'Login failed' },
      { status: 500 },
    )
  }
}
