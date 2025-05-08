// pages/api/get-posts.ts
import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'

export async function GET() {
	try {
		const client = new DynamoDBClient({ region: process.env.REGION })
		const docClient = DynamoDBDocumentClient.from(client)

		const params = {
			TableName: process.env.DYNAMODB_TABLE_NAME!,
		}

		const data = await docClient.send(new ScanCommand(params))

		return NextResponse.json({ success: true, items: data.Items })
	} catch (error) {
		console.error('데이터 조회 실패:', error)
		return NextResponse.json({ error: '데이터 조회 실패' }, { status: 500 })
	}
}
