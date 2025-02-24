import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

/**
 * ユーザーAPI（一覧取得）
 * @param context APIコンテキスト
 * @returns ユーザー一覧（User[]型）
 */
const getAllUsers = async (
  context: ApiContext
): Promise<User[]> => {
  // 全ユーザー情報を取得するAPIエンドポイントにリクエストを送信
  try {
    return await fetcher(
      // エンドポイントURLの生成
      // 末尾のスラッシュを削除して'/users'を追加
      `${context.apiRootUrl.replace(/\/$/g, '')}/users`,
      {
        // キャッシュの設定
        // revalidate: 10 - 10秒間キャッシュを有効にし、その後再検証
        next: { revalidate: 10 },
        // リクエストヘッダーの設定
        headers: {
          // JSONデータを受け取ることを指定
          Accept: 'application/json',
          // 送信データの形式をJSONに指定
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    // エラーログの出力
    console.error('Failed to fetch users:', error);
    // エラーを投げる（エラーメッセージを設定）
    throw new Error('ユーザー一覧の取得に失敗しました');
  }

}

export default getAllUsers;
