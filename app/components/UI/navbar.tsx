'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '@/public/logo-nobg.png'

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [subMenuOpen, setSubMenuOpen] = useState(false)

	const pathname = usePathname()
	const navbarStyle =
		pathname === '/' && !subMenuOpen ? 'bg-transparent' : 'bg-white'
	const linkClassname = 'font-medium px-2 mx-4 relative w-40 text-center'

	return (
		<div
			className={`absolute top-0 left-0 w-full lg:pl-30 pl-10 pr-10 pb-10 pt-14 z-30 flex justify-between items-center text-white transition-all duration-300 ${navbarStyle}`}
		>
			<Link
				href='/'
				className='text-3xl font-medium cursor-pointer flex items-center gap-3'
			>
				<Image src={logo} width={36} height={36} alt='logo' /> |주|신의환경
			</Link>

			{/* 데스크톱 메뉴 */}
			<div className='hidden lg:flex text-xl items-center'>
				<Link
					href='/about'
					className={linkClassname}
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					회사 소개
				</Link>
				<Link href='/about' className={linkClassname}>
					사업분야
				</Link>
				<Link href='/dashboard' className={linkClassname}>
					주요실적
				</Link>
				<Link href='/location' className={linkClassname}>
					커뮤니티
				</Link>
				<Link href='/contact' className={linkClassname}>
					견적문의
				</Link>
				<SubMenu />
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
							className='fixed inset-0 bg-black/60 z-40 h-screen'
						/>

						{/* 슬라이드 메뉴 */}
						<motion.div
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'tween', duration: 0.3 }}
							className='fixed top-0 right-0 w-[300px] h-screen bg-black z-50 p-8'
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
									href='/location'
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

const SubMenu = () => {
	const corpInfo = [
		'CEO 인사말',
		'경영 이념',
		'회사 연혁',
		'조직도',
		'오시는 길',
	]
	const newTech = [
		'철거전용모듈비계',
		'지하해체특허공법',
		'기술연구소',
		'인증 및 특허',
		'수상실적',
	]
	const businessField = [
		'철거전용모듈비계',
		'구조물해체공사',
		'석면해체공사',
		'토공사',
		'장비임대',
		'해체계획서',
	]
	const mainPerformance = [
		'철거전용모듈비계',
		'구조물해체공사',
		'석면해체공사',
		'토공사',
	]
	const community = ['견적문의', '공법소개', '자료실']
	const submenu = [corpInfo, newTech, businessField, mainPerformance, community]

	return (
		<div className='absolute top-full left-0 w-full bg-white pr-10 flex justify-end'>
			{submenu.map((menu, i) => {
				return (
					<div
						className='text-center text-black w-40 mx-4 flex flex-col  items-center'
						key={i}
					>
						{menu.map((item, i) => {
							return (
								<div
									className='text-center text-base text-black w-fit mx-4 py-2 cursor-pointer hover:text-[#095693] transition-colors duration-300'
									key={i}
								>
									{item}
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
