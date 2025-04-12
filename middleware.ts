import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

	// 예: 쿠키로 로그인 확인
	const token = request.cookies.get('auth-token')?.value
	if (isAdminRoute && !token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}
