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

  return {
    user: data ?? initial, // データがない場合は初期値を使用
    isLoading: !error && !data, // エラーもデータもない場合はローディング中
    isError: !!error, // エラーの有無をブール値で返す
  }
}

export default useUser;
