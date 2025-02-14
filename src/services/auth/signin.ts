import { fetcher } from "@/utils";
import { ApiContext, User } from "@/types";

// サインインに必要なパラメータの型定義
interface SigninParams {
  username: string;
  password: string;
}

// TODO：入力値のバリデーション処理を追加
// const validateSigninParams = (params: SigninParams): void => {
//   if (params.username.xxx) throw new Error('ユーザー名はxxx');
//   if (params.password.xxx) throw new Error('パスワードはxxx');
// }

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
  // TODO：入力値のバリデーション処理を実行する
  // validateSigninParams(params);

  // fetcherユーティリティ関数を使用してAPIを呼び出す
  try {
    const user = await fetcher(
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
    );

    // レスポンスからパスワード関連のフィールドを削除
    const { password, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('サインインに失敗しました。認証情報を確認してください。');
    }
    throw error;
  }
}

export default signin;
