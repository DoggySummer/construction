'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import Image from 'next/image'
import Title from '../UI/title'

// Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import { useEffect, useState } from 'react'
import { Performance } from '@/app/constants/type'
import { formatDate } from '@/app/constants/utils'
import { useRouter } from 'next/navigation'

export default function LandingSwiper() {
	return (
		<div className='w-full h-auto'>
			<Title title={'주요실적'} />
			<>
				<div className='block lg:hidden'>
					<LandingSwiperMobile />
				</div>
				<div className='hidden lg:block'>
					<LandingSwiperPC />
				</div>
			</>
		</div>
	)
}

const LandingSwiperPC = () => {
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/performance?type=1')
			const data = await response.json()
			setData(data.items)
			console.log(data.items)
		}
		fetchData()
	}, [])
	const [data, setData] = useState<Performance[]>([])
	const router = useRouter()
	return (
		<Swiper
			modules={[Autoplay, EffectFade, Navigation]}
			spaceBetween={30}
			slidesPerView={2}
			loop={true}
			speed={1000}
			navigation={true}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			className='contentSize relative group'
		>
			{data.map((item, index) => (
				<SwiperSlide
					key={index}
					className='flex flex-col w-full mb-10 cursor-pointer'
					onClick={() => router.push(`/mainperformance/1/${item.id}`)}
				>
					<div className='relative w-full aspect-[4/3] overflow-hidden'>
						<Image
							src={item.mainPhoto}
							alt={`Slide ${index + 1}`}
							fill
							className='object-cover rounded-lg h-60 hover:scale-120 transition-all duration-300 '
							priority={index === 0}
						/>
					</div>
					<div className='text-2xl text-center font-bold mt-4 px-2'>
						{item.title}
					</div>
					<div className='text-base text-center mt-2 px-2'>
						{formatDate(item.constructionStartDate) +
							' ~ ' +
							formatDate(item.constructionEndDate)}
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}

const LandingSwiperMobile = () => {
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/performance?type=1')
			const data = await response.json()
			setData(data.items)
			console.log(data.items)
		}
		fetchData()
	}, [])
	const [data, setData] = useState<Performance[]>([])
	const router = useRouter()
	return (
		<Swiper
			modules={[Autoplay, EffectFade, Navigation]}
			spaceBetween={30}
			slidesPerView={1}
			loop={true}
			speed={1000}
			navigation={true}
			autoplay={{
				delay: 3000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			className='contentSize relative group'
		>
			{data.map((item, index) => (
				<SwiperSlide
					key={index}
					className='flex flex-col w-full mb-10 cursor-pointer'
					onClick={() => router.push(`/mainperformance/1/${item.id}`)}
				>
					<div className='relative w-[calc(100%-24px)] mx-auto aspect-[4/3] overflow-hidden'>
						<Image
							src={item.mainPhoto}
							alt={`Slide ${index + 1}`}
							fill
							className='object-cover rounded-lg h-60 hover:scale-120 transition-all duration-300 '
							priority={index === 0}
						/>
					</div>
					<div className='text-2xl text-center font-bold mt-4 px-2'>
						{item.title}
					</div>
					<div className='text-base text-center mt-2 px-2'>
						{formatDate(item.constructionStartDate) +
							' ~ ' +
							formatDate(item.constructionEndDate)}
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	)
}
