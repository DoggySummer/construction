import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type cardProps = {
	image: StaticImageData
	title: string
	description: string
	id: string
}

const Card = ({ image, title, description, id }: cardProps) => {
	return (
		<Link href={`/dashboard/${id}`}>
			<div className='group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer'>
				<div className='relative h-48 overflow-hidden'>
					<Image
						src={image}
						alt={title}
						fill
						className='object-cover group-hover:scale-110 transition-transform duration-300'
					/>
				</div>

				<div className='p-6'>
					<h3 className='text-xl font-bold mb-2 text-gray-800'>{title}</h3>
					<p className='text-gray-600 leading-relaxed'>{description}</p>
				</div>
			</div>
		</Link>
	)
}

export default Card
