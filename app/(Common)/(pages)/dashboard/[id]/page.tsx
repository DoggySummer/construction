'use client'

import Title from '@/app/components/UI/title'
import Image from 'next/image'
import Link from 'next/link'
import fullImage from '@/public/building.jpg'

const Page = () => {
	return (
		<div className='mx-auto lg:px-30 px-10 py-12'>
			<Title title='프로젝트' />

			{/* 이미지 */}
			<div className='relative h-[600px] w-full rounded-2xl overflow-hidden mb-8'>
				<Image
					src={fullImage}
					alt='프로젝트'
					fill
					className='object-cover'
					priority
				/>
			</div>

			{/* 내용 */}
			<div className='prose max-w-none mb-8'>
				<p className='text-gray-600 leading-relaxed'>
					프로젝트 설명이 들어갈 자리입니다. 이 프로젝트는...
				</p>
			</div>

			{/* 목록 버튼 */}
			<Link
				href='/dashboard'
				className='inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
			>
				목록으로
			</Link>
		</div>
	)
}

export default Page
