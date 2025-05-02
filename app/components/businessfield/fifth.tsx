import Image from 'next/image'
import fifthImage from '@/public/biz_5.jpg'

const Fifth = () => {
	return (
		<div className='flex contentSize mt-10 gap-10 mb-10 justify-center break-keep'>
			<Image src={fifthImage} alt='first' className='w-1/3 object-cover' />
			<div className='flex flex-col w-1/2'>
				<h1 className='text-3xl font-bold'>장비임대</h1>
				<div className='text-sm'>Equipment Rental</div>
				<div className='my-4 font-semibold'>
					“공사의 품질은 좋은 장비에서 시작됩니다.“
				</div>
				<div className='text-primary font-semibold'>
					철거현장에 최적화된 장비, 신의환경이 직접 보유하고 운용합니다
				</div>
				<div>신의환경은 철거 작업의 효율성과 안전성을 극대화하기 위해</div>
				<div className='text-primary font-semibold'>
					미니 굴착기부터 DX800LC 초대형 굴착기까지
				</div>
				<div className='mb-4'>
					다양한 규모의{' '}
					<span className='text-primary font-semibold'>
						{' '}
						굴착기 장비를 직접 보유 및 관리
					</span>
					하고 있습니다.
				</div>
				<div>
					<span className='text-primary font-semibold'>
						텐 굴착기, 데몰리션 굴착기
					</span>
					는 물론, 철거공사에 필수적인
				</div>
				<div>
					<span className='text-primary font-semibold'>
						압쇄기, 빔 압쇄기, 브레이커 등 다양한 어태치먼트
					</span>
					까지 완비되어 있어,
				</div>
				<div className='mb-4'>
					<span className='text-primary font-semibold'>
						현장 조건에 최적화된 맞춤형 장비 대응
					</span>
					이 가능합니다.
				</div>
				<div>
					장비를 단순 임대하는 것이 아닌,
					<div>
						<span className='text-primary font-semibold'>
							{' '}
							장비 성능에 대한 철저한 관리와 작업 환경에 맞는 정확한 선택
						</span>
						을 통해,
					</div>{' '}
					시공사의 시간과 비용을 절감시키는{' '}
					<span className='text-primary font-semibold'>
						신뢰할 수 있는 파트너
					</span>
					가 되어드립니다
				</div>
			</div>
		</div>
	)
}

export default Fifth
