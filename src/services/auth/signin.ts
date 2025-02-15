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
      // replace...でURLの末尾のスラッシュを削除 => context.apiRootUrlの値が"/"で終わる場合と終わらない場合の両方に対応
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

    // レスポンスからパスワード関連のフィールドを削除（passwordは未使用変数）
    // セキュリティのため、クライアントサイドではパスワード情報を保持しない
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;
    // パスワードを除外したユーザー情報を返却
    return safeUser;
  } catch (error) {
    if (error instanceof Error) {
      // 標準的なErrorオブジェクトの場合の処理
      // error.messageプロパティに安全にアクセス可能
      throw new Error('サインインに失敗しました。認証情報を確認してください。');
    }
    // Errorインスタンスでない場合（予期せぬエラーの場合はそのまま再スロー）
    // 例：
    // - nullやundefinedが投げられた場合
    // - 文字列や数値が投げられた場合
    // - カスタムエラーオブジェクトの場合
    throw error;

    /**
     * instanceof演算子を使用したエラー型の判定
     *
     * 1. error instanceof Error
     *    - errorオブジェクトがErrorクラスのインスタンスかどうかを確認
     *    - JavaScriptの標準エラーオブジェクトかどうかをチェック
     *
     * 2. なぜこのチェックが必要か
     *    - catchで受け取るerrorの型は 'unknown' 型（TypeScriptの仕様）
     *    - エラーオブジェクトの型を特定することで、安全にエラー情報にアクセス可能
     *    - 予期せぬ形式のエラーに対する防御的なプログラミング
     */
  }
}

export default signin;
