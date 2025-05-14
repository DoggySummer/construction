import Image from 'next/image'
import firstImage from '@/public/biz_1.png'

const First = () => {
	return (
		<div className='flex lg:flex-row flex-col contentSize mt-10 lg:gap-20 gap-10 mb-10 justify-center break-keep'>
			<Image
				src={firstImage}
				alt='first'
				className='lg:w-100 lg:h-100 object-cover w-4/5 aspect-square mx-auto'
			/>
			<div className='flex flex-col w-4/5 mx-auto lg:w-1/2'>
				<h1 className='text-3xl font-bold'>철거전용모듈비계</h1>
				<div className='text-sm'>Demolition-Specific Modular Scaffolding</div>
				<div className='my-4 font-semibold'>
					“철거현장에 특화된 모듈형 비계시스템으로 안전한 철거현장을
					구축합니다.”
				</div>
				<div className=''>
					철거전용 모듈비계는
					<div className='text-primary font-semibold'>
						건축용 비계를 철거현장에 그대로 사용하고 있는데 철거현장에 과연
						적합한가?
					</div>
					라는 의문에서 시작되었습니다.
				</div>
				<div className='my-4'>
					매년 비계공사 추락사고로 인한 사망,부상자가 수백명에 달합니다.
				</div>
				<div className='mb-4'>
					신의환경은 해체전문기업으로{' '}
					<span className='text-primary font-semibold'>
						안전성,안정성,환경성,시공성,방호성
					</span>
					에 뛰어난 모듈비계시스템을 적용하여{' '}
					<span className='text-primary font-semibold'>안전한 해체현장</span>을
					제공합니다.
				</div>
			</div>
		</div>
	)
}

export default First
