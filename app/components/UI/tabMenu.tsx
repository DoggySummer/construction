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
		<nav className='flex max-w-[1200px] mx-auto justify-center mb-3'>
			{items.map((item, index) => (
				<Link
					key={item.id}
					href={item.navLink}
					className={`flex-1 text-center py-4 text-lg font-medium ${
						pathname.startsWith(item.navLink)
							? 'text-white bg-primary shadow-md'
							: 'text-black bg-white border-r border-gray-300 shadow-md'
					} ${index === 0 ? 'border-l border-gray-300' : ''}`}
				>
					{item.title}
				</Link>
			))}
		</nav>
	)
}

export default TabMenu
