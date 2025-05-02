import Image from 'next/image'
import Title from '../UI/title'
import logoLeaf from '@/public/logo-leaf.png'

const title =
	'신의환경은 모듈형 비계시스템을 바탕으로 친환경적이고 안전성을 겸비하여 경직된 해체공사 시장을 미래지향적으로 진보해 나가고 있습니다'
const text = [
	'저희 (주)신의환경은 2009년에 설립되어 비계구조물해체업, 토공사업, 석면해체제거업, 비계제조업을 전문으로 하는 기업입니다. 다년간의 현장 경험을 바탕으로, 각 분야에서 최고 수준의 기술력과 안전성을 자랑하며 지속적으로 발전하고 있습니다',
	'(주)신의환경 임직원 모두는 철거 현장에서 발생할 수 있는 안전사고를 예방하기 위한 연구개발에 끊임없이 매진하고 있으며, 현장에서 실제로 활용 가능한 기술과 시스템을 구현하여, 고객에게 최고의 안전과 품질을 제공하고 있습니다.',

	'신뢰와 믿음을 바탕으로 안전과 환경을 생각하는 기업으로 도약하겠습니다.',
	'대표이사 양 희 제',
]

const CEOPage = () => {
	return (
		<div>
			<Title title='CEO 인사말' />

			<div className='flex gap-4 contentSize my-10 break-keep'>
				<div className='flex flex-col flex-1/2 items-center justify-center'>
					<Image
						src={logoLeaf}
						alt='logo'
						width={253}
						height={231}
						className='w-1/3 object-cover'
					/>
					<div className='text-6xl mt-10 font-bold flex items-center leading-none text-primary justify-center'>
						<div className='w-[5px] h-[calc(100%-5px)] mt-1 bg-primary' />
						<span className='mx-1'>주</span>
						<div className='w-[5px] h-[calc(100%-5px)] mt-1 bg-primary mr-1' />
						신의환경
					</div>
				</div>
				<div className='flex flex-col flex-1/2 items-start'>
					<div className='font-semibold text-xl pb-6'>{title}</div>
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
