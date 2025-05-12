'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface TabItem {
	id: string | number
	title: string
	navLink: string
}

interface TabMenuProps {
	items: TabItem[]
}

const TabMenu = ({ items }: TabMenuProps) => {
	const pathname = usePathname()

	return (
		<nav className='flex max-w-[1200px] mx-auto justify-start mb-3 bg-primary overflow-x-scroll'>
			{items.map((item, index) => (
				<Link
					key={item.id}
					href={item.navLink}
					className={`text-center px-4 py-3 lg:text-lg text-xs lg:flex-1 font-medium whitespace-nowrap ${
						pathname.startsWith(item.navLink)
							? 'text-black bg-white shadow-md'
							: 'bg-primary text-white shadow-md'
					} ${index === 0 ? 'border-l border-gray-300' : ''} 
					${index !== items.length - 1 ? 'border-r border-gray-300' : ''}`}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}

export default TabMenu
