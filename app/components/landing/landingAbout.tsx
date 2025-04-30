'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Title from '../UI/title'
import Image from 'next/image'

import main1 from '@/public/shakehands.png'
import main2 from '@/public/main2.jpeg'
import main3 from '@/public/main3.png'
import ArrowBtn from '../UI/arrowBtn'
const LandingAbout = () => {
	return (
		<>
			<div className='block lg:hidden'>
				<LandingAboutMobile />
			</div>
			<div className='hidden lg:block'>
				<LandingAboutDesktop />
			</div>
		</>
	)
}

const LandingAboutDesktop = () => {
	return (
		<>
			<Title title={'주요사업'} />
			<div className='contentSize flex justify-between'>
				<div className='flex flex-col w-1/4 gap-4 mb-10'>
					<Image
						src={main1}
						alt='main1'
						width={1920}
						height={1080}
						className='rounded-lg aspect-square object-cover mb-2'
					/>
					<div className='text-2xl font-bold'>신기술 소개</div>
					<ArrowBtn content='확인하기' navLink='/newtech/1' />
				</div>
				<div className='flex flex-col w-1/4 gap-4 mb-10'>
					<Image
						src={main2}
						alt='main1'
						width={1920}
						height={1080}
						className='rounded-lg aspect-square object-cover mb-2'
					/>
					<div className='text-2xl font-bold'>사업분야</div>
					<ArrowBtn content='확인하기' navLink='/newtech/1' />
				</div>
				<div className='flex flex-col w-1/4 gap-4 mb-10'>
					<Image
						src={main3}
						alt='main1'
						width={1920}
						height={1080}
						className='rounded-lg aspect-square object-cover mb-2'
					/>
					<div className='text-2xl font-bold'>주요실적</div>
					<ArrowBtn content='확인하기' navLink='/newtech/1' />
				</div>
			</div>
		</>
	)
}

const LandingAboutMobile = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return <></>
}

export default LandingAbout
