import Image from 'next/image'
import thirdImage from '@/public/biz_fourth.jpeg'

const Fourth = () => {
	return (
		<div className='flex contentSize mt-10 gap-10 mb-10 justify-center'>
			<Image src={thirdImage} alt='first' className='w-1/3 object-cover' />
			<div className='flex flex-col w-1/2'>
				<h1 className='text-3xl font-bold'>토공사</h1>
				<div className='text-sm'>Excavation Work</div>
				<div className='my-4 font-semibold '>
					“현장을 아는 기술, 신뢰로 다지는 토공사”
				</div>
				<div className='font-semibold text-primary'>
					지반을 다지고, 신뢰를 쌓습니다.
				</div>
				<div>신의환경은 수많은 현장 경험과 축적된 기술력을 바탕으로, </div>
				<div className='mb-4'>
					정밀한 설계와 안정적인 시공을 실현하는{' '}
					<span className='font-semibold text-primary'>토공 전문 기업</span>
					입니다.
				</div>
				<div>지반의 특성을 정확히 분석하고, 최적의 공법을 적용하여</div>
				<div>
					<span className='font-semibold text-primary'>
						안전하고 효율적인 토공사
					</span>
					를 제공합니다.
				</div>
				<div>절토, 성토, 굴착, 옹벽 등 다양한 지반 작업에 있어</div>
				<div>
					<span className='font-semibold text-primary'>
						현장 조건에 맞는 맞춤형 솔루션
					</span>
					을 제시하며,
				</div>
			</div>
		</div>
	)
}

export default Fourth
