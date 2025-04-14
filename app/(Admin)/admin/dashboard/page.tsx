'use client'

import PaginationTable from '@/app/components/admin/table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Dashboard = () => {
	const router = useRouter()
	const [dataList, setDataList] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/dashboard')
			const data = await response.json()
			const formattedData = data.items.map((item: any) => ({
				...item,
				createdAt: new Date(item.createdAt).toLocaleString('ko-KR', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
					second: '2-digit',
					hour12: false,
				}),
			}))
			setDataList(formattedData)
		}
		fetchData()
	}, [])
	const columns = [
		{
			header: '아이디',
			accessor: 'example',
			width: 'w-20',
			type: 'text' as const,
		},
		{ header: '제목', accessor: 'title', type: 'text' as const },
		{ header: '내용', accessor: 'content', type: 'text' as const },
		{ header: '이미지', accessor: 'imageUrl', type: 'image' as const },
		{ header: '생성일자', accessor: 'createdAt', type: 'text' as const },
	]
	const handleRowClick = (row: any) => {
		router.push(`/admin/dashboard/${row.example}`)
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
				onClick={() => router.push('/admin/upload')}
				className='px-4 mt-20 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-5 w-5'
					viewBox='0 0 20 20'
					fill='currentColor'
				>
					<path
						fillRule='evenodd'
						d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z'
						clipRule='evenodd'
					/>
				</svg>
				<span>업로드</span>
			</button>
		</>
	)
}

export default Dashboard
