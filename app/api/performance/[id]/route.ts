import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

export async function GET(request: Request) {
	const url = new URL(request.url)
	const id = url.pathname.split('/').pop()
	const client = new DynamoDBClient({ region: process.env_REGION })
	const docClient = DynamoDBDocumentClient.from(client)

	const params = {
		TableName: process.env.DYNAMODB_TABLE_NAME!,
		FilterExpression:
			'subTable = :subTable AND performanceType = :performanceType',
		ExpressionAttributeValues: {
			':subTable': 'performance',
			':performanceType': id,
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
