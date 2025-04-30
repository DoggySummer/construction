'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import suitImage from '@/public/suit.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { mainPerformance } from '@/app/constants/constants'

const PerformancePage = () => {
	const params = useParams()
	const tabItems = mainPerformance
	return (
		<div>
			<ImageLine image={suitImage} title='주요실적' />
			<TabMenu items={tabItems} />
		</div>
	)
}
export default PerformancePage
