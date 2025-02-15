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
  try {
    return await fetcher(
      // サインアウトAPIのエンドポイントを作成
      // replace...でURLの末尾のスラッシュを削除 => context.apiRootUrlの値が"/"で終わる場合と終わらない場合の両方に対応
      `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signout`,
      {
        // POSTメソッドを指定
        method: 'POST',
        // リクエストヘッダーを設定
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // クッキーを含めて送信（認証情報などのクッキーを送信するために必要）
        credentials: 'include'
      }
    )
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`サインアウト処理に失敗しました: ${error.message}`)
    }
    throw error;
  }
}

export default signout;
