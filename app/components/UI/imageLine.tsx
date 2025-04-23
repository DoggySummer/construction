import { StaticImageData } from 'next/image'
import Image from 'next/image'
import { motion } from 'framer-motion'

type ImageLineProps = {
	title: string
	subTitle: string
	image: StaticImageData
}

const ImageLine = ({ title, image }: ImageLineProps) => {
	return (
		<div className='w-full mt-30 h-[200px] relative'>
			<motion.div
				initial={{ y: -50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className='text-3xl text-white flex items-center justify-center absolute inset-0 z-[1]'
			>
				{title}
			</motion.div>
			<Image
				src={image}
				alt='image line'
				fill
				className='object-cover absolute inset-0'
			/>
			<div className='absolute inset-0 bg-black/50' />
		</div>
	)
}

export default ImageLine
