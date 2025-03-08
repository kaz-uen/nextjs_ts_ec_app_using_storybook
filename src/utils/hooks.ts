'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

export const useAuthGuard = (): boolean => {
  const router = useRouter();
  const { authUser } = useAuthContext();

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!authUser) {
      router.push('/signin');
    }
  }, [router, authUser])

  // 認証状態を返す
  return !!authUser;
}
