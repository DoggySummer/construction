import React from 'react'

interface PopupProps {
	title: string
	isOpen: boolean
	onClose: () => void
	type: number
}

const Popup: React.FC<PopupProps> = ({ title, isOpen, onClose, type }) => {
	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 flex items-center justify-center z-50'
			onClick={onClose}
		>
			{/* 뒷 배경 레이어 */}
			<div className='absolute inset-0 bg-black opacity-50'></div>

			{/* 팝업 컨텐츠 */}
			<div
				className='bg-white rounded-lg relative z-10 lg:w-[600px] w-[90%] '
				onClick={(e) => e.stopPropagation()}
			>
				<div className='border-b pb-2 mb-4 bg-primary p-3 rounded-t-lg flex justify-between items-center'>
					<h2 className='text-xl font-semibold text-white'>{title}</h2>
					{/* X 버튼 */}
					<button
						onClick={onClose}
						className='text-black text-2xl hover:text-gray-700'
					>
						✕
					</button>
				</div>
				{type === 1 ? <Email /> : <Individual />}
			</div>
		</div>
	)
}

const Email = () => {
	const text = `본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며 이를 위반시 정보통신망법에 의해 형사처벌됨을 유념하시기 바랍니다.`
	return <div className='px-3  pb-5'>{text}</div>
}

const Individual = () => {
	return (
		<div className='px-3 pb-5 max-w-[500px] text-sm overflow-scroll max-h-[300px]'>
			<div className='mb-10'>
				<div className='mb-4'>
					'주식회사 신의환경'(이하 '회사'라 한다)은 고객님의 개인정보를 소중히
					여기며, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」과
					「개인정보 보호법」 등 관련 법령을 준수하고 있습니다.
				</div>
				<div className='mb-4'>
					회사는 개인정보처리방침을 통해 고객님께서 제공하는 개인정보가 어떠한
					용도와 방식으로 이용되며, 개인정보 보호를 위해 어떤 조치가 취해지고
					있는지 안내합니다.
				</div>
				본 방침은 2025년 04월 28일부터 시행됩니다.
			</div>
			<IndividualContent
				title='1. 수집하는 개인정보 항목'
				content='회사는 상담 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.'
			>
				<br /> 온라인 문의 <br /> - 수집항목 : 이름, 연락처, 이메일, 문의내용 등{' '}
				<br /> ※ 회사는 최소한의 개인정보만을 수집하며, 민감정보는 수집하지
				않습니다.
			</IndividualContent>
			<IndividualContent
				title='2. 개인정보의 수집 및 이용목적'
				content='회사는 상담 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.'
			>
				<br />
				<div className='mb-1'>* 서비스 제공 및 이행</div>
				<div className='mb-1'>* 고객문의 및 상담 처리</div>
				<div className='mb-1'>* 민원처리 및 분쟁 대응</div>
				<div className='mb-1'>* 서비스 품질 향상 및 개선</div>
			</IndividualContent>
			<IndividualContent
				title='3. 개인정보의 보유 및 이용기간'
				content='회사는 개인정보 수집 및 이용 목적이 달성된 후에는 지체 없이 해당 정보를
				파기합니다. 다만, 관련 법령에 따라 다음과 같이 일정 기간 보존할 수
				있습니다.'
			>
				<table className='min-w-full table-auto border-collapse mt-10'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2'>보존 항목</th>
							<th className='border px-4 py-2'>보존 근거</th>
							<th className='border px-4 py-2'>보존 기간</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className='border px-4 py-2'>계약 또는 청약철회 기록</td>
							<td className='border px-4 py-2'>
								전자상거래 등에서의 소비자 보호에 관한 법률
							</td>
							<td className='border px-4 py-2'>5년</td>
						</tr>
						<tr>
							<td className='border px-4 py-2'>
								대금결제 및 재화 등 공급 기록
							</td>
							<td className='border px-4 py-2'>
								전자상거래 등에서의 소비자 보호에 관한 법률
							</td>
							<td className='border px-4 py-2'>5년</td>
						</tr>
						<tr>
							<td className='border px-4 py-2'>
								소비자의 불만 및 분쟁처리 기록
							</td>
							<td className='border px-4 py-2'>
								전자상거래 등에서의 소비자 보호에 관한 법률
							</td>
							<td className='border px-4 py-2'>3년</td>
						</tr>
					</tbody>
				</table>
			</IndividualContent>
			<IndividualContent
				title='4. 개인정보의 파기 절차 및 방법'
				content='회사는 개인정보 보유기간이 경과하거나 처리 목적이 달성된 경우에는 지체 없이 개인정보를 파기합니다.'
			>
				<div className='mt-4 mb-1'>
					파기 절차: 목적 달성 후 별도 DB에 분리 저장 후 일정 기간 보관한 후
					파기
				</div>
				<div className='mb-1'>
					파기 방법: 전자적 파일은 복구 불가능한 기술적 방법으로 삭제, 종이
					문서는 분쇄 또는 소각 처리
				</div>
			</IndividualContent>
			<IndividualContent
				title='5. 개인정보의 제3자 제공'
				content='회사는 원칙적으로 고객님의 개인정보를 외부에 제공하지 않습니다. 다만, 다음의 경우에는 예외로 합니다.'
			>
				<ul className='my-3'>
					<li>* 고객님의 사전 동의를 얻은 경우</li>
					<li>* 법령에 규정된 경우 </li>
					<li>
						* 법령에 규정된 경우 수사기관의 요청에 의해 적법한 절차를 거친 경우
					</li>
				</ul>
			</IndividualContent>
			<IndividualContent
				title='6. 개인정보 처리위탁'
				content='회사는 서비스 제공을 위해 개인정보 처리를 위탁하고 있으며, 수탁자 및 업무 내용은 다음과 같습니다.'
			>
				<ul className='my-3'>
					<li>수탁자 : 정길웅(프리랜서)</li>
					<li>위탁 업무 내용: 웹사이트 호스팅 및 시스템 관리 (AWS 사용)</li>
				</ul>
			</IndividualContent>
			<IndividualContent
				title='7. 이용자 및 법정대리인의 권리와 그 행사방법'
				content='이용자 및 법정대리인은 언제든지 등록된 본인 개인정보에 대해 다음의 권리를 행사할 수 있습니다.'
			>
				<ul className='my-3'>
					<li>* 개인정보 열람요구</li>
					<li>* 오류 등에 대한 정정요구</li>
					<li>* 삭제요구</li>
					<li>* 처리정지 요구</li>
					<li>* 동의 철회 요청</li>
				</ul>
				<div className='font-semibold'>행사 방법</div>
				<div>
					홈페이지, 전화, 이메일을 통해 요청할 수 있으며, 회사는 본인 확인
					절차를 거쳐 지체 없이 조치합니다.
				</div>
			</IndividualContent>
			<IndividualContent
				title='8. 개인정보 보호책임자'
				content='회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 관련 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.'
			>
				<div className='font-semibold'>개인정보 보호책임자</div>
				<ul className='my-3'>
					<li>* 성명 :</li>
					<li>* 전화번호 : </li>
					<li>* 이메일 : </li>
				</ul>
				<div>
					※ 개인정보 관련 문의는 위 연락처로 해주시면 신속하고 성실하게
					답변드리겠습니다.
				</div>
			</IndividualContent>
			<IndividualContent
				title='9. 권익침해 구제방법'
				content='고객님은 개인정보 침해에 대해 아래 기관에 상담 또는 분쟁 조정을 신청할 수 있습니다.'
			>
				<ul className='my-3'>
					<li>* 개인정보침해신고센터: privacy.kisa.or.kr / ☎ 118</li>
					<li>* 대검찰청 사이버수사과: www.spo.go.kr / ☎ 1301</li>
					<li>* 경찰청 사이버범죄수사단: www.police.go.kr / ☎ 182</li>
				</ul>
			</IndividualContent>
		</div>
	)
}

type IndividualContentProps = {
	title: string
	content: string
	children: React.ReactNode
}

const IndividualContent = (props: IndividualContentProps) => {
	const { title, content, children } = props
	return (
		<div className='mb-10'>
			<h2 className='text-lg font-semibold'>{title} </h2>
			<div>{content}</div>
			{children}
		</div>
	)
}
export default Popup
