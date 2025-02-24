import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

interface GetUserParams {
  id: number; //ユーザーID
}

/**
 * ユーザーAPI（個別取得）
 * @param context APIコンテキスト
 * @param params パラメータ
 * @returns ユーザー
 */
const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  // APIエンドポイントからユーザー情報を取得
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      next: { revalidate: 10 },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
}

export default getUser;
