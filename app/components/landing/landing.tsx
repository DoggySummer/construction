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
	const [isTypingDone, setIsTypingDone] = useState(false)
	return (
		<div className='h-screen'>
			<video
				autoPlay
				muted
				loop
				playsInline
				className='w-full h-full object-cover absolute top-0 left-0'
			>
				<source src='/main-video.mp4' type='video/mp4' />
				Your browser does not support the video tag.
			</video>
			<div className='absolute top-0 left-0 w-full h-full bg-black/70'></div>
			<div className='absolute top-1/3 left-10 text-white'>
				<h1 className='text-4xl font-extrabold pb-10'>We Create Safety</h1>
				<h1 className='text-4xl font-normal pb-10'>
					신뢰를 바탕으로, 안전을 약속하는 기업
				</h1>
				<h1 className='text-4xl font-normal'>(주)신의환경</h1>
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
