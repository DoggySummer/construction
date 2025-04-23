'use client'
import { useEffect, useRef } from 'react'
import { Phone, Mail, Printer } from 'lucide-react'
import Title from '../UI/title'

declare global {
	interface Window {
		kakao: any
	}
}

const Map = () => {
	const mapRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const script = document.createElement('script')
		console.log(process.env.NEXT_PUBLIC_JSKEY)
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_JSKEY}&autoload=false`
		script.async = true
		document.head.appendChild(script)

		script.onload = () => {
			window.kakao.maps.load(() => {
				const container = mapRef.current
				if (!container) return

				const center = new window.kakao.maps.LatLng(
					37.3222540483788,
					127.242665596471
				)

				const options = {
					center,
					level: 3,
				}

				const map = new window.kakao.maps.Map(container, options)

				const marker = new window.kakao.maps.Marker({
					position: center,
					map,
				})

				const infowindow = new window.kakao.maps.InfoWindow({
					content: `
						<div style="padding:5px 8px;width:max-content;display:flex;justify-content:center;align-items:center;">
							<span style="font-size:12px;">경기 용인시 처인구 모현읍 백옥대로 2387-1</span>
						</div>
					`,
				})

				// 마커 위에 인포윈도우 바로 표시
				infowindow.open(map, marker)

				// 마커 클릭 이벤트 (선택사항)
				window.kakao.maps.event.addListener(marker, 'click', () => {
					infowindow.open(map, marker)
				})
			})
		}
	}, [])
	return (
		<>
			<Title title='오시는길' />
			<div
				ref={mapRef}
				style={{
					width: '100%',
					height: '400px',
					border: '1px solid #eee',
				}}
				className='contentSize'
			/>
			<div className='flex flex-col contentSize mt-8 mb-10'>
				<div className='flex items-center mb-4'>
					<div className='text-xl font-semibold'>주식회사 신의환경</div>
					<div className='w-[1px] h-4 mx-4 bg-gray-300' />
					<div className='text-xl'>
						경기 용인시 처인구 모현읍 파담로 140-14, 103호
					</div>
				</div>
				<div className='flex gap-10'>
					<div className='text-xl font-semibold flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<Phone color='#095693' />
							<div className='flex items-center'>전화</div>
						</div>
						<div className='w-[1px] h-4 bg-gray-300' />
						<div className='text-base font-normal flex items-center'>
							031-334-1725
						</div>
					</div>
					<div className='text-xl font-semibold flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<Printer color='#095693' />
							<div className='flex items-center'>팩스</div>
						</div>
						<div className='w-[1px] h-4 bg-gray-300' />
						<div className='text-base font-normal flex items-center'>
							031-334-1724
						</div>
					</div>
					<div className='text-xl font-semibold flex items-center gap-4'>
						<div className='flex items-center gap-2'>
							<Mail color='#095693' />
							<div className='flex items-center'>이메일</div>
						</div>
						<div className='w-[1px] h-4 bg-gray-300' />
						<div className='text-base font-normal flex items-center'>
							trust1725@naver.com
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Map
