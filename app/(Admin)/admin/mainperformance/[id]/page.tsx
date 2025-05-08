'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Image from 'next/image'
import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ko } from 'date-fns/locale'
import { Performance } from '@/app/constants/type'
// 한글 금액 단위 변환 함수
function numberToKorean(num: number) {
	if (num === 0) return '0 원'
	const units = ['', '만', '억', '조', '경']
	const splitUnit = 10000
	const resultArray = []
	let resultString = ''

	let i = 0
	while (num > 0) {
		const mod = num % splitUnit
		if (mod > 0) {
			resultArray.push(`${mod.toLocaleString()}${units[i]}`)
		}
		num = Math.floor(num / splitUnit)
		i++
	}
	resultString = resultArray.reverse().join(' ')
	return resultString + ' 원'
}

const PerformanceEdit = () => {
	const router = useRouter()
	const params = useParams()
	const [formData, setFormData] = useState({
		id: '',
		createdAt: '',
		subTable: '',
		performanceType: '',
		title: '',
		constructionStartDate: new Date() as Date | null,
		constructionEndDate: new Date() as Date | null,
		primeContractor: '',
		clientName: '',
		contractAmount: '',
		mainPhoto: '',
		subPhoto1: '',
		subPhoto2: '',
		subPhoto3: '',
		subPhoto4: '',
		subPhoto5: '',
	})

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`/api/performance/${params.id}`)
			const data = await response.json()
			console.log(data[0])

			// 이미지 URL들을 previewImages에 설정
			const imageFields = [
				'mainPhoto',
				'subPhoto1',
				'subPhoto2',
				'subPhoto3',
				'subPhoto4',
			]
			const initialPreviewImages: { [key: string]: string } = {}
			imageFields.forEach((field) => {
				if (data[0][field]) {
					initialPreviewImages[field] = data[0][field]
				}
			})
			setPreviewImages(initialPreviewImages)

			setFormData({
				...data[0],
				constructionStartDate: new Date(
					data[0].constructionStartDate
				) as Date | null,
				constructionEndDate: new Date(
					data[0].constructionEndDate
				) as Date | null,
			})
		}
		fetchData()
	}, [params.id])

	const [previewImages, setPreviewImages] = useState<{ [key: string]: string }>(
		{}
	)

	const fileInputRefs = {
		mainPhoto: React.useRef<HTMLInputElement>(null),
		subPhoto1: React.useRef<HTMLInputElement>(null),
		subPhoto2: React.useRef<HTMLInputElement>(null),
		subPhoto3: React.useRef<HTMLInputElement>(null),
		subPhoto4: React.useRef<HTMLInputElement>(null),
	}

	const triggerFileInput = (ref: React.RefObject<HTMLInputElement | null>) => {
		ref.current?.click()
	}

	const getFileName = (field: string) => {
		const value: any = formData[field as keyof Performance]
		if (value instanceof File) {
			return value.name
		}
		return '선택된 파일 없음'
	}

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleImageChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		field: string
	) => {
		const file = e.target.files?.[0]
		if (file) {
			setFormData((prev) => ({
				...prev,
				[field]: file,
			}))

			// Create preview URL
			const url = URL.createObjectURL(file)
			setPreviewImages((prev) => ({
				...prev,
				[field]: url,
			}))
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const data = new FormData()
		data.append('performanceType', formData.performanceType)
		data.append('title', formData.title)
		data.append('primeContractor', formData.primeContractor)
		data.append('clientName', formData.clientName)
		data.append('contractAmount', formData.contractAmount)
		data.append(
			'constructionStartDate',
			formData.constructionStartDate?.toISOString().split('T')[0] || ''
		)
		data.append(
			'constructionEndDate',
			formData.constructionEndDate?.toISOString().split('T')[0] || ''
		)
		if (formData.mainPhoto) data.append('mainPhoto', formData.mainPhoto)
		if (formData.subPhoto1) data.append('subPhoto1', formData.subPhoto1)
		if (formData.subPhoto2) data.append('subPhoto2', formData.subPhoto2)
		if (formData.subPhoto3) data.append('subPhoto3', formData.subPhoto3)
		if (formData.subPhoto4) data.append('subPhoto4', formData.subPhoto4)

		try {
			const res = await fetch('/api/performance', {
				method: 'POST',
				body: data,
			})

			if (res.ok) {
				// 성공 처리 (예: 라우터 이동)
				alert('저장에 성공했습니다.')
			} else {
				// 실패 처리
				alert('저장에 실패했습니다.')
			}
		} catch (error) {
			console.error(error)
			alert('에러가 발생했습니다.')
		}
	}

	const handleDelete = async () => {
		const isConfirmed = confirm('정말 삭제하시겠습니까?')

		if (isConfirmed) {
			const res = await fetch(`/api/performance/${params.id}`, {
				method: 'DELETE',
			})
			if (res.ok) {
				alert('삭제에 성공했습니다.')
				router.push('/admin/mainperformance')
			} else {
				alert('삭제에 실패했습니다.')
			}
		}
	}

	const inputClassName =
		'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700 bg-white shadow-sm'
	const selectClassName =
		"w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700 bg-white shadow-sm appearance-none bg-[url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E\")] bg-[length:1.25em_1.25em] bg-[right_0.5rem_center] bg-no-repeat"
	const datePickerClassName =
		'w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ease-in-out text-gray-700 bg-white shadow-sm'

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-2xl font-bold mb-6'>주요실적 추가</h1>

			<form
				onSubmit={handleSubmit}
				className='space-y-6 bg-white p-6 rounded-xl shadow-sm'
			>
				<div className='space-y-5'>
					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							주요실적 *
						</label>
						<select
							name='performanceType'
							value={formData.performanceType}
							onChange={handleInputChange}
							className={selectClassName}
							required
						>
							<option value='1'>철거전용모듈비계</option>
							<option value='2'>구조물해체공사</option>
							<option value='3'>석면해체공사</option>
							<option value='4'>토공사</option>
						</select>
					</div>

					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							제목 *
						</label>
						<input
							type='text'
							name='title'
							value={formData.title}
							onChange={handleInputChange}
							className={inputClassName}
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							공사기간 *
						</label>
						<div className='grid grid-cols-2 gap-4'>
							<div>
								<label className='block text-sm text-gray-600 mb-1'>
									시작일
								</label>
								<DatePicker
									selected={formData.constructionStartDate}
									onChange={(date: Date | null) =>
										setFormData((prev) => ({
											...prev,
											constructionStartDate: date,
										}))
									}
									selectsStart
									startDate={formData.constructionStartDate}
									endDate={formData.constructionEndDate}
									dateFormat='yyyy-MM-dd'
									locale={ko}
									className={datePickerClassName}
									placeholderText='시작일 선택'
									required
								/>
							</div>
							<div>
								<label className='block text-sm text-gray-600 mb-1'>
									종료일
								</label>
								<DatePicker
									selected={formData.constructionEndDate}
									onChange={(date: Date | null) =>
										setFormData((prev) => ({
											...prev,
											constructionEndDate: date,
										}))
									}
									selectsEnd
									startDate={formData.constructionStartDate}
									endDate={formData.constructionEndDate}
									dateFormat='yyyy-MM-dd'
									locale={ko}
									className={datePickerClassName}
									placeholderText='종료일 선택'
									required
								/>
							</div>
						</div>
					</div>

					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							원도급 *
						</label>
						<input
							type='text'
							name='primeContractor'
							value={formData.primeContractor}
							onChange={handleInputChange}
							className={inputClassName}
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							발주자 *
						</label>
						<input
							type='text'
							name='clientName'
							value={formData.clientName}
							onChange={handleInputChange}
							className={inputClassName}
							required
						/>
					</div>

					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							계약금액 *
						</label>
						<input
							type='text'
							name='contractAmount'
							value={formData.contractAmount}
							onChange={handleInputChange}
							className={inputClassName}
							required
							placeholder='숫자만 입력해주세요'
						/>
						{formData.contractAmount && (
							<div className='mt-1 text-sm text-gray-500'>
								{numberToKorean(
									Number(formData.contractAmount.replace(/[^0-9]/g, ''))
								)}
							</div>
						)}
					</div>

					<div>
						<label className='block text-sm font-medium mb-2 text-gray-700'>
							메인사진 *
						</label>
						<div className='flex items-center gap-3'>
							<input
								type='file'
								ref={fileInputRefs.mainPhoto}
								accept='image/*'
								onChange={(e) => handleImageChange(e, 'mainPhoto')}
								className='hidden'
								required
							/>
							<button
								type='button'
								onClick={() => triggerFileInput(fileInputRefs.mainPhoto)}
								className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300'
							>
								파일 선택
							</button>
							<span className='text-sm text-gray-600'>
								{getFileName('mainPhoto')}
							</span>
						</div>
						{previewImages.mainPhoto && (
							<div className='mt-2'>
								<Image
									src={previewImages.mainPhoto}
									alt='Main photo preview'
									width={200}
									height={200}
									className='object-cover rounded-md'
								/>
							</div>
						)}
					</div>

					{[1, 2, 3, 4].map((num) => (
						<div key={num}>
							<label className='block text-sm font-medium mb-2 text-gray-700'>
								서브사진 {num}
							</label>
							<div className='flex items-center gap-3'>
								<input
									type='file'
									ref={
										fileInputRefs[
											`subPhoto${num}` as keyof typeof fileInputRefs
										]
									}
									accept='image/*'
									onChange={(e) => handleImageChange(e, `subPhoto${num}`)}
									className='hidden'
								/>
								<button
									type='button'
									onClick={() =>
										triggerFileInput(
											fileInputRefs[
												`subPhoto${num}` as keyof typeof fileInputRefs
											]
										)
									}
									className='px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 border border-gray-300'
								>
									파일 선택
								</button>
								<span className='text-sm text-gray-600'>
									{getFileName(`subPhoto${num}`)}
								</span>
							</div>
							{previewImages[`subPhoto${num}`] && (
								<div className='mt-2'>
									<Image
										src={previewImages[`subPhoto${num}`]}
										alt={`Sub photo ${num} preview`}
										width={200}
										height={200}
										className='object-cover rounded-md'
									/>
								</div>
							)}
						</div>
					))}
				</div>

				<div className='flex gap-4'>
					<button
						type='submit'
						className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer'
					>
						저장
					</button>
					<button
						type='button'
						onClick={handleDelete}
						className='px-4 py-2 bg-red-400 hover:bg-red-500 rounded-md text-white cursor-pointer'
					>
						삭제
					</button>
					<button
						type='button'
						onClick={() => router.back()}
						className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer'
					>
						취소
					</button>
				</div>
			</form>
		</div>
	)
}

export default PerformanceEdit
