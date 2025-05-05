'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Dashboard = () => {
	const { id } = useParams()
	const router = useRouter()

	const [data, setData] = useState<any>()
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/api/contact/${id}`)
			const data = await response.json()
			setData(data.data)
			console.log(data)
		}
		fetchData()
	}, [])

	if (!data) return <div>로딩중...</div>

	return (
		<>
			<div className='max-w-2xl mx-auto p-6 bg-white shadow rounded-2xl space-y-6'>
				<div className='flex'>
					<div className='w-32 font-semibold text-gray-600'>제목</div>
					<div className='flex-1 text-gray-900'>{data.title}</div>
				</div>

				<div className='flex'>
					<div className='w-32 font-semibold text-gray-600'>이메일</div>
					<div className='flex-1 text-gray-900'>{data.email}</div>
				</div>

				<div className='flex'>
					<div className='w-32 font-semibold text-gray-600'>이름</div>
					<div className='flex-1 text-gray-900'>{data.name}</div>
				</div>

				<div className='flex'>
					<div className='w-32 font-semibold text-gray-600'>문의내용</div>
					<div className='flex-1 text-gray-900 whitespace-pre-line'>
						{data.content}
					</div>
				</div>

				<div className='flex'>
					<div className='w-32 font-semibold text-gray-600'>파일</div>
					<div className='flex-1 text-gray-900 whitespace-pre-line'>
						{data.imageUrl && (
							<div className='relative group'>
								<Image
									src={data.imageUrl}
									alt='문의 이미지'
									width={100}
									height={100}
									className='cursor-pointer hover:opacity-80 transition-opacity'
									onClick={async () => {
										try {
											// 파일명 추출 (URL에서 마지막 부분)
											const fileName = data.imageUrl.split('/').pop() || 'image'

											// 이미지 데이터 가져오기
											const response = await fetch(data.imageUrl)
											const blob = await response.blob()

											// Blob URL 생성
											const blobUrl = window.URL.createObjectURL(blob)

											// 다운로드 링크 생성
											const link = document.createElement('a')
											link.href = blobUrl
											link.download = fileName
											document.body.appendChild(link)
											link.click()

											// 정리
											document.body.removeChild(link)
											window.URL.revokeObjectURL(blobUrl)
										} catch (error) {
											console.error('이미지 다운로드 실패:', error)
											alert('이미지 다운로드에 실패했습니다.')
										}
									}}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			<button
				onClick={() => router.back()}
				className='mb-4 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer flex items-center'
			>
				<svg
					className='w-4 h-4 mr-2'
					fill='none'
					stroke='currentColor'
					viewBox='0 0 24 24'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M10 19l-7-7m0 0l7-7m-7 7h18'
					/>
				</svg>
				뒤로가기
			</button>
		</>
	)
}

export default Dashboard
