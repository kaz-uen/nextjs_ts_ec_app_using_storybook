import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

interface GetUserParams {
  id: number; //ユーザーID
}

/**
 * ユーザーAPI（個別取得）
 * @param context APIコンテキスト - APIのルートURLなどの設定を含む
 * @param params パラメータ - 取得対象のユーザーID
 * @returns Promise<User> - ユーザー情報を含むPromise
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  // APIエンドポイントからユーザー情報を取得
  return await fetcher(
    // エンドポイントURLの生成
    // context.apiRootUrlの末尾のスラッシュを削除し、/users/{id}の形式に整形
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      // キャッシュの設定
      // revalidate: 10 - 10秒間キャッシュを有効にし、その後再検証
      next: { revalidate: 10 },
      // リクエストヘッダーの設定
      headers: {
        // レスポンスとしてJSONを受け取ることを指定
        Accept: 'application/json',
        // リクエストボディがJSONであることを指定
        'Content-Type': 'application/json',
      },
    }
  )
}

export default getUser;
