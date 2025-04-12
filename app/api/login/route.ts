import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// 타입 정의
interface LoginRequest {
	username: string
	password: string
}

// JWT 토큰 생성 함수
const generateToken = (username: string) => {
	const payload = {
		username,
		iat: Math.floor(Date.now() / 1000), // 발행 시간
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7일 후 만료
	}

	return jwt.sign(
		payload,
		process.env.JWT_SECRET!, // 환경 변수에서 시크릿 키 가져오기
		{ algorithm: 'HS256' }
	)
}

export async function POST(request: NextRequest) {
	try {
		// 1. 요청 데이터 파싱
		const body: LoginRequest = await request.json()
		const { username, password } = body

		// 2. 유효성 검사
		if (!username || !password) {
			return NextResponse.json(
				{ message: '아이디와 비밀번호를 모두 입력해주세요.' },
				{ status: 400 }
			)
		}

		// 3. 사용자 인증
		if (
			username === process.env.NEXT_PUBLIC_ADMIN_NAME &&
			password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
		) {
			// 4. 세션 또는 토큰 생성
			const token = generateToken(username)

			// 5. 쿠키 설정
			const cookieStore = await cookies()
			cookieStore.set('auth-token', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7, // 7일
				path: '/',
			})

			return NextResponse.json(
				{
					message: '로그인 성공',
					user: {
						username,
						role: 'admin',
					},
				},
				{ status: 200 }
			)
		}

		// 6. 인증 실패
		return NextResponse.json(
			{ message: '아이디 또는 비밀번호가 잘못되었습니다.' },
			{ status: 401 }
		)
	} catch (error) {
		// 7. 에러 처리
		console.error('Login error:', error)
		return NextResponse.json(
			{ message: '서버 오류가 발생했습니다.' },
			{ status: 500 }
		)
	}
}

// 로그인 상태 확인 API
export async function GET(request: NextRequest) {
	try {
		const cookieStore = await cookies()
		const token = cookieStore.get('auth-token')

		if (!token) {
			return NextResponse.json(
				{ message: '로그인이 필요합니다.' },
				{ status: 401 }
			)
		}

		return NextResponse.json({ message: '유효한 세션입니다.' }, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{ message: '서버 오류가 발생했습니다.' },
			{ status: 500 }
		)
	}
}
