'use client'

import Table from '@/app/components/admin/table'
import { useRouter } from 'next/navigation'
export default function AdminDashboard() {
	const router = useRouter()
	const columns = [
		{ header: '번호', accessor: 'id', width: 'w-20' },
		{ header: '제목', accessor: 'name' },
		{ header: '이메일', accessor: 'email' },
		{ header: '가입일', accessor: 'joinDate' },
		{ header: '날짜', accessor: 'date' },
	]

	const data = [
		{
			id: 1,
			name: '홍길동',
			email: 'hong@example.com',
			joinDate: '2024-03-15',
			date: '2024-03-15',
		},
		{
			id: 2,
			name: '김철수',
			email: 'kim@example.com',
			joinDate: '2024-03-14',
			date: '2024-03-15',
		},
	]
	const handleRowClick = (row: any) => {
		console.log('Selected row:', row)
	}

	return (
		<div>
			<h1 className='text-2xl font-bold mb-4'>관리자 대시보드</h1>
			<Table columns={columns} data={data} onRowClick={handleRowClick} />
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
		</div>
	)
}
