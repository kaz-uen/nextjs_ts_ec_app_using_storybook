'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";

export const useAuthGuard = (): void => {
  const router = useRouter();
  const { authUser } = useAuthContext();

  useEffect(() => {
    // ユーザーが取得できない場合はサインインページにリダイレクト
    if (!authUser) {
      console.log('ユーザーを取得できない')
      const currentPath = router.pathname;

      router.push({
        pathname: '/signin',
        query: {
          redirect_to: currentPath,
        },
      })
    }
  }, [router, authUser])
}
