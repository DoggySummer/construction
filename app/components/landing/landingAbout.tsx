'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import Title from '../UI/title'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import main1 from '@/public/shakehands.png'
import main2 from '@/public/main2.jpeg'
import main3 from '@/public/main3.png'
import ArrowBtn from '../UI/arrowBtn'
const mainItems = [
	{
		image: main1,
		title: '신기술 소개',
		description: '신의환경의 신기술을 확인해보세요',
		link: '/newtech/1',
	},
	{
		image: main2,
		title: '사업분야',
		description: '신의환경의 사업분야를 확인해보세요',
		link: '/businessfield/1',
	},
	{
		image: main3,
		title: '주요실적',
		description: '신의환경의 주요실적을 확인해보세요',
		link: '/mainperformance/1',
	},
]
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
				{mainItems.map((item) => (
					<LandingPCPart key={item.title} item={item} />
				))}
			</div>
		</>
	)
}

const LandingPCPart = ({ item }: { item: (typeof mainItems)[0] }) => {
	const [isHover, setIsHover] = useState(false)
	const router = useRouter()
	return (
		<div
			className='flex flex-col w-[calc(33%-10px)] mb-10 cursor-pointer'
			onClick={() => router.push(item.link)}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<Image
				src={item.image}
				alt='main'
				width={1920}
				height={1080}
				className='rounded-lg aspect-square object-cover mb-2'
			/>
			<div className='text-2xl font-bold mt-6 mb-2'>{item.title}</div>
			<div className='text-base mb-6'>{item.description}</div>
			<ArrowBtn content='확인하기' navLink={item.link} isHover={isHover} />
		</div>
	)
}

const LandingAboutMobile = () => {
	const ref = useRef(null)
	const router = useRouter()
	return (
		<>
			<Title title={'주요사업'} />
			<div className='flex flex-col w-full p-4 justify-between'>
				{mainItems.map((item) => (
					<LandingMobilePart key={item.title} item={item} />
				))}
			</div>
		</>
	)
}

const LandingMobilePart = ({ item }: { item: (typeof mainItems)[0] }) => {
	const router = useRouter()
	const ref = useRef(null)
	const isInView = useInView(ref, {
		once: true,
		margin: '-300px 0px', // 위쪽에서 100px 더 내려왔을 때 인식
	})

	return (
		<motion.div
			ref={ref}
			initial={{ x: -100, opacity: 0 }}
			animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
			transition={{
				duration: 0.8,
				ease: 'easeOut',
			}}
			className='flex flex-col mb-10 p-4'
			onClick={() => router.push(item.link)}
		>
			<Image
				src={item.image}
				alt='main1'
				width={1920}
				height={1080}
				className='rounded-lg aspect-square object-cover mb-2 w-full'
			/>
			<div className='text-2xl font-bold'>{item.title}</div>
			<div className='text-base mt-2 mb-6'>{item.description}</div>
			<ArrowBtn content='확인하기' navLink={item.link} isHover={false} />
		</motion.div>
	)
}

export default LandingAbout
