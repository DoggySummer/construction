'use client'

import Popup from '@/app/components/UI/popup'
import { useState } from 'react'

const Footer = () => {
	const [isPopup, setIsPopup] = useState(false)
	const [isPopup2, setIsPopup2] = useState(false)
	const name = '(주)신의환경'
	const address = '경기 용인시 처인구 모현읍 파담로 140-14, 103호 '
	const telephone = 'TEL : 031-334-1725'
	const fax = 'FAX : 031-334-1724'
	const email = 'E-MAIL : trust1725@naver.com'
	const copyRight = 'COPYRIGHT 2025 신의환경. ALL RIGHTS RESERVED.'
	return (
		<>
			<Popup
				isOpen={isPopup}
				title='이메일무단수집거부'
				onClose={() => setIsPopup(false)}
				type={1}
			/>
			<Popup
				isOpen={isPopup2}
				title='개인정보처리방침'
				onClose={() => setIsPopup2(false)}
				type={2}
			/>
			<div className='border-t border-black mb-10 mx-4 lg:mx-0'>
				<div className='contentSize'>
					<div className='flex gap-4 sm:justify-start justify-center mt-4'>
						<div className='cursor-pointer' onClick={() => setIsPopup2(true)}>
							개인정보취급방침
						</div>
						<div className='bg-gray-200 px-[1px] py-1 rounded-md' />
						<div className='cursor-pointer' onClick={() => setIsPopup(true)}>
							이메일무단수집거부
						</div>
					</div>
					<div className='mt-10 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 sm:text-base text-sm  text-gray-600'>
						<div className='flex items-center'>
							<div>{name}</div>
							<div className='hidden sm:block mx-2 w-[1px] h-6 bg-black' />
						</div>
						<div className='flex items-center'>
							<div>{address}</div>
							<div className='hidden sm:block mx-2 w-[1px] h-6 bg-black' />
						</div>
						<div className='flex items-center'>
							<div>{telephone}</div>
							<div className='hidden sm:block mx-2 w-[1px] h-6 bg-black' />
						</div>
						<div className='flex items-center'>
							<div>{fax}</div>
							<div className='hidden sm:block mx-2 w-[1px] h-6 bg-black' />
						</div>
						<div className='flex items-center'>
							<div>{email}</div>
						</div>
					</div>

					<div className='mt-2 sm:text-base text-sm  text-gray-600'>
						<div>{copyRight}</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Footer
