import Image from 'next/image'
import thirdImage from '@/public/biz_4.png'

const Fourth = () => {
	return (
		<div className='flex lg:flex-row flex-col contentSize mt-10 lg:gap-20 gap-10 mb-10 justify-center break-keep'>
			<Image
				src={thirdImage}
				alt='third'
				className='lg:w-100 lg:h-100 object-cover w-4/5 aspect-square mx-auto'
			/>
			<div className='flex flex-col w-4/5 mx-auto lg:w-1/2'>
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
				<div className='mb-4'>
					<span className='font-semibold text-primary'>
						공사 기간 단축, 비용 효율, 안전 확보
					</span>
					를 동시에 만족시키는 시공을 약속드립니다.
				</div>
				<div>
					<span className='font-semibold text-primary'>
						토공은 기초입니다. 기초가 흔들리면 모든 것이 흔들립니다.
					</span>
				</div>
				<div>
					신의환경은{' '}
					<span className='font-semibold text-primary'>
						기초부터 신뢰를 다지는 시공 파트너
					</span>
					로서,
				</div>
				<div className='mb-4'>
					철저한 현장관리와 품질 중심의 시공을 통해{' '}
					<span className='font-semibold text-primary'>든든한 기반</span>을
					만들어드립니다.
				</div>
				<div>
					<span className='font-semibold text-primary'>
						땅을 다지는 일이 곧, 신뢰를 세우는 일입니다.
					</span>
				</div>
			</div>
		</div>
	)
}

export default Fourth
