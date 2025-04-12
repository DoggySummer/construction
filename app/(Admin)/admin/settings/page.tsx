'use client'

import { useState } from 'react'
import Image from 'next/image'

const Page = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [status, setStatus] = useState<string>('')

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setSelectedFile(file)
			// 미리보기 URL 생성
			const url = URL.createObjectURL(file)
			setPreviewUrl(url)
		}
	}

	const handleUpload = async () => {
		if (!selectedFile) return

		setStatus('업로드 중...')
		const formData = new FormData()
		formData.append('file', selectedFile)

		try {
			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			if (response.ok) {
				setStatus('업로드 성공!')
				// 성공 후 초기화
				setSelectedFile(null)
				setPreviewUrl(null)
			} else {
				setStatus('업로드 실패: ' + data.error)
			}
		} catch (error) {
			setStatus('업로드 중 오류가 발생했습니다.')
		}
	}

	return (
		<div className='max-w-2xl mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-6'>이미지 업로드</h1>

			<div className='space-y-6'>
				{/* 파일 선택 영역 */}
				<div className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center'>
					<input
						type='file'
						accept='image/*'
						onChange={handleFileChange}
						className='hidden'
						id='fileInput'
					/>
					<label htmlFor='fileInput' className='cursor-pointer block'>
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
								<p className='text-sm mt-2'>또는 파일을 여기로 드래그하세요</p>
							</div>
						)}
					</label>
				</div>

				{/* 선택된 파일 정보 */}
				{selectedFile && (
					<div className='text-sm text-gray-600'>
						선택된 파일: {selectedFile.name}
					</div>
				)}

				{/* 업로드 버튼 */}
				<button
					onClick={handleUpload}
					disabled={!selectedFile}
					className={`w-full py-3 rounded-lg font-medium ${
						selectedFile
							? 'bg-blue-600 text-white hover:bg-blue-700'
							: 'bg-gray-300 text-gray-500 cursor-not-allowed'
					}`}
				>
					업로드
				</button>

				{/* 상태 메시지 */}
				{status && (
					<div
						className={`p-4 rounded-lg text-center ${
							status.includes('성공')
								? 'bg-green-50 text-green-700'
								: 'bg-red-50 text-red-700'
						}`}
					>
						{status}
					</div>
				)}
			</div>
		</div>
	)
}

export default Page
