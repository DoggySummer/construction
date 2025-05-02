import Image from 'next/image'
import sixthImage from '@/public/biz_6.jpg'

const Sixth = () => {
	return (
		<div className='flex contentSize mt-10 gap-10 mb-10 justify-center break-keep'>
			<Image src={sixthImage} alt='first' className='w-1/3 object-cover' />
			<div className='flex flex-col w-1/2'>
				<h1 className='text-3xl font-bold'>해체계획서 작성 </h1>
				<div className='text-sm'>Demolition Plan</div>
				<div className='my-4 font-semibold'>
					“법적 요건과 현장 실무를 모두 반영한 맞춤형 계획”
				</div>
				<div className='text-primary font-semibold'>
					수많은 실무 경험과 데이터를 기반으로, 해체계획의 모든 것을 책임집니다
				</div>
				<div>
					신의환경은 수년간{' '}
					<span className='text-primary font-semibold'>
						해체공사 신고 및 허가심의 업무를 다수 수행
					</span>
					하며 축적한 경험과 데이터를 바탕으로,
				</div>
				<div className='mb-4'>
					<span className='text-primary font-semibold'>
						해체계획서 작성부터 허가 심의 대응까지 원스톱 솔루션
					</span>
					을 제공합니다.
				</div>
				<div>단순한 문서 작성이 아닌, 실제 현장의 여건과 법적 요건을</div>
				<div>
					모두 고려한{' '}
					<span className='text-primary font-semibold'>
						정확하고 신뢰도 높은 계획서
					</span>
					를 통해,
				</div>
				<div className='mb-4'>
					복잡한 행정 절차에 대한 부담을 줄이고{' '}
					<span className='text-primary font-semibold'>신속한 허가 진행</span>을
					지원합니다.
				</div>
				<div className='text-primary font-semibold'>
					해체계획은 종이 한 장이 아닌, 안전을 위한 설계도입니다.
				</div>
				<div>
					신의환경은 해체공사의 시작부터 끝까지,{' '}
					<span className='text-primary font-semibold'>
						안전과 신뢰를 함께 계획합니다.
					</span>
				</div>
			</div>
		</div>
	)
}

export default Sixth
