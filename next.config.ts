const nextConfig = {
	images: {
		domains: ['sinuibucket.s3.ap-northeast-2.amazonaws.com'], // S3 버킷 도메인
		formats: ['image/avif', 'image/webp'],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}
export default nextConfig
