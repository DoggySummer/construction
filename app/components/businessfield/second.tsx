import Image from 'next/image'
import secondImage from '@/public/building.jpg'

const Second = () => {
	return (
		<div className='flex contentSize mt-10 gap-10 mb-10 justify-center'>
			<Image src={secondImage} alt='first' className='w-1/3 object-cover' />
			<div className='flex flex-col w-1/2'>
				<h1 className='text-3xl font-bold'>구조물해체공사</h1>
				<div className='text-sm'>Structure Demolition</div>
				<div className='my-4 font-semibold'>
					“경험과 기술력으로 안전하고 친환경적인 철거 솔루션”
				</div>
				<div className=''>
					신의환경은 다년간의 시공 경험과 기술력을 바탕으로,{' '}
					<span className='text-primary font-semibold'>
						고층 건축물, 대형마트, 산업시설, 재개발 지구 등 다양한 해체
						프로젝트를 안전하고 정밀하게 수행해 온 철거 전문 기업
					</span>
					입니다.
				</div>
				<div className='my-4'>
					해체계획서 작성부터 시공, 준공까지 전 과정에 걸쳐
					<div className=''>
						<span className='text-primary font-semibold'>
							자체 보유한 전문 인력과 장비를 통해 직접 시공
						</span>
						하며,
					</div>
					<div className=''>
						<span className='text-primary font-semibold'>
							일원화된 관리 시스템으로 공정의 효율성과 품질을 극대화
						</span>
						합니다.
					</div>
				</div>
				<div className='mb-4'>
					현장 조건과 구조물 특성에 맞는{' '}
					<span className='text-primary font-semibold'>
						최적의 해체공법과 안전계획
					</span>
					을 수립하고,
					<div>
						법적 절차와 허가 심의에 대한{' '}
						<span className='text-primary font-semibold'>전문 솔루션</span>까지
						함께 제공합니다.
					</div>
					<div className='text-primary font-semibold'>
						신의환경은 계획에서 실행까지, 안전하고 책임감 있는 해체공사를
						약속드립니다.
					</div>
				</div>
			</div>
		</div>
	)
}

export default Second
