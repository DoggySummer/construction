import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '@/app/globals.css'
import Navbar from '@/app/components/UI/navbar'
import Footer from '@/app/components/UI/footer'

const notoSansKR = Noto_Sans_KR({
	weight: ['400', '500', '700'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: '신의환경',
	description: '신의환경 웹사이트',
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ko'>
			<body className={`${notoSansKR.className} antialiased`}>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	)
}
