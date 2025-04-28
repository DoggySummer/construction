import Image from 'next/image'
import Title from '../UI/title'
import Suit from '@/public/suit.png'

const detailExample = [
	{
		year: '2024',
		detail: [
			{
				date: '2024.12',
				content: '친환경 해체공법 특허 취득',
			},
			{
				date: '2024.09',
				content: '2024년 우수 건설업체 표창 (국토교통부)',
			},
			{
				date: '2024.06',
				content: '스마트 건설기술 연구소 설립',
			},
			{
				date: '2024.03',
				content: '건설신기술 제2024-xx호 지정',
			},
		],
	},
	{
		year: '2023',
		detail: [
			{
				date: '2023.11',
				content: 'ISO 14001(환경경영시스템) 인증 획득',
			},
			{
				date: '2023.08',
				content: '대형 구조물 해체 전문업체 등록',
			},
			{
				date: '2023.05',
				content: '자본금 50억원 증자',
			},
			{
				date: '2023.02',
				content: '친환경 해체공사 우수사례 대상 수상',
			},
		],
	},
	{
		year: '2022',
		detail: [
			{
				date: '2022.12',
				content: '기업부설 연구소 설립',
			},
			{
				date: '2022.09',
				content: '건설업 종합시공능력평가 상위 10% 달성',
			},
			{
				date: '2022.06',
				content: '지반개량 전문업체 등록',
			},
			{
				date: '2022.03',
				content: '철거해체공사업 면허 취득',
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
					{detailExample.map((item, i) => {
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
					<div key={i} className='mt-2 pb-3 border-b border-gray-500'>
						<span className='mr-5'>{item.date}</span>
						<span>{item.content}</span>
					</div>
				)
			})}
		</div>
	)
}
