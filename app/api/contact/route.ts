import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
	ScanCommand,
	DynamoDBDocumentClient,
	PutCommand,
} from '@aws-sdk/lib-dynamodb'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()

		const title = formData.get('title') as string
		const name = formData.get('name') as string
		const email = formData.get('email') as string
		const content = formData.get('content') as string
		const file = formData.get('file') as File | null

		const key = `uploads/${Date.now()}-${file?.name}`
		if (!file) {
			return NextResponse.json({ error: '파일이 없습니다.' }, { status: 400 })
		}

		// File을 Buffer로 변환
		const fileBuffer = Buffer.from(await file.arrayBuffer())
		// 1. S3에 파일 업로드
		const s3Client = new S3Client({
			region: process.env.REGION!,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		})
		const uploadParams = new PutObjectCommand({
			Bucket: process.env.S3_BUCKET_NAME!,
			Key: key,
			Body: fileBuffer,
			ContentType: file.type,
		})

		await s3Client.send(uploadParams)
		console.log('s3진행')
		const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${key}`

		// 2. DynamoDB에 데이터 저장
		const client = new DynamoDBClient({
			region: process.env.REGION!,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		})
		const docClient = DynamoDBDocumentClient.from(client)
		const timestamp = new Date().toISOString()
		const params = {
			TableName: process.env.DYNAMODB_TABLE_NAME!, // 환경 변수에서 테이블 이름 가져오기
			Item: {
				id: Date.now().toString(), // 고유 ID
				subTable: 'contact',
				title: title,
				content: content,
				name: name,
				email: email,
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
				id: params.Item.id,
				title,
				content,
				name,
				email,
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

export async function GET() {
	try {
		const client = new DynamoDBClient({
			region: process.env.REGION!,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		})

		const docClient = DynamoDBDocumentClient.from(client)

		const command = new ScanCommand({
			TableName: process.env.DYNAMODB_TABLE_NAME!,
		})

		const response = await docClient.send(command)

		return NextResponse.json({
			success: true,
			data: response.Items,
		})
	} catch (error) {
		console.error(
			'데이터 조회 실패:',
			error instanceof Error ? error.message : error
		)
		return NextResponse.json(
			{ error: '데이터 조회에 실패했습니다.' },
			{ status: 500 }
		)
	}
}
