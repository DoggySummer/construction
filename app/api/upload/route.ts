import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()

		const file = formData.get('file') as File | null
		const title = formData.get('title') as string
		const content = formData.get('content') as string
		console.log(file)
		const key = `uploads/${Date.now()}-${file?.name}`
		console.log(key)
		if (!file) {
			return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
		}

		// File을 Buffer로 변환
		const fileBuffer = Buffer.from(await file.arrayBuffer())
		console.log(fileBuffer)
		// 1. S3에 파일 업로드
		const s3Client = new S3Client({ region: process.env.AWS_REGION })
		const uploadParams = new PutObjectCommand({
			Bucket: process.env.AWS_S3_BUCKET_NAME!,
			Key: key,
			Body: fileBuffer,
			ContentType: file.type,
		})

		await s3Client.send(uploadParams)
		console.log('s3진행')
		const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

		// 2. DynamoDB에 데이터 저장
		const client = new DynamoDBClient({ region: process.env.AWS_REGION })
		const docClient = DynamoDBDocumentClient.from(client)
		const timestamp = new Date().toISOString()
		const params = {
			TableName: process.env.DYNAMODB_TABLE_NAME!, // 환경 변수에서 테이블 이름 가져오기
			Item: {
				example: Date.now().toString(), // 고유 ID
				title: title,
				content: content,
				imageUrl: imageUrl,
				createdAt: timestamp,
			},
		}
		console.log(params)
		try {
			const data = await docClient.send(new PutCommand(params))
			console.log(data)
		} catch (err) {
			console.error(err)
		}

		return NextResponse.json({
			success: true,
			data: {
				example: params.Item.example,
				title,
				content,
				imageUrl: imageUrl,
				createdAt: timestamp,
			},
		})
	} catch (error) {
		console.error(
			'파일 업로드 실패:',
			error instanceof Error ? error.message : error
		)
		return NextResponse.json(
			{ error: '파일 업로드에 실패했습니다.' },
			{ status: 500 }
		)
	}
}
