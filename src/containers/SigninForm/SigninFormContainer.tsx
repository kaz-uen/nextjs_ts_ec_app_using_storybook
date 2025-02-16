'use client';

import { useAuthContext } from "@/contexts/AuthContext";
import SigninForm from "@/components/organisms/SigninForm";
import { useState } from "react";

interface SigninFormContainerProps {
  onSignin?: (error?: Error) => void;
}

/**
 * 6. UIとロジックを繋ぐコンテナを作成
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  // 認証関連の機能を提供するコンテキストからsignin関数を取得
  const { signin } = useAuthContext();
  // ローディング状態を管理
  const [isLoading, setIsLoading] = useState(false);

  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      // 認証APIを呼び出し
      await signin(username, password);
      // 認証成功時、親コンポーネントのコールバックを呼び出し
      onSignin?.();
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラーの種類に応じて適切なメッセージを設定
        const errorMessage = err.message.includes('認証')
          ? 'ユーザー名またはパスワードが正しくありません'
          : 'サインインに失敗しました。時間をおいて再度お試しください';
        // エラー情報を親コンポーネントに通知
        onSignin?.(new Error(errorMessage));
      }
    } finally {
      // 必要に応じて処理完了後の共通処理
      setIsLoading(false);
    }
  }

  return <SigninForm onSignin={handleSignin} isLoading={isLoading} />
}

export default SigninFormContainer;

/*
認証処理の流れ:
- ユーザーがサインインフォームを送信
- ローディング表示を開始
- 認証APIを呼び出し
- 成功時: 親コンポーネントにコールバック
- 失敗時: エラーメッセージを表示し、親コンポーネントにエラー通知
- 最後にローディング表示を終了

エラーハンドリング:
- try-catch文でエラーを捕捉
- エラーメッセージをユーザーに表示
- エラー情報を親コンポーネントに伝達
*/
