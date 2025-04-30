'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import logo from '@/public/logo-nobg.png'
import { submenu } from '@/app/constants/constants'

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [subMenuOpen, setSubMenuOpen] = useState(false)

	const pathname = usePathname()
	const navbarStyle =
		pathname === '/' && !subMenuOpen ? 'bg-transparent ' : 'bg-white '
	const linkClassname =
		'font-medium px-2 mx-4 relative w-40 text-center pb-10 hover:text-[#095693] transition-colors duration-300 after:absolute after:bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-[#095693] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center'

	return (
		<div
			className={`absolute top-0 left-0 w-full lg:pl-10 pl-10 pr-20 pt-14 z-30 flex justify-between items-center transition-[background-color] duration-300 ${navbarStyle} ${
				pathname === '/' && !subMenuOpen ? 'text-white' : 'text-black'
			}`}
		>
			<Link
				href='/'
				className='text-3xl font-medium cursor-pointer flex items-center gap-1 pb-10'
			>
				<Image src={logo} width={36} height={36} alt='logo' />
				<div
					className={`w-[3px] ml-2 h-6 ${
						pathname === '/' && !subMenuOpen ? 'bg-white' : 'bg-black'
					}`}
				/>
				주
				<div
					className={`w-[3px] h-6 mr-1 ${
						pathname === '/' && !subMenuOpen ? 'bg-white' : 'bg-black'
					}`}
				/>
				신의환경
			</Link>

			{/* 데스크톱 메뉴 */}
			<div className='hidden lg:flex text-xl items-center'>
				<Link
					href='/corpinfo/1'
					className={linkClassname}
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					회사 소개
				</Link>
				<Link
					href='/newtech/1'
					className={linkClassname}
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					신기술소개
				</Link>
				<Link
					href='/businessfield/1'
					className={linkClassname}
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					사업분야
				</Link>
				<Link
					href='/mainperformance/1'
					className={linkClassname}
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					주요실적
				</Link>
				<Link
					href='/community/1'
					className={linkClassname}
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					커뮤니티
				</Link>
				<div
					onMouseEnter={() => setSubMenuOpen(true)}
					onMouseLeave={() => setSubMenuOpen(false)}
				>
					{subMenuOpen && <SubMenu />}
				</div>
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
	return (
		<motion.div
			initial={{ height: 0, opacity: 0 }}
			animate={{ height: '260px', opacity: 1 }}
			exit={{ height: 0, opacity: 0 }}
			transition={{ duration: 0.1 }}
			className='absolute top-30 left-0 w-full bg-white pr-20 flex justify-end transition-all overflow-hidden border-t border-t-gray-300'
		>
			{submenu.map((menu, i) => (
				<div
					className='text-center text-black w-40 mx-4 flex flex-col items-center'
					key={i}
				>
					{menu.map((item, i) => (
						<Link
							className='text-center text-base text-black w-fit mx-4 py-2 cursor-pointer hover:text-[#095693] transition-colors duration-300'
							key={i}
							href={item.navLink}
						>
							{item.title}
						</Link>
					))}
				</div>
			))}
		</motion.div>
	)
}
