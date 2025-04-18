'use client'

import Image from 'next/image'
import mobileImage from '@/public/myimage.avif'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { TextReveal } from './typingAnimation'
const Landing = () => {
	return (
		<>
			<div className='block lg:hidden'>
				<LandingMobile />
			</div>
			<div className='hidden lg:block'>
				<LandingPC />
			</div>
		</>
	)
}

const LandingPC = () => {
	const title = `당신의 믿을만한 파트너\n신의건설`
	const detail = `친환경 건설 솔루션으로 미래를 설계합니다.\n철저한 현장 관리와 기술력으로 안전을 최우선합니다.\n고객과의 신뢰를 바탕으로 최고의 결과를 만듭니다.`
	const [isTypingDone, setIsTypingDone] = useState(false)
	return (
		<div className='h-screen bg-black text-white pr-10 pl-30 pt-10'>
			<div className='flex justify-between items-center h-full pb-20'>
				<div className='pr-6'>
					<div className='text-5xl whitespace-pre-line font-semibold leading-normal'>
						<TextReveal text={title} onComplete={() => setIsTypingDone(true)} />
					</div>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={
							isTypingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{/* detail 내용 */}
						<div className='mt-10 whitespace-pre-line leading-normal text-2xl'>
							{detail}
						</div>
					</motion.div>
				</div>
				<div className=' relative inset-0 w-1/2 h-full '>
					<div className='absolute inset-0 bg-gradient-to-b from-black/50 to-transparent' />
					<Image
						src={mobileImage}
						width={1000}
						height={1000}
						alt='building'
						className='w-full rounded-lg h-full object-cover'
					/>
				</div>
			</div>
		</div>
	)
}

const LandingMobile = () => {
	const title = `당신의 믿을만한 파트너\n신의건설`
	const detail = `친환경 건설 솔루션으로 미래를 설계합니다.\n철저한 현장 관리와 기술력으로 안전을 최우선합니다.\n고객과의 신뢰를 바탕으로 최고의 결과를 만듭니다.`
	const [isTypingDone, setIsTypingDone] = useState(false)

	return (
		<div className='h-screen bg-black'>
			<div className='relative w-full h-full'>
				<Image
					src={mobileImage}
					alt='building'
					width={1920}
					height={1080}
					quality={100}
					priority
					className='w-full h-full object-cover px-5 pt-6 rounded-lg'
				/>
				<div className='absolute inset-0 bg-black/50 mx-5 mt-6' />
				<div className='absolute bottom-20 left-2 right-0 p-5'>
					<div className='text-3xl text-white whitespace-pre-line font-semibold leading-normal'>
						<TextReveal text={title} onComplete={() => setIsTypingDone(true)} />
					</div>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={
							isTypingDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
						}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						{/* detail 내용 */}
						<div className='mt-2 text-white whitespace-pre-line leading-normal text-base mb-10'>
							{detail}
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	)
}

export default Landing
