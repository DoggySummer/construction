'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import suitImage from '@/public/suit.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { businessField } from '@/app/constants/constants'

const BusinessFieldPage = () => {
	const params = useParams()
	const tabItems = businessField
	return (
		<div>
			<ImageLine image={suitImage} title='사업분야' />
			<TabMenu items={tabItems} />
		</div>
	)
}
export default BusinessFieldPage
