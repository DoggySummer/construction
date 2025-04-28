'use client'
import Title from '../UI/title'
import { useState } from 'react'

interface ContactForm {
	title: string
	name: string
	email: string
	content: string
	file?: File
}

const ContactPage = () => {
	const [formData, setFormData] = useState<ContactForm>({
		title: '',
		name: '',
		email: '',
		content: '',
	})

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setFormData((prev) => ({
				...prev,
				file,
			}))
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// 필수 입력 필드 검사
		if (!formData.title.trim()) {
			alert('제목을 입력해주세요.')
			return
		}
		if (!formData.name.trim()) {
			alert('이름을 입력해주세요.')
			return
		}
		if (!formData.email.trim()) {
			alert('이메일을 입력해주세요.')
			return
		}
		if (!formData.content.trim()) {
			alert('내용을 입력해주세요.')
			return
		}
		if (!formData.file) {
			alert('파일을 첨부해주세요.')
			return
		}

		try {
			const formDataToSend = new FormData()
			Object.entries(formData).forEach(([key, value]) => {
				if (value instanceof File) {
					formDataToSend.append(key, value)
				} else {
					formDataToSend.append(key, value.toString())
				}
			})

			const response = await fetch('/api/contact', {
				method: 'POST',
				body: formDataToSend,
			})

			if (!response.ok) {
				throw new Error('문의하기 제출에 실패했습니다.')
			}

			// 성공 시 폼 초기화
			setFormData({
				title: '',
				name: '',
				email: '',
				content: '',
			})
			alert('문의가 성공적으로 제출되었습니다.')
		} catch (error) {
			console.error('Error:', error)
			alert('문의 제출 중 오류가 발생했습니다.')
		}
	}

	return (
		<div className='contentSize mx-auto p-6'>
			<Title title='문의하기' />

			<form className='mt-8' onSubmit={handleSubmit}>
				<div className='divide-y divide-gray-200 border-y border-gray-200'>
					<div className='grid grid-cols-4 gap-4 items-center py-4'>
						<label
							htmlFor='title'
							className='text-sm font-medium text-gray-700'
						>
							제목
						</label>
						<input
							type='text'
							id='title'
							name='title'
							value={formData.title}
							onChange={handleChange}
							className='col-span-3 block w-full rounded-md border border-gray-300 p-2 focus:outline-none'
							required
						/>
					</div>

					<div className='grid grid-cols-4 gap-4 items-center py-4'>
						<label htmlFor='name' className='text-sm font-medium text-gray-700'>
							이름
						</label>
						<input
							type='text'
							id='name'
							name='name'
							value={formData.name}
							onChange={handleChange}
							className='col-span-3 block w-full rounded-md border border-gray-300 p-2 focus:outline-none'
							required
						/>
					</div>

					<div className='grid grid-cols-4 gap-4 items-center py-4'>
						<label
							htmlFor='email'
							className='text-sm font-medium text-gray-700'
						>
							이메일
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className='col-span-3 block w-full rounded-md border border-gray-300 p-2 focus:outline-none'
							required
						/>
					</div>

					<div className='grid grid-cols-4 gap-4 items-start py-4'>
						<label
							htmlFor='content'
							className='text-sm font-medium text-gray-700'
						>
							내용
						</label>
						<textarea
							id='content'
							name='content'
							value={formData.content}
							onChange={handleChange}
							rows={5}
							className='col-span-3 block w-full rounded-md border border-gray-300 p-2 focus:outline-none'
							required
						/>
					</div>

					<div className='grid grid-cols-4 gap-4 items-center py-4'>
						<label htmlFor='file' className='text-sm font-medium text-gray-700'>
							파일
						</label>
						<div className='col-span-3'>
							<input
								type='file'
								id='file'
								onChange={handleFileChange}
								className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-50'
							/>
						</div>
					</div>
				</div>

				<div className='mt-6'>
					<button
						type='submit'
						className='w-full bg-indigo-600 text-white rounded-md py-2 px-4 hover:bg-indigo-700 focus:outline-none'
					>
						제출하기
					</button>
				</div>

				<div className='mt-8'>
					<h3 className='text-lg font-medium text-gray-900'>
						개인정보 수집 및 이용에 대한 안내
					</h3>
					<div className='mt-4 p-4 bg-gray-50 rounded-md border border-gray-200'>
						<p className='text-sm text-gray-600 whitespace-pre-line'>
							{`주식회사 신의환경은 기업/단체 및 개인의 정보 수집 및 이용 등 처리에 있어 아래의 사항을 관계법령에 따라 고지하고 안내해 드립니다.

1. 정보수집의 이용 목적 : 상담 및 진행
2. 수집/이용 항목 : 이름, 연락처, 이메일, 내용 등
3. 보유 및 이용기간 : 상담 종료후 6개월, 정보제공자의 삭제 요청시 즉시
4. 개인정보처리담당 : 전화 031-334-1725 / 이메일 trust1725@naver.com`}
						</p>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ContactPage
