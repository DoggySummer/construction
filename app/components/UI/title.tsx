import { motion } from 'framer-motion'

interface TitleProps {
	title: string
}

export default function Title({ title }: TitleProps) {
	return (
		<div className='relative py-20 text-center mt-40'>
			<h1 className='text-5xl font-bold tracking-tight'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<span className='relative inline-block'>{title}</span>
				</motion.div>
			</h1>
			<div className='absolute left-1/2 -translate-x-1/2 bottom-12 w-20 h-[2px] bg-gray-200'></div>
		</div>
	)
}
