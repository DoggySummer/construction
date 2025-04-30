import Image from 'next/image'
import Title from '../UI/title'
import ideologyImg1 from '@/public/ideology_1.jpg'
import ideologyImg2 from '@/public/ideology_2.jpg'
import ideologyImg3 from '@/public/ideology_3.png'
import { StaticImageData } from 'next/image'
import { motion } from 'framer-motion'

const Ideology = () => {
	const slogan =
		'"안전과 신뢰를 바탕으로, 혁신적인 기술로 지속 가능한 미래를 창조한다."'
	return (
		<div>
			<Title title='경영 이념' />
			<div className='text-center text-2xl font-bold mb-10'>{slogan}</div>
			<div className='text-center text-xl font-bold'>
				해체는 끝이 아니라, 새로운 시작의 기술입니다
			</div>
			<div className='text-center text-xl font-bold'>
				신의환경은 모든 해체 작업에
			</div>
			<div className='text-center text-xl font-bold mb-10'>
				정밀함, 안전성, 환경보호, 그리고 신뢰를 담습니다.
			</div>
			<div className='flex items-center gap-10 mx-auto justify-center mb-10'>
				<IdeologyItem
					title='신뢰'
					title2='Trust'
					imageSrc={ideologyImg1}
					delay={0}
				/>
				<IdeologyItem
					title='안전'
					title2='Safety'
					imageSrc={ideologyImg2}
					delay={0.2}
				/>
				<IdeologyItem
					title='환경'
					title2='Eco-friendly'
					imageSrc={ideologyImg3}
					delay={0.4}
				/>
			</div>
		</div>
	)
}

type IdeologyItemProps = {
	title: string
	title2: string
	imageSrc: StaticImageData
	delay?: number
}

const IdeologyItem = ({
	title,
	title2,
	imageSrc,
	delay = 0,
}: IdeologyItemProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: -100 }}
			whileInView={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.5, delay }}
			viewport={{ once: true }}
			className='flex flex-col items-center gap-2 text-white relative'
		>
			<div className='relative w-44 h-44'>
				<Image
					src={imageSrc}
					alt='이념사진'
					width={1280}
					height={800}
					className='rounded-full object-cover w-full h-full'
				/>
				<div className='absolute inset-0 flex flex-col items-center justify-center bg-black/50 rounded-full'>
					<div className='text-2xl font-bold mb-1'>{title}</div>
					<div className='text-xl'>{title2}</div>
				</div>
			</div>
		</motion.div>
	)
}

export default Ideology
