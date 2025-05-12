import React from 'react'
import insado from '@/public/insado.png'
import Image from 'next/image'
import Title from '../UI/title'

const Structure = () => {
	return (
		<div className='contentSize'>
			<Title title='조직도' />
			<Image
				src={insado}
				width={1920}
				height={1080}
				alt='조직도'
				className='w-full'
			/>
		</div>
	)
}

export default Structure
