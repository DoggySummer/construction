'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const Dashboard = () => {
	const [formData, setFormData] = useState({
		title: '',
		content: '',
	})
	const [selectedImage, setSelectedImage] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [status, setStatus] = useState('')

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedImage(file)
			setPreviewUrl(URL.createObjectURL(file))
		}
	}
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		console.log('submit')
	}
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/dashboard')
			const data = await response.json()
			console.log(data)
		}
		fetchData()
	}, [])

	return (
		<div className='max-w-3xl mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-6'>업로드 된 내용 수정</h1>

			<form onSubmit={handleSubmit} className='space-y-6'>
				{/* 제목 입력 */}
				<div>
					<label
						htmlFor='title'
						className='block text-sm font-medium text-gray-700 mb-2'
					>
						제목
					</label>
					<input
						type='text'
						id='title'
						name='title'
						value={formData.title}
						onChange={handleInputChange}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						required
					/>
				</div>

				{/* 내용 입력 */}
				<div>
					<label
						htmlFor='content'
						className='block text-sm font-medium text-gray-700 mb-2'
					>
						내용
					</label>
					<textarea
						id='content'
						name='content'
						value={formData.content}
						onChange={handleInputChange}
						rows={5}
						className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
						required
					/>
				</div>

				{/* 이미지 업로드 */}
				<div>
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						이미지
					</label>
					<div className='border-2 border-dashed border-gray-300 rounded-lg p-6'>
						<input
							type='file'
							accept='image/*'
							onChange={handleImageChange}
							className='hidden'
							id='imageInput'
						/>
						<label
							htmlFor='imageInput'
							className='cursor-pointer block text-center'
						>
							{previewUrl ? (
								<div className='relative w-full h-64'>
									<Image
										src={previewUrl}
										alt='Preview'
										fill
										className='object-contain'
									/>
								</div>
							) : (
								<div className='text-gray-500'>
									<p>클릭하여 이미지 선택</p>
									<p className='text-sm mt-2'>
										또는 이미지를 여기로 드래그하세요
									</p>
								</div>
							)}
						</label>
					</div>
				</div>

				{/* 상태 메시지 */}
				{status && (
					<div
						className={`p-4 rounded-lg ${
							status.includes('성공')
								? 'bg-green-50 text-green-700'
								: 'bg-red-50 text-red-700'
						}`}
					>
						{status}
					</div>
				)}

				{/* 제출 버튼 */}
				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium'
				>
					업로드
				</button>
			</form>
		</div>
	)
}

export default Dashboard
