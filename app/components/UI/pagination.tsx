import React from 'react'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	// 페이지 번호 배열 생성 (예: 1, 2, 3, ...)
	const getPageNumbers = () => {
		const pages = []
		for (let i = 1; i <= totalPages; i++) {
			pages.push(i)
		}
		return pages
	}

	return (
		<nav className='flex gap-3 justify-center my-4'>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
			>
				이전
			</button>
			{getPageNumbers().map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={
						page === currentPage
							? 'w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center'
							: 'w-10 h-10 rounded-full text-black hover:bg-gray-100 flex items-center justify-center transition cursor-pointer'
					}
				>
					{page}
				</button>
			))}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
			>
				다음
			</button>
		</nav>
	)
}

export default Pagination
