// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import AWS from 'aws-sdk'

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
})

const ses = new AWS.SES({ apiVersion: '2010-12-01' })

export async function POST(req: NextRequest) {
	try {
		console.log('SES_TO_EMAIL:', process.env.SES_TO_EMAIL)
		const formData = await req.formData()
		const name = formData.get('name') as string
		const email = formData.get('email') as string
		const message = formData.get('message') as string
		const file = formData.get('file') as File | null

		let attachmentPart = ''
		if (file) {
			const buffer = Buffer.from(await file.arrayBuffer())
			const content = buffer.toString('base64')

			attachmentPart = `
--NextPart
Content-Type: ${file.type}; name="${file.name}"
Content-Disposition: attachment; filename="${file.name}"
Content-Transfer-Encoding: base64

${content}`
		}

		const rawMessage = `From: ${process.env.SES_FROM_EMAIL}
To: ${process.env.SES_TO_EMAIL}
Subject: [문의사항] 웹사이트 문의가 도착했습니다
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="NextPart"

--NextPart
Content-Type: text/plain; charset="UTF-8"

이름: ${name}
이메일: ${email}

문의 내용:
${message}
${attachmentPart}
--NextPart--`

		const params = {
			RawMessage: {
				Data: Buffer.from(rawMessage),
			},
			Source: process.env.SES_FROM_EMAIL!,
		}

		const result = await ses.sendRawEmail(params).promise()

		return NextResponse.json({ success: true, messageId: result.MessageId })
	} catch (error: any) {
		console.error('SES Error:', error)
		return NextResponse.json(
			{ success: false, error: error.message },
			{ status: 500 }
		)
	}
}
