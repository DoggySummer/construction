'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import suitImage from '@/public/suit.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { corpInfo } from '@/app/constants/constants'
import Map from '@/app/components/corpinfo/map'
import CEOPage from '@/app/components/corpinfo/ceo'
import History from '@/app/components/corpinfo/history'
import Structure from '@/app/components/corpinfo/structure'
import Ideology from '@/app/components/corpinfo/ideology'

const CorpPage = () => {
	const params = useParams()
	const tabItems = corpInfo
	return (
		<div>
			<ImageLine image={suitImage} title='회사소개' />
			<TabMenu items={tabItems} />
			{params.id === '1' && <CEOPage />}
			{params.id === '2' && <Ideology />}
			{params.id === '3' && <History />}
			{params.id === '4' && <Structure />}
			{params.id === '5' && <Map />}
		</div>
	)
}
export default CorpPage
