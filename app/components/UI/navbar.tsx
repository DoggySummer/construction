'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 0) {
				setIsScrolled(true)
			} else {
				setIsScrolled(false)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const navbarStyle =
		pathname === '/'
			? isScrolled
				? 'bg-black/80 backdrop-blur-sm'
				: 'bg-transparent'
			: 'bg-black/80 backdrop-blur-sm'
	const linkClassname =
		'font-semibold px-2 mx-4 relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-[3px] after:bg-white after:transition-all after:duration-300 hover:after:w-full'

	return (
		<div
			className={`fixed top-0 left-0 w-full pl-30 pr-10 pb-10 pt-14 z-30 flex justify-between items-center text-white transition-all duration-300 ${navbarStyle}`}
		>
			<Link href='/' className='text-2xl font-bold cursor-pointer'>
				신의환경 로고
			</Link>

			{/* 데스크톱 메뉴 */}
			<div className='hidden lg:flex text-xl items-center'>
				<Link href='/' className={linkClassname}>
					홈
				</Link>
				<Link href='/about' className={linkClassname}>
					회사 소개
				</Link>
				<Link href='/about' className={linkClassname}>
					사업실적
				</Link>
				<Link href='/dashboard' className={linkClassname}>
					자료실
				</Link>
				<Link href='/location' className={linkClassname}>
					오시는 길
				</Link>
				<Link href='/contact' className={linkClassname}>
					문의하기
				</Link>
			</div>

			{/* 모바일 햄버거 버튼 */}
			<button
				className='lg:hidden text-white p-2'
				onClick={() => setIsMenuOpen(true)}
			>
				<Menu size={28} />
			</button>

			{/* 모바일 슬라이드 메뉴 */}
			<AnimatePresence>
				{isMenuOpen && (
					<>
						{/* 배경 오버레이 */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={() => setIsMenuOpen(false)}
							className='fixed inset-0 bg-black/50 z-40'
						/>

						{/* 슬라이드 메뉴 */}
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'tween', duration: 0.3 }}
							className='fixed top-0 right-0 w-[300px] h-full bg-black/90 backdrop-blur-md z-50 p-8'
						>
							<button
								className='absolute top-6 right-6 text-white'
								onClick={() => setIsMenuOpen(false)}
							>
								<X size={28} />
							</button>

							<div className='flex flex-col space-y-8 mt-16'>
								<Link
									href='/'
									className='text-xl font-semibold text-white hover:text-gray-300 transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									회사 소개
								</Link>
								<Link
									href='/'
									className='text-xl font-semibold text-white hover:text-gray-300 transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									사업실적
								</Link>
								<Link
									href='/'
									className='text-xl font-semibold text-white hover:text-gray-300 transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									자료실
								</Link>
								<Link
									href='/'
									className='text-xl font-semibold text-white hover:text-gray-300 transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									오시는 길
								</Link>
								<Link
									href='/contact'
									className='text-xl font-semibold text-white hover:text-gray-300 transition-colors'
									onClick={() => setIsMenuOpen(false)}
								>
									문의하기
								</Link>
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	)
}
