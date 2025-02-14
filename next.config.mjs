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
        // :match* はワイルドカード（ex. /api/proxy/*のようなRULをキャッチ）
        source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
        // destination（転送先URL）を API_BASE_URL に設定
        // ex. http://localhost:8000 -> /api/proxy/users にリクエストすると http://localhost:8000/users に転送される
        destination: `${process.env.API_BASE_URL}/:path*`,
      },
    ]
  },
};

export default nextConfig;
