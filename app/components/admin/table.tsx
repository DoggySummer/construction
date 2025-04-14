'use client'

import Image from 'next/image'
import { useState } from 'react'

interface TableColumn {
	header: string
	accessor: string
	width?: string
	type?: 'image' | 'text'
}

interface PaginationTableProps {
	columns: TableColumn[]
	data: any[]
	onRowClick?: (row: any) => void
	itemsPerPage?: number
}

export default function PaginationTable({
	columns,
	data,
	onRowClick,
	itemsPerPage = 5,
}: PaginationTableProps) {
	const [currentPage, setCurrentPage] = useState(1)

	// 페이지네이션 계산
	const totalPages = Math.ceil(data.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const paginatedData = data.slice(startIndex, startIndex + itemsPerPage)

	// 셀 내용을 렌더링하는 함수
	const renderCell = (column: TableColumn, value: any) => {
		if (column.type === 'image') {
			return (
				<div className='relative w-20 h-20'>
					<Image
						src={value}
						alt='Preview'
						fill
						className='object-cover rounded-md'
						sizes='80px'
					/>
				</div>
			)
		}
		return value
	}

	// 페이지 변경 핸들러
	const handlePageChange = (page: number) => {
		setCurrentPage(page)
	}

	return (
		<div className='space-y-4'>
			<div className='overflow-x-auto rounded-lg border border-gray-200'>
				<table className='min-w-full divide-y divide-gray-200'>
					<thead className='bg-gray-50'>
						<tr>
							{columns.map((column, index) => (
								<th
									key={index}
									scope='col'
									className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 ${
										column.width || ''
									}`}
								>
									<div className='flex items-center space-x-1'>
										<span>{column.header}</span>
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody className='bg-white divide-y divide-gray-200'>
						{paginatedData.map((row, rowIndex) => (
							<tr
								key={rowIndex}
								onClick={() => onRowClick && onRowClick(row)}
								className={`${
									onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
								}`}
							>
								{columns.map((column, colIndex) => (
									<td
										key={colIndex}
										className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
											column.type === 'image' ? 'w-20' : ''
										}`}
									>
										{renderCell(column, row[column.accessor])}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* 페이지네이션 */}
			<div className='flex justify-center items-center space-x-2'>
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className='px-3 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed'
				>
					이전
				</button>

				{/* 페이지 번호 */}
				{[...Array(totalPages)].map((_, i) => (
					<button
						key={i + 1}
						onClick={() => handlePageChange(i + 1)}
						className={`px-3 py-1 rounded-md ${
							currentPage === i + 1
								? 'bg-neutral-800 text-white'
								: 'bg-neutral-100 hover:bg-neutral-200'
						}`}
					>
						{i + 1}
					</button>
				))}

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className='px-3 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed'
				>
					다음
				</button>
			</div>
		</div>
	)
}
