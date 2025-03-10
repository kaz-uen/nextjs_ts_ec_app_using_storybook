import useSWR from 'swr';
import signin from "@/services/auth/signin";
import signout from "@/services/auth/signout";
import { createContext, useContext, useEffect } from "react";
import type { ApiContext, User } from '@/types';
import { fetcher } from '@/utils';

/**
 * 2. 認証コンテキストの型定義
 */
interface AuthContextType {
  authUser?: User;
  isLoading: boolean;
  signin: (username: string, password: string) => Promise<void>;
  signout: () => Promise<void>;
  mutate: (
    data?: User | Promise<User>,
    shouldRevalidate?: boolean,
  ) => Promise<User | undefined>
}

interface AuthContextProviderProps {
  context: ApiContext;
  authUser?: User;
}

/**
 * 3. 認証状態を管理するコンテキストを作成（初期値の設定）
 */
const AuthContext = createContext<AuthContextType>({
  authUser: undefined,
  isLoading: false,
  signin: async () => Promise.resolve(),
  signout: async () => Promise.resolve(),
  mutate: async () => Promise.resolve(undefined),
})

// 他のコンポーネントでAuthContext（認証情報）を使えるようにするためのカスタムフック
export const useAuthContext = (): AuthContextType => useContext<AuthContextType>(AuthContext);

/**
 * 4. 認証機能を提供するプロバイダーを実装
 * => アプリケーション全体で認証状態を管理・共有できるようにするためのコンポーネント
 */
export const AuthContextProvider = ({
  context,
  authUser,
  children
}: React.PropsWithChildren<AuthContextProviderProps>) => {
  // ユーザー情報を取得するSWRフック
  // replace...でURLの末尾のスラッシュを削除 => context.apiRootUrlの値が"/"で終わる場合と終わらない場合の両方に対応
  const { data, error, mutate } = useSWR<User>(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/me`,
    fetcher,
    {
      // リフェッチの設定やキャッシュの設定を追加
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      // エラー時の再試行を無効化
      shouldRetryOnError: false,
    }
  );

  // ローディング状態の管理
  const isLoading = !data && !error;

  // ユーザー情報の取得に失敗した場合のエラーハンドリング
  useEffect(() => {
    // TODO：未認証の場合はエラーを出さないようにしたい
    if (error) {
      console.error('Failed to fetch user:', error);
    }
  }, [error]);

  // サインイン処理の実装
  const signinInternal = async (username: string, password: string) => {
    // サインインAPIを呼び出し
    await signin(context, { username, password });
    // ユーザー情報を再取得
    await mutate();
  }

  // サインアウト処理の実装
  const signoutInternal = async () => {
    // サインアウトAPIを呼び出し
    await signout(context);
    // ユーザー情報を再取得
    await mutate();
  }

  // AuthContextの値（認証情報）を子コンポーネントに提供
  return (
    <AuthContext.Provider value={{
      authUser: data ?? authUser,
      isLoading,
      signin: signinInternal,
      signout: signoutInternal,
      mutate,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
