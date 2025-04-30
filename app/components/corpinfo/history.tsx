import Image from 'next/image'
import Title from '../UI/title'
import Suit from '@/public/suit.png'

const detailedContent = [
	{
		year: '2025',
		detail: [
			{
				date: '2025.01',
				content: '친환경 해체공법 특허 취득',
			},
			{
				date: '2025.02',
				content:
					'건축물 해체 현장에 적용되는 모듈형 비계 설치 공법 국토부 건설신기술지정 (제 1014호)',
			},
		],
	},
	{
		year: '2023',
		detail: [
			{
				date: '2023.02',
				content: '토목사업 취득',
			},
			{
				date: '2023.04',
				content: '주식회사 신의환경 기업부설연구소 설립',
			},
			{
				date: '2023.06',
				content: '폐기물처리(재활용)[폐전선, 고철] 등 신고',
			},
			{
				date: '2023.12',
				content:
					'방호부재를 가지는 모듈형 비계시스템 특허등록 (제 10-2619452호)',
			},
		],
	},
	{
		year: '2021',
		detail: [
			{
				date: '2021.12',
				content: '대전 홈플러스(둔산점) 건물 및 공작물 철거공사 수주',
			},
		],
	},
	{
		year: '2018',
		detail: [
			{
				date: '2018.09',
				content: '부평 이마트 철거공사 수주',
			},
		],
	},
	{
		year: '2016',
		detail: [
			{
				date: '2016.01',
				content: 'KT 부천소사 해체공사 수주',
			},
		],
	},
	{
		year: '2010',
		detail: [
			{
				date: '2010.01',
				content: '비계구조물해체업 획득\n석면해체제거업 획득',
			},
		],
	},
	{
		year: '2009',
		detail: [
			{
				date: '2009.12',
				content: '주식회사 신의환경 설립',
			},
		],
	},
]

const History = () => {
	return (
		<div className='contentSize'>
			<Title title='회사연혁' />
			<div className='flex w-full justify-between gap-4'>
				<div className='flex flex-col w-1/2'>
					{detailedContent.map((item, i) => {
						return (
							<HistoryContent key={i} year={item.year} detail={item.detail} />
						)
					})}
				</div>
				<div className='w-1/3'>
					<Image
						src={Suit}
						width={1920}
						height={1080}
						alt='상장'
						className='h-40 object-fill'
					/>
				</div>
			</div>
		</div>
	)
}

export default History

type detail = {
	date: string
	content: string
}

type HistoryContentProps = {
	year: string
	detail: detail[]
}
const HistoryContent = (props: HistoryContentProps) => {
	const { year, detail } = props
	return (
		<div className='mb-12'>
			<div className='text-gray-600 font-semibold text-2xl w-full pb-3 border-b-2 border-primary'>
				{year}
			</div>
			{detail.map((item, i) => {
				return (
					<div
						key={i}
						className='mt-2 pb-3 border-b border-gray-500 flex justify-start'
					>
						<div className='mr-5 w-15 '>{item.date}</div>
						<div className='pr-3 whitespace-pre-line'>{item.content}</div>
					</div>
				)
			})}
		</div>
	)
}
