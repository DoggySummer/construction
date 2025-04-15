import Link from 'next/link'

const Footer = () => {
	const name = '(주)신의환경'
	const address = '경기 용인시 처인구 모현읍 백옥대로 2387-1 (왕산리) 1층'
	const telephone = '02)834-4590~1'
	const fax = '02)834-4592'
	const email = 'kacoh@hanmail.net'
	const copyRight = 'COPYRIGHT 2025 신의환경. ALL RIGHTS RESERVED.'
	return (
		<div className='w-full  sm:px-12 defaultWidth border-t border-black mb-10'>
			<div className='mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2'>
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

			<div className='mt-2'>
				<div>{copyRight}</div>
			</div>
		</div>
	)
}

export default Footer
