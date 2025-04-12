'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade } from 'swiper/modules'
import Image from 'next/image'
import fullImage from '@/public/building.jpg'

// Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade'

export default function LandingSwiper() {
	const images = [
		fullImage,
		fullImage,
		fullImage,
		fullImage,
		fullImage,
		fullImage,
		fullImage,
		fullImage,
	]

	return (
		<div className='w-full h-100'>
			<Swiper
				modules={[Autoplay, EffectFade]}
				spaceBetween={30}
				slidesPerView={4}
				loop={true}
				speed={16000}
				autoplay={{
					delay: 0,
					disableOnInteraction: false,
					pauseOnMouseEnter: true,
				}}
				className='w-full h-full'
			>
				{images.map((image, index) => (
					<SwiperSlide key={index} className='relative w-full h-full'>
						<Image
							src={image}
							alt={`Slide ${index + 1}`}
							fill
							className='object-cover'
							priority={index === 0}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
