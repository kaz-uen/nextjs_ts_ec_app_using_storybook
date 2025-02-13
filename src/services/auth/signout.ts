import { fetcher } from "@/utils";
import { ApiContext } from "@/types";

/**
 * 1. APIとの通信関数を作成
 */

/**
 * サインアウトAPI（/auth/signout）を呼び出す関数
 * @param context - API接続に必要な情報
 * @returns Promise<{ message: string }> - サインアウト処理の結果メッセージ
 */
const signout = async (context: ApiContext): Promise<{ message: string }> => {
  // fetcherユーティリティ関数を使用してAPIを呼び出す
  return await fetcher(
    // サインアウトAPIのエンドポイントを作成
    // replace...でURLの末尾のスラッシュを削除 => context.apiRootUrlの値の末尾にスラッシュが混在する可能性がある場合を考慮
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signout`,
    {
      // POSTメソッドを指定
      method: 'POST',
      // リクエストヘッダーを設定
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
  )
}

export default signout;
