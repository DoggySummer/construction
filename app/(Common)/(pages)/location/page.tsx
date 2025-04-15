'use client'

import { useEffect, useRef } from 'react'
import Title from '@/app/components/UI/title'

declare global {
	interface Window {
		kakao: any
	}
}

const KakaoMap = () => {
	const mapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const script = document.createElement('script')
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JSKEY}&autoload=false`
		script.async = true
		document.head.appendChild(script)

		script.onload = () => {
			window.kakao.maps.load(() => {
				const container = mapRef.current
				if (!container) return

				const center = new window.kakao.maps.LatLng(
					37.3368209466577,
					127.249150779289
				)

				const options = {
					center,
					level: 3,
				}

				const map = new window.kakao.maps.Map(container, options)

				const marker = new window.kakao.maps.Marker({
					position: center,
					map, // ← 여기 중요!
				})

				const infowindow = new window.kakao.maps.InfoWindow({
					content: '<div style="padding:5px;">신의건설</div>',
				})

				// 마커 클릭 이벤트
				window.kakao.maps.event.addListener(marker, 'click', () => {
					infowindow.open(map, marker)
				})
			})
		}
	}, [])

	return (
		<div className='w-full mx-auto mt-40 defaultWidth'>
			<Title title='오시는 길' />
			<div
				ref={mapRef}
				style={{
					width: '100%',
					height: '400px',
					border: '1px solid #eee',
				}}
			/>
			<div className='mt-10 flex text-2xl font-bold'>주소</div>
			<div className='mt-2 mb-10'>
				경기 용인시 처인구 모현읍 백옥대로 2387-1 (왕산리) 1층
			</div>
		</div>
	)
}

export default KakaoMap
