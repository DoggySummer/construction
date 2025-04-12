const LandingAbout = () => {
	const title = `home\nimprovement\nspecialists`
	const detail = `신의환경은 믿을 수 있는 건설 파트너로서, 정직한 시공과 세심한 관리로 현장을 책임집니다.\n
수년간의 경험을 바탕으로 주거, 상업, 산업 현장 등 다양한 분야에서 전문성을 쌓아왔습니다.\n
고객의 요구를 정확히 파악하고, 최적의 솔루션으로 완성도 높은 결과를 제공합니다.\n
기초공사부터 마감까지 모든 과정에 정성을 다해 최고의 품질을 구현합니다.\n
명확한 커뮤니케이션과 체계적인 프로젝트 관리를 통해 신뢰를 쌓아갑니다.\n
신의환경과 함께라면, 더 나은 내일이 시작됩니다.`
	return (
		<div className='mt-40 px-30 flex justify-between items-center mb-30'>
			<div className='whitespace-pre-line text-3xl font-bold leading-normal'>
				{title}
			</div>
			<div className='whitespace-pre-line text-xl leading-4'>{detail}</div>
		</div>
	)
}

export default LandingAbout
