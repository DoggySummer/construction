'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams, useRouter } from 'next/navigation'
import suitImage from '@/public/suit.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { mainPerformance } from '@/app/constants/constants'
import { usePerformanceStore } from '@/app/constants/store'
import Image from 'next/image'
import { Performance } from '@/app/constants/type'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PerformanceDetailPage = () => {
	const router = useRouter()
	const params = useParams()
	const tabItems = mainPerformance
	const { performances } = usePerformanceStore()
	const performance: Performance = performances.find(
		(performance) => performance.id === params.detail
	) as Performance
	console.log(performance)

	const [selectedImage, setSelectedImage] = useState<string>(
		performance.mainPhoto
	)

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
			2,
			'0'
		)}.${String(date.getDate()).padStart(2, '0')}`
	}

	const formatPrice = (price: string) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}

	const constructionDate = `${formatDate(
		performance.constructionStartDate
	)} ~ ${formatDate(performance.constructionEndDate)}`

	return (
		<div>
			<ImageLine image={suitImage} title='주요실적' />
			<TabMenu items={tabItems} />
			<div className='contentSize mt-20'>
				<div className='text-3xl font-bold flex justify-center mb-10'>
					{performance.title}
				</div>
				<div className='lg:flex-row flex-col items-start pl-3 flex lg:items-center my-4 justify-around mb-10'>
					<SubTitle title='공사기간' content={constructionDate} />
					<SubTitle title='원도급' content={performance.primeContractor} />
					<SubTitle title='발주자' content={performance.clientName} />
					<SubTitle
						title='계약금액'
						content={formatPrice(performance.contractAmount)}
					/>
				</div>
				<PerformanceDetailImage image={selectedImage} />
				<div className='flex gap-8 items-center mb-10 overflow-x-scroll'>
					{performance.mainPhoto && (
						<Image
							src={performance.mainPhoto}
							alt='mainPhoto'
							width={1000}
							height={1000}
							className={`w-50 h-30 cursor-pointer object-cover ${
								selectedImage === performance.mainPhoto
									? 'border-4 border-primary'
									: ''
							}`}
							onClick={() => setSelectedImage(performance.mainPhoto)}
						/>
					)}
					{performance.subPhoto1 && (
						<Image
							src={performance.subPhoto1}
							alt='subPhoto1'
							width={1000}
							height={1000}
							className={`w-50 h-30 cursor-pointer object-cover ${
								selectedImage === performance.subPhoto1
									? 'border-4 border-primary'
									: ''
							}`}
							onClick={() =>
								performance.subPhoto1 && setSelectedImage(performance.subPhoto1)
							}
						/>
					)}
					{performance.subPhoto2 && (
						<Image
							src={performance.subPhoto2}
							alt='subPhoto2'
							width={1000}
							height={1000}
							className={`w-50 h-30 cursor-pointer object-cover ${
								selectedImage === performance.subPhoto2
									? 'border-4 border-primary'
									: ''
							}`}
							onClick={() =>
								performance.subPhoto2 && setSelectedImage(performance.subPhoto2)
							}
						/>
					)}
					{performance.subPhoto3 && (
						<Image
							src={performance.subPhoto3}
							alt='subPhoto3'
							width={1000}
							height={1000}
							className={`w-50 h-30  cursor-pointer object-cover ${
								selectedImage === performance.subPhoto3
									? 'border-4 border-primary'
									: ''
							}`}
							onClick={() =>
								performance.subPhoto3 && setSelectedImage(performance.subPhoto3)
							}
						/>
					)}
					{performance.subPhoto4 && (
						<Image
							src={performance.subPhoto4}
							alt='subPhoto4'
							width={1000}
							height={1000}
							className={`w-50 h-30 cursor-pointer object-cover ${
								selectedImage === performance.subPhoto4
									? 'border-4 border-primary'
									: ''
							}`}
							onClick={() =>
								performance.subPhoto4 && setSelectedImage(performance.subPhoto4)
							}
						/>
					)}
				</div>
				<button
					className='bg-primary mb-10 text-white px-10 py-2 rounded-md mx-auto block cursor-pointer'
					onClick={() => router.back()}
				>
					목록
				</button>
			</div>
		</div>
	)
}
export default PerformanceDetailPage

const SubTitle = ({ title, content }: { title: string; content: string }) => {
	return (
		<div className='flex items-center gap-6'>
			<div className='text-lg font-semibold w-20 lg:w-auto'>{title}</div>
			<div className='w-[2px] h-3 bg-gray-600' />
			<div className='text-lg '>{content}</div>
		</div>
	)
}

const PerformanceDetailImage = ({ image }: { image: string }) => {
	return (
		<div className='contentSize mb-10'>
			<AnimatePresence mode='wait'>
				<motion.div
					key={image}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				>
					<Image
						src={image}
						alt='mainPhoto'
						width={2000}
						height={2000}
						className='object-cover lg:w-full h-50 lg:h-200 w-[calc(100%-12px)] mx-auto'
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
