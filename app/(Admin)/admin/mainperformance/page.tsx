'use client'

import PaginationTable from '@/app/components/admin/table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Performance } from '@/app/constants/type'
import { formatDate } from '@/app/constants/utils'
const AdminQuestionnaire = () => {
	const router = useRouter()
	const [dataList, setDataList] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/performance')
			const data = await response.json()
			console.log(data.items)
			const formattedData = data.items.map((item: Performance) => ({
				...item,
				contractPeriod:
					formatDate(item.constructionStartDate) +
					' ~ ' +
					formatDate(item.constructionEndDate),
				performanceType: (() => {
					switch (item.performanceType) {
						case '2':
							return '구조물 해체공사'
						case '3':
							return '석면해체공사'
						case '4':
							return '토공사'
						case '1':
						default:
							return '철거전용모듈비계'
					}
				})(),
			}))
			setDataList(formattedData)
		}
		fetchData()
	}, [])
	const columns = [
		{ header: '사업종류', accessor: 'performanceType', type: 'text' as const },
		{ header: '제목', accessor: 'title', type: 'text' as const },
		{ header: '원도급', accessor: 'primeContractor', type: 'text' as const },
		{ header: '발주자', accessor: 'clientName', type: 'text' as const },
		{ header: '이미지', accessor: 'mainPhoto', type: 'image' as const },
		{ header: '계약기간', accessor: 'contractPeriod', type: 'text' as const },
	]
	const handleRowClick = (row: any) => {
		router.push(`/admin/mainperformance/${row.id}`)
	}
	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>관리자 대시보드</h1>
			<PaginationTable
				columns={columns}
				data={dataList}
				onRowClick={handleRowClick}
			/>
			<button
				onClick={() => router.push('/admin/mainperformance/add')}
				className='mb-4 px-4 py-2 bg-primary text-white rounded-lg cursor-pointer flex items-center'
			>
				추가하기
			</button>
		</>
	)
}

export default AdminQuestionnaire
