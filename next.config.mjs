/** @type {import('next').NextConfig} */
const nextConfig = {
  //React の Strict Mode を有効化
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
   //リライト設定（APIのリクエストを別のURLへリダイレクト）
  async rewrites() {
    // 環境変数の検証（環境変数が設定されていない場合はエラーを投げて実行時に問題を明確に検知）
    if (!process.env.API_BASE_URL) throw new Error('API_BASE_URL is required');
    if (!process.env.NEXT_PUBLIC_API_BASE_PATH) throw new Error('NEXT_PUBLIC_API_BASE_PATH is required');

    return [
      {
        // source（転送元URL）を環境変数 NEXT_PUBLIC_API__BASE_PATH で定義。
        // :path* はワイルドカード（例: /api/proxy/users/1 -> users/1 の部分がキャプチャされる）
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
        // destination（転送先URL）を API_BASE_URL に設定
        // 例: NEXT_PUBLIC_API_BASE_PATH=/api/proxy, API_BASE_URL=http://localhost:8000 の場合
        // /api/proxy/users/1 へのリクエスト -> http://localhost:8000/users/1 に転送
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ]
  },
};

export default nextConfig;
