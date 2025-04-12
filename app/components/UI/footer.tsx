import Link from 'next/link'

const Footer = () => {
	const name = '(주)신의환경'
	const address = '경기 용인시 처인구 모현읍 백옥대로 2387-1 (왕산리) 1층'
	const telephone = '02)834-4590~1'
	const fax = '02)834-4592'
	const email = 'kacoh@hanmail.net'
	const copyRight = 'COPYRIGHT 2025 신의환경. ALL RIGHTS RESERVED.'
	return (
		<div className='w-full px-30 border-t border-black mb-10'>
			<div className='mt-10 flex items-center'>
				<div className=''>{name}</div>
				<div className='mx-2 w-[1px] h-6 bg-black' />
				<div className=''>{address}</div>
				<div className='mx-2 w-[1px] h-6 bg-black' />
				<div className=''>{telephone}</div>
				<div className='mx-2 w-[1px] h-6 bg-black' />
				<div className=''>{fax}</div>
				<div className='mx-2 w-[1px] h-6 bg-black' />
				<div className=''>{email}</div>
			</div>
			<div className='mt-2 flex items-center'>
				<div className=''>{copyRight}</div>
			</div>
		</div>
	)
}

export default Footer
