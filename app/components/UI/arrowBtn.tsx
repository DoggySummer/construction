'use client'

type ArrowBtnProps = {
	content: string
	navLink: string
	isHover: boolean
}
import { FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const ArrowBtn = ({ content, navLink, isHover }: ArrowBtnProps) => {
	const router = useRouter()
	return (
		<motion.div
			className='text-primary font-semibold border-primary border-2 p-2 flex justify-between  items-center rounded-full cursor-pointer overflow-hidden w-[150px] h-13 relative'
			onClick={() => router.push(navLink)}
		>
			<span
				className={`z-10 ml-3 ${
					isHover ? 'text-white' : ''
				} transition-all duration-300`}
			>
				{content}
			</span>
			<div className='relative'>
				<motion.div
					animate={{
						scale: isHover ? 10 : 1,
					}}
					transition={{ duration: 0.3 }}
					className='p-4 rounded-full bg-primary flex items-center justify-center'
				></motion.div>
				<motion.div
					animate={{
						rotate: isHover ? 0 : -45,
					}}
					transition={{ duration: 0.3 }}
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
				>
					<FaArrowRight className='text-white text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
				</motion.div>
			</div>
		</motion.div>
	)
}

export default ArrowBtn
