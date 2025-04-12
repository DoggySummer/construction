'use client'

import Table from '@/app/components/admin/table'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Dashboard = () => {
	const [dataList, setDataList] = useState([])
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/api/dashboard')
			const data = await response.json()
			setDataList(data.items)
		}
		fetchData()
	}, [])
	const columns = [
		{
			header: 'example',
			accessor: 'example',
			width: 'w-20',
			type: 'text' as const,
		},
		{ header: 'title', accessor: 'title', type: 'text' as const },
		{ header: 'content', accessor: 'content', type: 'text' as const },
		{ header: 'imageUrl', accessor: 'imageUrl', type: 'image' as const },
		{ header: 'createdAt', accessor: 'createdAt', type: 'text' as const },
	]
	return (
		<>
			<h1 className='text-2xl font-bold mb-4'>관리자 대시보드</h1>
			<Table columns={columns} data={dataList} />
		</>
	)
}

export default Dashboard
