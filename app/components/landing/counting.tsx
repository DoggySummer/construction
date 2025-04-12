'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

type CountingProps = {
	title: string
	detail: string
	count: number
}

const Counting = ({ title, detail, count }: CountingProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })
	const [currentCount, setCurrentCount] = useState(0)

	useEffect(() => {
		if (isInView) {
			const duration = 2000
			const steps = 60
			const stepDuration = duration / steps
			let currentStep = 0

			const timer = setInterval(() => {
				currentStep++
				const progress = 1 - Math.pow(1 - currentStep / steps, 2)
				setCurrentCount(Math.round(count * progress))

				if (currentStep >= steps) {
					setCurrentCount(count)
					clearInterval(timer)
				}
			}, stepDuration)

			return () => clearInterval(timer)
		}
	}, [isInView, count])

	return (
		<div ref={ref}>
			<motion.div
				className='text-5xl mb-5'
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5 }}
			>
				{currentCount}
			</motion.div>
			<motion.div
				className='text-xl font-semibold mb-2'
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: 0.2 }}
			>
				{title}
			</motion.div>
			<motion.div
				className='whitespace-pre-line'
				initial={{ opacity: 0, y: 20 }}
				animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				{detail}
			</motion.div>
		</div>
	)
}

export default Counting
