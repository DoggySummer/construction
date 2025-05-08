import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
	DynamoDBDocumentClient,
	ScanCommand,
	DeleteCommand,
	GetCommand,
	UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const id = url.pathname.split('/').pop()
	const client = new DynamoDBClient({
		region: process.env.REGION,
		credentials: {
			accessKeyId: process.env.ACCESS_KEY_ID!,
			secretAccessKey: process.env.SECRET_ACCESS_KEY!,
		},
	})
	const docClient = DynamoDBDocumentClient.from(client)

	const params = {
		TableName: process.env.DYNAMODB_TABLE_NAME!,
		FilterExpression: 'subTable = :subTable AND id = :id',
		ExpressionAttributeValues: {
			':subTable': 'performance',
			':id': id,
		},
	}

	try {
		const data = await docClient.send(new ScanCommand(params))
		return NextResponse.json(data.Items)
	} catch (error) {
		console.error('데이터 조회 실패:', error)
		return NextResponse.json(
			{ error: '데이터 조회에 실패했습니다.' },
			{ status: 500 }
		)
	}
}

export async function DELETE(request: Request) {
	try {
		const url = new URL(request.url)
		const id = url.pathname.split('/').pop()

		// DynamoDB에서 이미지 URL 정보 먼저 가져오기
		const client = new DynamoDBClient({
			region: process.env.REGION,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		})
		const docClient = DynamoDBDocumentClient.from(client)

		// 삭제하기 전에 데이터 조회
		const getParams = {
			TableName: process.env.DYNAMODB_TABLE_NAME!,
			Key: {
				id: id,
				subTable: 'performance',
			},
		}
		const itemData = await docClient.send(new GetCommand(getParams))

		// S3 클라이언트 초기화
		const s3Client = new S3Client({
			region: process.env.REGION,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		})

		// 이미지 필드 배열
		const imageFields = [
			'mainPhoto',
			'subPhoto1',
			'subPhoto2',
			'subPhoto3',
			'subPhoto4',
		]

		// S3에서 이미지 삭제
		if (itemData.Item) {
			for (const field of imageFields) {
				if (itemData.Item[field]) {
					const imageKey = itemData.Item[field].split('/').pop() // URL에서 키 추출
					try {
						await s3Client.send(
							new DeleteObjectCommand({
								Bucket: process.env.S3_BUCKET_NAME!,
								Key: imageKey,
							})
						)
					} catch (error) {
						console.error(`이미지 삭제 실패 (${field}):`, error)
					}
				}
			}
		}

		// DynamoDB에서 데이터 삭제
		const deleteCommand = new DeleteCommand({
			TableName: process.env.DYNAMODB_TABLE_NAME!,
			Key: {
				id: id,
				subTable: 'performance',
			},
		})

		await docClient.send(deleteCommand)

		return NextResponse.json({
			success: true,
			message: '데이터와 이미지가 성공적으로 삭제되었습니다.',
		})
	} catch (error) {
		console.error('삭제 실패:', error instanceof Error ? error.message : error)
		return NextResponse.json(
			{
				success: false,
				error: '데이터 삭제에 실패했습니다.',
			},
			{ status: 500 }
		)
	}
}

export async function PATCH(request: Request) {
	const url = new URL(request.url)
	const id = url.pathname.split('/').pop()
	const client = new DynamoDBClient({
		region: process.env.REGION,
		credentials: {
			accessKeyId: process.env.ACCESS_KEY_ID!,
			secretAccessKey: process.env.SECRET_ACCESS_KEY!,
		},
	})
	const docClient = DynamoDBDocumentClient.from(client)

	const body = await request.json()
	const { mainPhoto, subPhoto1, subPhoto2, subPhoto3, subPhoto4 } = body

	const updateCommand = new UpdateCommand({
		TableName: process.env.DYNAMODB_TABLE_NAME!,
		Key: {
			id: id,
			subTable: 'performance',
		},
		UpdateExpression:
			'set mainPhoto = :mainPhoto, subPhoto1 = :subPhoto1, subPhoto2 = :subPhoto2, subPhoto3 = :subPhoto3, subPhoto4 = :subPhoto4',
		ExpressionAttributeValues: {
			':mainPhoto': mainPhoto,
			':subPhoto1': subPhoto1,
			':subPhoto2': subPhoto2,
			':subPhoto3': subPhoto3,
			':subPhoto4': subPhoto4,
		},
	})

	try {
		await docClient.send(updateCommand)
		return NextResponse.json({
			success: true,
			message: '데이터가 성공적으로 업데이트되었습니다.',
		})
	} catch (error) {
		console.error(
			'업데이트 실패:',
			error instanceof Error ? error.message : error
		)
		return NextResponse.json(
			{
				success: false,
				error: '데이터 업데이트에 실패했습니다.',
			},
			{ status: 500 }
		)
	}
}
