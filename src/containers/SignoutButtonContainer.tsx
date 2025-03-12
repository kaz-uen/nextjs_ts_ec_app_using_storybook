'use client';

import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";

const SignoutButtonContainer = () => {
  const router = useRouter();
  const { signout } = useAuthContext();

  const handleSignoutButtonClick = async () => {
    // サインアウト前に確認を取る
    if (!window.confirm('ログアウトしてもよろしいですか？')) return;

    try {
      await signout();
      router.replace('/signin');
    } catch (error) {
      // エラーをユーザーに通知する
      alert('ログアウトに失敗しました。もう一度お試しください。')
    }
  }

  return (
    <button
      onClick={handleSignoutButtonClick}
      aria-label="ログアウト"
    >
      ログアウト
    </button>
  )
}

export default SignoutButtonContainer;
