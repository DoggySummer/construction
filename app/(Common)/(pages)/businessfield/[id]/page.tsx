'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import businessFieldImage from '@/public/businessField.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { businessField } from '@/app/constants/constants'
import First from '@/app/components/businessfield/first'
import Second from '@/app/components/businessfield/second'
import Third from '@/app/components/businessfield/third'
import Fourth from '@/app/components/businessfield/fourth'
import Fifth from '@/app/components/businessfield/fifth'
import Sixth from '@/app/components/businessfield/sixth'

const BusinessFieldPage = () => {
	const params = useParams()
	const tabItems = businessField
	return (
		<div>
			<ImageLine image={businessFieldImage} title='사업분야' />
			<TabMenu items={tabItems} />
			{params.id === '1' && <First />}
			{params.id === '2' && <Second />}
			{params.id === '3' && <Third />}
			{params.id === '4' && <Fourth />}
			{params.id === '5' && <Fifth />}
			{params.id === '6' && <Sixth />}
		</div>
	)
}
export default BusinessFieldPage
