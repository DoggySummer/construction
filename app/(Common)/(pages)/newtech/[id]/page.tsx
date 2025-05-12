'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import techImage from '@/public/tech.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { newTech } from '@/app/constants/constants'

const NewTechPage = () => {
	const params = useParams()
	const tabItems = newTech
	return (
		<div>
			<ImageLine image={techImage} title='신기술 소개' />
			<TabMenu items={tabItems} />
		</div>
	)
}
export default NewTechPage
