'use client'

import Landing from '@/app/components/landing/landing'
import LandingAbout from '@/app/components/landing/landingAbout'
import LandingSwiper from '@/app/components/landing/landingSwiper'
export default function Home() {
	return (
		<>
			<Landing />
			<LandingAbout />
			<LandingSwiper />
		</>
	)
}
