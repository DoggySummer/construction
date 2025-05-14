'use client'

import ImageLine from '@/app/components/UI/imageLine'
import { useParams } from 'next/navigation'
import blueprintImage from '@/public/blueprint.png'
import TabMenu from '@/app/components/UI/tabMenu'
import { mainPerformance } from '@/app/constants/constants'
import Scaffolding from '@/app/components/mainperformance/scaffolding'
import Demolition from '@/app/components/mainperformance/demolition'
import Asbestos from '@/app/components/mainperformance/asbestos'
import Earthwork from '@/app/components/mainperformance/earthwork'

const PerformancePage = () => {
	const params = useParams()
	const tabItems = mainPerformance

	return (
		<div>
			<ImageLine image={blueprintImage} title='주요실적' />
			<TabMenu items={tabItems} />
			{params.id === '1' && <Scaffolding />}
			{params.id === '2' && <Demolition />}
			{params.id === '3' && <Asbestos />}
			{params.id === '4' && <Earthwork />}
		</div>
	)
}
export default PerformancePage
