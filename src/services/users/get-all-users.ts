import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

/**
 * ユーザーAPI（一覧取得）
 * @param context APIコンテキスト
 * @returns ユーザー一覧
 */
const getAllUsers = async (
  context: ApiContext
): Promise<User[]> => {
  // 全ユーザー情報を取得するAPIエンドポイントにリクエスト
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users`,
    {
      next: { revalidate: 10 },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
}

export default getAllUsers;
