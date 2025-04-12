'use client'

import { motion } from 'framer-motion'

interface TextRevealProps {
	text: string
	delayPerChar?: number
	onComplete?: () => void
}

export const TextReveal = ({
	text,
	delayPerChar = 0.05,
	onComplete,
}: TextRevealProps) => {
	return (
		<div className='inline-block overflow-hidden whitespace-pre-wrap'>
			{text.split('').map((char, index) => {
				if (char === '\n') {
					return <br key={index} />
				}
				return (
					<motion.span
						key={index}
						initial={{ y: -20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{
							delay: index * delayPerChar,
							duration: 1,
							ease: 'easeOut',
						}}
						className='inline-block'
						onAnimationComplete={
							index === text.split('').length - 1 ? onComplete : undefined
						}
					>
						{char === ' ' ? '\u00A0' : char}
					</motion.span>
				)
			})}
		</div>
	)
}
