import { fetcher } from "@/utils";
import { ApiContext, User } from "@/types";

// サインインに必要なパラメータの型定義
interface SigninParams {
  username: string;
  password: string;
}

/**
 * 1. APIとの通信関数を作成
 */

/**
 * サインインAPI（/auth/signin）を呼び出す関数
 * @param context - API接続に必要な情報
 * @param params - ユーザー名とパスワード
 * @returns Promise<User> - サインインしたユーザー情報
 */
const signin = async (context: ApiContext, params: SigninParams): Promise<User> => {
  // fetcherユーティリティ関数を使用してAPIを呼び出す
  return await fetcher(
    // サインインAPIのエンドポイントを作成
    // replace...でURLの末尾のスラッシュを削除 => context.apiRootUrlの値の末尾にスラッシュが混在する可能性がある場合を考慮
    `${context.apiRootUrl.replace(/\/$/g, '')}/auth/signin`,
    {
      // POSTメソッドを指定
      method: 'POST',
      // リクエストヘッダーを設定
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // リクエストボディにユーザー名とパスワードを設定してJSONで送信
      body: JSON.stringify(params),
    }
  )
}

export default signin;
