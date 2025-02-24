import useSWR from "swr";
import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

interface UseUserProps {
  id: number;
  initial?: User;
}

interface UseUser {
  user?: User;
  isLoading: boolean;
  isError?: boolean;
}

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
  const { data, error } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
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
    user: data ?? initial,
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useUser;
