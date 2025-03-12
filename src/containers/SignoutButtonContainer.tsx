'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

const SignoutButtonContainer = () => {
  const router = useRouter();
  const { signout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignoutButtonClick = async () => {
    // サインアウト前に確認を取る
    if (!window.confirm('ログアウトしてもよろしいですか？')) return;

    try {
      setIsLoading(true);
      await signout();
      router.replace('/signin');
    } catch (error) {
      // エラーをユーザーに通知する
      alert('ログアウトに失敗しました。もう一度お試しください。')
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleSignoutButtonClick}
      aria-label="ログアウト"
      disabled={isLoading}
    >
      {isLoading ? '処理中...' : 'ログアウト'}
    </button>
  )
}

export default SignoutButtonContainer;
