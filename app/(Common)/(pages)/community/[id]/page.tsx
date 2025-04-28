'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import suitImage from '@/public/suit.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { community } from '@/app/constants/constants'
import Map from '@/app/components/corpinfo/map'
import CEOPage from '@/app/components/corpinfo/ceo'
import History from '@/app/components/corpinfo/history'
import ContactPage from '@/app/components/community/contact'

const CorpPage = () => {
	const params = useParams()
	const tabItems = community
	return (
		<div>
			<ImageLine image={suitImage} title='견적문의' />
			<TabMenu items={tabItems} />
			{params.id === '1' && <ContactPage />}
		</div>
	)
}
export default CorpPage
