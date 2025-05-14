'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import communityImage from '@/public/community.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { community } from '@/app/constants/constants'
import ContactPage from '@/app/components/community/contact'

const CorpPage = () => {
	const params = useParams()
	const tabItems = community
	return (
		<div>
			<ImageLine image={communityImage} title='커뮤니티' />
			<TabMenu items={tabItems} />
			{params.id === '1' && <ContactPage />}
		</div>
	)
}
export default CorpPage
