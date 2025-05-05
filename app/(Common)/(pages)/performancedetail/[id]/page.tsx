'use client'

import ImageLine from '@/app/components/UI/imageLine'
import TabMenu from '@/app/components/UI/tabMenu'
import { mainPerformance } from '@/app/constants/constants'
import suitImage from '@/public/suit.png'

import { useParams } from 'next/navigation'

const PerformanceDetailPage = () => {
	const params = useParams()
	const id = params.id
	const tabItems = mainPerformance

	return (
		<div>
			<ImageLine image={suitImage} title='주요실적' />
			<TabMenu items={tabItems} />
			{params.id}
		</div>
	)
}

export default PerformanceDetailPage
