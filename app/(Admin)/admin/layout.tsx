'use client'

import '@/app/globals.css'
import { Noto_Sans_KR } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RiSettings4Line } from 'react-icons/ri'
import { MdOutlineQuestionAnswer } from 'react-icons/md'
import { IoNewspaperOutline } from 'react-icons/io5'

const notoSansKR = Noto_Sans_KR({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
})

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const pathname = usePathname()

	const isActivePath = (path: string) => {
		return pathname === path
			? 'bg-gray-100 text-blue-600'
			: 'text-gray-600 hover:bg-gray-50'
	}

	return (
		<html lang='ko'>
			<body className={`${notoSansKR.className} antialiased`}>
				<div className='flex min-h-screen bg-gray-100'>
					<aside className='w-64 min-h-screen bg-white shadow-xl border-r'>
						<div className='p-6 border-b'>
							<h2 className='text-xl font-bold text-gray-800'>관리자 페이지</h2>
						</div>
						<nav className='p-4'>
							<ul className='space-y-2'>
								<li>
									<Link
										href='/admin/question'
										className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActivePath(
											'/admin/question'
										)}`}
									>
										<MdOutlineQuestionAnswer className='text-xl' />
										<span className='font-medium'>문의사항</span>
									</Link>
								</li>
								<li>
									<Link
										href='/admin/mainperformance'
										className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActivePath(
											'/admin/mainperformance'
										)}`}
									>
										<IoNewspaperOutline className='text-xl' />
										<span className='font-medium'>주요실적</span>
									</Link>
								</li>
							</ul>
						</nav>
					</aside>
					<main className='flex-1 p-6'>{children}</main>
				</div>
			</body>
		</html>
	)
}
