import Image from 'next/image'
import Title from '../UI/title'
import shakehands from '@/public/shakehands.png'

const text = [
	'(주)신의환경은 창업 이래 장인 정신을 바탕으로 꾸준한 발전을 거듭하여 왔습니다. 당사는 변화를 두려워하지 않고 지속 성장 가능한 최고의 전문건설사로 도약하기 위해 최선의 노력을 기울이고 있으며, 이를 위해 기존 주력사업에 총력을 기울일 뿐만 아니라 신성장 사업 진출을 위한 선택적 전략 개발에 힘쓰고 있습니다.',

	'지금 이 시간에도 저를 비롯한 (주)신의환경의 임직원 모두는 최고의 시공과 서비스를 창출하며 산업 발전과 인류 사회에 기여한다는 자부심으로 혁신과 도전을 지속하며 작은 일에 정성을 다하는 기업가 정신으로 고객의 신뢰에 더욱 보답하고자 합니다.',

	'동종업계 최고 모범이 되도록 계속 노력할 것을 약속드리며, 끊임없는 지도 편달과 관심을 가져주시고 모든 분의 앞날에 무궁한 발전이 있기를 기원합니다.',
]

const CEOPage = () => {
	return (
		<div>
			<Title title='CEO 인사말' />
			<Image
				src={shakehands}
				alt='ceo'
				width={1536}
				height={1024}
				className='contentSize h-100 object-cover rounded-lg'
			/>
			<div className='flex gap-4 contentSize my-10'>
				<div className='flex flex-col flex-1/2'>
					<div className='text-2xl font-bold pb-3'>
						전문성과 신뢰성을 갖춘 해체 및 폐기물 처리
					</div>
					<div className='text-5xl font-bold mb-10'>
						<span className='text-primary'>신의환경</span>에 맡겨주세요.
					</div>
				</div>
				<div className='flex flex-col flex-1/2'>
					{text.map((item, i) => {
						return (
							<div className='text-base pb-6' key={i}>
								{item}
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default CEOPage
