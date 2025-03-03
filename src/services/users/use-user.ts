import useSWR from "swr";
import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

/**
 * カスタムフックのプロパティの型定義
 */
interface UseUserProps {
  id: number; // 取得対象のユーザーID
  initial?: User; // 初期データ（オプショナル）
}

/**
 * カスタムフックの戻り値の型定義
 */
interface UseUser {
  user?: User; // 取得したユーザー情報
  isLoading: boolean; // ローディング状態
  isError?: boolean; // エラー状態
}

/**
 * APIエラーの型定義
 */
type ApiError = {
  response?: {
    status: number;
  }
}

/**
 * ユーザーAPI（個別取得）のカスタムフック
 * @param context APIコンテキスト
 * @returns ユーザーとAPI呼び出しの状態
 */
const useUser = ( context: ApiContext, { id, initial }: UseUserProps): UseUser => {
  // SWRを使用してデータフェッチを行う
  const { data, error } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    fetcher,
    {
      // フォーカス時の再検証を無効化
      revalidateOnFocus: false,
      // エラー時の再試行を無効化
      shouldRetryOnError: false,
      // エラーハンドリング
      onError: (err) => {
        console.error('ユーザー情報の取得に失敗しました:', err);
        // エラーの種類に応じて適切なメッセージを設定
        if (err instanceof TypeError) {
          console.error('ネットワークエラーが発生しました');
        } else if ((err as ApiError).response?.status === 404) {
          console.error('ユーザーが見つかりませんでした');
        } else {
          console.error('予期せぬエラーが発生しました');
        }
      }
    }
  );
  /**
   * useSWRについて
   *
   * useSWRは、データ取得のためのカスタムフック
   * 第1引数には、データを取得するためのURLを指定
   * 第2引数には、データ取得のための関数（fetcher）を指定
   * 第3引数には、オプションを指定
   *
   * 第2引数のfetcherには、useSWR内部で自動的に第1引数のキーが渡されるため、
   * 実質的にはfetcher(第1引数のurl)」のような形で呼び出される。
   * 第3引数のオプションの設定により、再検証や再試行の挙動を制御したり、エラーハンドリングも可能。
   * オプションには、revalidateOnFocusやshouldRetryOnError、onErrorなどがある。
   */

  return {
    user: data ?? initial, // データがない場合は初期値を使用
    isLoading: !error && !data, // エラーもデータもない場合はローディング中
    isError: !!error, // エラーの有無をブール値で返す
  }
}

export default useUser;
