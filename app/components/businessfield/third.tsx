import Image from 'next/image'
import thirdImage from '@/public/biz_third.jpeg'

const Third = () => {
	return (
		<div className='flex contentSize mt-10 gap-10 mb-10 justify-center'>
			<Image src={thirdImage} alt='first' className='w-1/3 object-cover' />
			<div className='flex flex-col w-1/2'>
				<h1 className='text-3xl font-bold'>석면해체공사</h1>
				<div className='text-sm'>Asbestos Abatement</div>
				<div className='my-4 font-semibold'>
					“석면해체공사는 시공 경험이 많은 업체가 S급입니다“
				</div>
				<div className=''>
					석면해체공사는 건축물이나 설비에 포함된 석면 자재(함유량 1% 초과)를
					<div className='text-primary font-semibold'>
						외부 비산 없이 안전하게 해체·제거하는 작업
						<span className='text-black font-normal'>으로</span>
					</div>
					<div className='text-primary font-semibold'>
						고도의 기술력과 안전관리 체계가 요구되는 전문 공사
						<span className='text-black font-normal'>입니다.</span>
					</div>{' '}
				</div>
				<div className='my-4'>
					신의환경은{' '}
					<span className='font-semibold text-primary'>
						학교, 군부대, 근린생활시설 등 민감한 시설
					</span>
					의
					<div>
						석면 해체를 다수 수행해온{' '}
						<span className='font-semibold text-primary'>
							신뢰받는 석면해체 전문업체
						</span>
						입니다.
					</div>
				</div>
				<div className='mb-4'>
					또한,{' '}
					<span className='font-semibold text-primary'>
						석면 관련 장비를 자체 보유 및 관리
					</span>
					하여 현장 대응력과 작업 품질을 높였으며,
					<div>
						<span className='font-semibold text-primary'>
							고용노동부 산업안전보건법에 따른 허가를 취득한 합법적 시공업체
						</span>
						로,
					</div>
					<div>안전하고 책임감 있는 석면 해체 서비스를 제공합니다.</div>
				</div>
				<div className='font-semibold text-primary'>
					신의환경은 석면 해체의 책임을 '깨끗하게', 현장의 안전을 '완벽하게'
					지켜갑니다.
				</div>
			</div>
		</div>
	)
}

export default Third
