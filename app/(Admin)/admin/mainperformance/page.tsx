'use client'

import PaginationTable from '@/app/components/admin/table'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const AdminQuestionnaire = () => {
	const router = useRouter()
	const [dataList, setDataList] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/contact')
			const data = await response.json()
			console.log(data.data)
			const formattedData = data.data.map((item: any) => ({
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
			header: '이름',
			accessor: 'name',
			width: 'w-20',
			type: 'text' as const,
		},
		{ header: '제목', accessor: 'title', type: 'text' as const },
		{ header: '이메일', accessor: 'email', type: 'text' as const },
		{ header: '내용', accessor: 'content', type: 'text' as const },
		{ header: '이미지', accessor: 'imageUrl', type: 'image' as const },
		{ header: '생성일자', accessor: 'createdAt', type: 'text' as const },
	]
	const handleRowClick = (row: any) => {
		router.push(`/admin/question/${row.id}`)
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
