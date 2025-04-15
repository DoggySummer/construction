'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
const title = `home\nimprovement\nspecialists`
const detail = `신의환경은 믿을 수 있는 건설 파트너로서, 정직한 시공과 세심한 관리로 현장을 책임집니다.\n
수년간의 경험을 바탕으로 주거, 상업, 산업 현장 등 다양한 분야에서 전문성을 쌓아왔습니다.\n
고객의 요구를 정확히 파악하고, 최적의 솔루션으로 완성도 높은 결과를 제공합니다.\n
기초공사부터 마감까지 모든 과정에 정성을 다해 최고의 품질을 구현합니다.\n
명확한 커뮤니케이션과 체계적인 프로젝트 관리를 통해 신뢰를 쌓아갑니다.\n
신의환경과 함께라면, 더 나은 내일이 시작됩니다.`

const title2 = `home improvement specialists`

const detail2 = `신의환경은 믿을 수 있는 건설 파트너로서, 정직한 시공과 세심한 관리로 현장을 책임집니다.
수년간의 경험을 바탕으로 주거, 상업, 산업 현장 등 다양한 분야에서 전문성을 쌓아왔습니다.
고객의 요구를 정확히 파악하고, 최적의 솔루션으로 완성도 높은 결과를 제공합니다.
기초공사부터 마감까지 모든 과정에 정성을 다해 최고의 품질을 구현합니다.
명확한 커뮤니케이션과 체계적인 프로젝트 관리를 통해 신뢰를 쌓아갑니다.
신의환경과 함께라면, 더 나은 내일이 시작됩니다.`

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
		<div className='mt-40 defaultWidth flex justify-between items-center mb-30'>
			<div className='whitespace-pre-line text-3xl font-bold leading-normal'>
				{title}
			</div>
			<div className='whitespace-pre-line text-xl leading-4'>{detail}</div>
		</div>
	)
}

const LandingAboutMobile = () => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<div className='mt-10 defaultWidth mb-30'>
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: -20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				<div
					className='whitespace-pre-line text-3xl p-6 font-bold leading-normal 
				text-black'
				>
					{title2}
				</div>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
				transition={{ duration: 0.5, delay: 0.4 }}
				className='whitespace-pre-line text-base leading-7 text-gray-600
				space-y-4 p-6'
			>
				{detail2}
			</motion.div>
		</div>
	)
}

export default LandingAbout
