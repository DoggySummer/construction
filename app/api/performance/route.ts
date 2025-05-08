import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
	DynamoDBDocumentClient,
	PutCommand,
	ScanCommand,
	ScanCommandInput,
} from '@aws-sdk/lib-dynamodb'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const mainPhoto = formData.get('mainPhoto') as File | null
		const subPhoto1 = formData.get('subPhoto1') as File | null
		const subPhoto2 = formData.get('subPhoto2') as File | null
		const subPhoto3 = formData.get('subPhoto3') as File | null
		const subPhoto4 = formData.get('subPhoto4') as File | null
		const subPhoto5 = formData.get('subPhoto5') as File | null
		const performanceType = formData.get('performanceType') as string
		const title = formData.get('title') as string
		const primeContractor = formData.get('primeContractor') as string
		const clientName = formData.get('clientName') as string
		const contractAmount = formData.get('contractAmount') as string
		const constructionStartDate = formData.get(
			'constructionStartDate'
		) as string
		const constructionEndDate = formData.get('constructionEndDate') as string
		const content = formData.get('content') as string

		if (!mainPhoto) {
			return NextResponse.json(
				{ error: '메인 사진이 없습니다.' },
				{ status: 400 }
			)
		}

		const s3Client = new S3Client({
			region: process.env.REGION,
			credentials: {
				accessKeyId: process.env.ACCESS_KEY_ID!,
				secretAccessKey: process.env.SECRET_ACCESS_KEY!,
			},
		})

		// 모든 사진을 배열로 수집
		const photos = [
			{ file: mainPhoto, type: 'main' },
			{ file: subPhoto1, type: 'sub1' },
			{ file: subPhoto2, type: 'sub2' },
			{ file: subPhoto3, type: 'sub3' },
			{ file: subPhoto4, type: 'sub4' },
			{ file: subPhoto5, type: 'sub5' },
		].filter((photo) => photo.file !== null)

		// 모든 사진을 병렬로 업로드
		const uploadPromises = photos.map(async ({ file, type }) => {
			const fileBuffer = Buffer.from(await file!.arrayBuffer())
			const key = `uploads/${Date.now()}-${type}-${file!.name}`

			const uploadParams = new PutObjectCommand({
				Bucket: process.env.S3_BUCKET_NAME!,
				Key: key,
				Body: fileBuffer,
				ContentType: file!.type,
			})

			await s3Client.send(uploadParams)
			return {
				type,
				url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${key}`,
			}
		})

		try {
			const uploadedPhotos = await Promise.all(uploadPromises)
			console.log('사진들이 전부 업로드되었습니다')

			// 메인 사진 URL 찾기
			const mainPhotoUrl = uploadedPhotos.find(
				(photo) => photo.type === 'main'
			)?.url
			const subPhotoUrls = uploadedPhotos
				.filter((photo) => photo.type.startsWith('sub'))
				.map((photo) => photo.url)

			// 2. DynamoDB에 데이터 저장
			const client = new DynamoDBClient({
				region: process.env.REGION,
				credentials: {
					accessKeyId: process.env.ACCESS_KEY_ID!,
					secretAccessKey: process.env.SECRET_ACCESS_KEY!,
				},
			})
			const docClient = DynamoDBDocumentClient.from(client)
			const timestamp = new Date().toISOString()
			const params = {
				TableName: process.env.DYNAMODB_TABLE_NAME!,
				Item: {
					id: Date.now().toString(),
					subTable: 'performance',
					title: title,
					performanceType: performanceType,
					primeContractor: primeContractor,
					clientName: clientName,
					contractAmount: contractAmount,
					constructionStartDate: constructionStartDate,
					constructionEndDate: constructionEndDate,
					mainPhoto: mainPhotoUrl,
					subPhoto1: subPhotoUrls[0],
					subPhoto2: subPhotoUrls[1],
					subPhoto3: subPhotoUrls[2],
					subPhoto4: subPhotoUrls[3],
					subPhoto5: subPhotoUrls[4],
					createdAt: timestamp,
				},
			}
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
					imageUrl: mainPhotoUrl,
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

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const performanceType = searchParams.get('type')

	const client = new DynamoDBClient({
		region: process.env.REGION,
		credentials: {
			accessKeyId: process.env.ACCESS_KEY_ID!,
			secretAccessKey: process.env.SECRET_ACCESS_KEY!,
		},
	})
	const docClient = DynamoDBDocumentClient.from(client)

	const params: ScanCommandInput = {
		TableName: process.env.DYNAMODB_TABLE_NAME!,
		FilterExpression: performanceType
			? 'subTable = :subTable AND performanceType = :type'
			: 'subTable = :subTable',
		ExpressionAttributeValues: performanceType
			? {
					':subTable': 'performance',
					':type': performanceType,
			  }
			: {
					':subTable': 'performance',
			  },
	}

	const data = await docClient.send(new ScanCommand(params))

	return NextResponse.json({
		items: data.Items,
	})
}
