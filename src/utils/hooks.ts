'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

/**
 * 認証ガードのカスタムフック
 * 未認証ユーザーのアクセスを制限し、サインインページにリダイレクトする
 *
 * 使用例：
 * ```tsx
 * const MyProtectedComponent = () => {
 *   useAuthGuard();  // コンポーネントの先頭で呼び出す
 *   return <div>保護されたコンテンツ</div>;
 * }
 * ```
 *
 * @returns boolean - 認証状態（true: 認証済み, false: 未認証）
 */
export const useAuthGuard = (): boolean => {
  const router = useRouter();
  // 認証コンテキストから現在のユーザー状態を取得
  const { authUser, isLoading } = useAuthContext();

  /**
   * 認証状態の監視とリダイレクト制御
   *
   * useEffectの依存配列に router と authUser を指定することで、
   * これらの値が変更されたときにのみ実行される
   */
  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!authUser && !isLoading) {
      router.push('/signin');
    }
  }, [router, authUser, isLoading])

  // 認証状態を返す
  // NOTE：!!演算子で明示的にboolean型に変換
  return !!authUser;
}
