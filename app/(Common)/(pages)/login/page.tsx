'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const router = useRouter()
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		fetch('/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.message === '로그인 성공') {
					router.push('/admin')
				} else {
					alert('아이디 또는 비밀번호가 일치하지 않습니다.')
				}
			})
			.catch((err) => {
				alert('로그인 실패')
				console.log(err)
			})
	}

	return (
		<div className='w-full min-h-screen bg-black flex items-center justify-center px-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-xl'
			>
				<h2 className='text-3xl font-bold text-white text-center mb-8'>
					어드민 로그인
				</h2>

				<form onSubmit={handleSubmit} className='space-y-6'>
					<div>
						<label
							htmlFor='username'
							className='block text-sm font-medium text-gray-200 mb-2'
						>
							아이디
						</label>
						<input
							id='username'
							type='text'
							value={formData.username}
							onChange={(e) =>
								setFormData({ ...formData, username: e.target.value })
							}
							className='w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white'
							placeholder='아이디를 입력하세요'
							required
						/>
					</div>

					<div>
						<label
							htmlFor='password'
							className='block text-sm font-medium text-gray-200 mb-2'
						>
							비밀번호
						</label>
						<input
							id='password'
							type='password'
							value={formData.password}
							onChange={(e) =>
								setFormData({ ...formData, password: e.target.value })
							}
							className='w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white'
							placeholder='비밀번호를 입력하세요'
							required
						/>
					</div>
					<button
						type='submit'
						className=' cursor-pointer w-full py-3 px-4 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200'
					>
						로그인
					</button>
				</form>
			</motion.div>
		</div>
	)
}
