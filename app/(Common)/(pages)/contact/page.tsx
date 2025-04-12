'use client'

import Title from '@/app/components/UI/title'
import { useState } from 'react'

const Contact = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		message: '',
		file: null as File | null,
	})
	const [status, setStatus] = useState('')
	const [fileName, setFileName] = useState('')

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setForm({ ...form, file: e.target.files[0] })
			setFileName(e.target.files[0].name)
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus('전송 중...')

		const formData = new FormData()
		formData.append('name', form.name)
		formData.append('email', form.email)
		formData.append('message', form.message)
		if (form.file) {
			formData.append('file', form.file)
		}

		const res = await fetch('/api/contact', {
			method: 'POST',
			body: formData,
		})

		if (res.ok) {
			setStatus('전송 완료! 확인 후 연락드리겠습니다.')
			setForm({ name: '', email: '', message: '', file: null })
			setFileName('')
		} else {
			setStatus('전송 실패 😥 다시 시도해주세요.')
		}
	}

	return (
		<div>
			<Title title='문의사항' />
			<form onSubmit={handleSubmit} className='max-w-2xl mx-auto space-y-6 p-6'>
				<div className='space-y-2'>
					<label
						htmlFor='name'
						className='block text-sm font-medium text-gray-700'
					>
						이름
					</label>
					<input
						id='name'
						name='name'
						placeholder='홍길동'
						onChange={handleChange}
						value={form.name}
						required
						className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
					/>
				</div>

				<div className='space-y-2'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						이메일
					</label>
					<input
						id='email'
						name='email'
						type='email'
						placeholder='example@email.com'
						onChange={handleChange}
						value={form.email}
						required
						className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
					/>
				</div>

				<div className='space-y-2'>
					<label
						htmlFor='message'
						className='block text-sm font-medium text-gray-700'
					>
						문의 내용
					</label>
					<textarea
						id='message'
						name='message'
						placeholder='문의하실 내용을 입력해주세요.'
						onChange={handleChange}
						value={form.message}
						required
						rows={6}
						className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none'
					/>
				</div>

				<div className='space-y-2'>
					<label
						htmlFor='file'
						className='block text-sm font-medium text-gray-700'
					>
						첨부파일
					</label>
					<div className='flex items-center gap-3'>
						<label
							htmlFor='file'
							className='px-4 py-3 bg-gray-50 rounded-lg border border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors'
						>
							파일 선택
						</label>
						<input
							id='file'
							name='file'
							type='file'
							onChange={handleFileChange}
							className='hidden'
							accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
						/>
						<span className='text-sm text-gray-500'>
							{fileName || '선택된 파일 없음'}
						</span>
					</div>
					<p className='text-xs text-gray-500 mt-1'>
						허용 형식: PDF, Word, JPG, PNG (최대 10MB)
					</p>
				</div>

				<button
					type='submit'
					className='w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
				>
					문의 보내기
				</button>

				{status && (
					<p
						className={`text-center p-4 rounded-lg ${
							status.includes('성공')
								? 'bg-green-50 text-green-700'
								: 'bg-red-50 text-red-700'
						}`}
					>
						{status}
					</p>
				)}
			</form>
		</div>
	)
}

export default Contact
