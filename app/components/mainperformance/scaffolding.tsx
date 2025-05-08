'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Pagination from '../UI/pagination'
import Link from 'next/link'
import { Performance } from '@/app/constants/type'
import { usePerformanceStore } from '@/app/constants/store'
import { formatDate } from '@/app/constants/utils'
const Scaffolding = () => {
	const { performances, setPerformances } = usePerformanceStore()
	const [currentPage, setCurrentPage] = useState(1)
	const [totalPages, setTotalPages] = useState(1)

	const fetchData = async () => {
		try {
			const response = await fetch('/api/performance?type=1')
			const data = await response.json()
			console.log(data.items)
			setPerformances(data.items)
			setTotalPages(Math.ceil(data.items.length / 6))
		} catch (error) {
			console.error('데이터 로딩 실패:', error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 contentSize gap-8'>
				{performances
					.slice((currentPage - 1) * 6, currentPage * 6)
					.map((performance) => (
						<Link
							key={performance.id}
							href={`/mainperformance/1/${performance.id}`}
							className='bg-white overflow-hidden duration-300 cursor-pointer'
						>
							<div className='relative aspect-[4/3] overflow-hidden group rounded-xl'>
								<Image
									src={performance.mainPhoto}
									alt={performance.title}
									fill
									className='object-cover transition-transform duration-300 group-hover:scale-110'
								/>
							</div>
							<div className='p-4'>
								<h3 className='text-lg font-semibold text-gray-800 line-clamp-2 text-center break-keep'>
									{performance.title}
								</h3>
								<p className='text-sm text-gray-600 text-center mt-2'>
									{formatDate(performance.constructionStartDate)} ~{' '}
									{formatDate(performance.constructionEndDate)}
								</p>
							</div>
						</Link>
					))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	)
}

export default Scaffolding
