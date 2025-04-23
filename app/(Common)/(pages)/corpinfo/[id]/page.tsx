'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import suitImage from '@/public/suit.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { corpInfo } from '@/app/constants/constants'
import Map from '@/app/components/corpinfo/map'

const CorpPage = () => {
	const params = useParams()
	const tabItems = corpInfo
	return (
		<div>
			<ImageLine image={suitImage} title='회사소개' subTitle='ㅇㅇㅇ' />
			<TabMenu items={tabItems} />
			{params.id === '5' && <Map />}
		</div>
	)
}
export default CorpPage
