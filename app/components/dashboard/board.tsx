import Card from './card'
import fullImage from '@/public/building.jpg'

const Board = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-30 mb-40'>
			<Card
				id='1'
				image={fullImage}
				title='프로젝트'
				description='프로젝트 설명'
			/>
			<Card
				id='2'
				image={fullImage}
				title='프로젝트'
				description='프로젝트 설명'
			/>
			<Card
				id='3'
				image={fullImage}
				title='프로젝트'
				description='프로젝트 설명'
			/>
			<Card
				id='4'
				image={fullImage}
				title='프로젝트'
				description='프로젝트 설명'
			/>
		</div>
	)
}

export default Board
