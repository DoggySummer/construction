import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	try {
		const url = new URL(request.url)
		const id = url.pathname.split('/').pop()
		const client = new DynamoDBClient({
			region: process.env_REGION!,
			credentials: {
				accessKeyId: process.env_ACCESS_KEY_ID!,
				secretAccessKey: process.env_SECRET_ACCESS_KEY!,
			},
		})

		const docClient = DynamoDBDocumentClient.from(client)

		const command = new GetCommand({
			TableName: process.env.DYNAMODB_TABLE_NAME!,
			Key: {
				id: id,
				subTable: 'contact',
			},
		})

		const response = await docClient.send(command)
		console.log(response)
		if (!response.Item) {
			return NextResponse.json(
				{ error: '데이터를 찾을 수 없습니다.' },
				{ status: 404 }
			)
		}

		return NextResponse.json({
			success: true,
			data: response.Item,
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
