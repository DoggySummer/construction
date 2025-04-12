'use client'

import Image from 'next/image'

interface TableColumn {
	header: string
	accessor: string
	width?: string
	type?: 'image' | 'text'
}

interface TableProps {
	columns: TableColumn[]
	data: any[]
	onRowClick?: (row: any) => void
}

export default function Table({ columns, data, onRowClick }: TableProps) {
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

	return (
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
					{data.map((row, rowIndex) => (
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
	)
}
