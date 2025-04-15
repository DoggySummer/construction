'use client'

import Landing from '@/app/components/landing/landing'
import LandingAbout from '@/app/components/landing/landingAbout'
import LandingSwiper from '@/app/components/landing/landingSwiper'
import Counting from '@/app/components/landing/counting'
export default function Home() {
	return (
		<>
			<Landing />
			<LandingAbout />
			<LandingSwiper />
			<div className='flex flex-wrap defaultWidth mt-40 gap-30 mb-50'>
				<Counting
					title='Years experience'
					count={10}
					detail={`Improving homes with expert\ncraftsmanship for years`}
				/>
				<Counting
					title='Projects completed'
					count={30}
					detail={`Improving homes with expert\ncraftsmanship for years`}
				/>
				<Counting
					title='Years experience'
					count={40}
					detail={`Improving homes with expert\ncraftsmanship for years`}
				/>
				<Counting
					title='Years experience'
					count={60}
					detail={`Improving homes with expert\ncraftsmanship for years`}
				/>
			</div>
		</>
	)
}
