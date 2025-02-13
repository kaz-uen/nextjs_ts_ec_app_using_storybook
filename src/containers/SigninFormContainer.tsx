'use client';

import { useAuthContext } from "@/contexts/AuthContext";
import SigninForm from "@/components/organisms/SigninForm";

interface SigninFormContainerProps {
  onSignin: (error?: Error) => void;
}

/**
 * 6. UIとロジックを繋ぐコンテナを作成
 */
const SigninFormContainer = ({ onSignin }: SigninFormContainerProps) => {
  // 認証関連の機能を提供するコンテキストからsignin関数を取得
  const { signin } = useAuthContext();

  // サインインボタンを押された時のイベントハンドラ
  const handleSignin = async (username: string, password: string) => {
    try {
      // 認証APIを呼び出し
      await signin(username, password);
      // 認証成功時、親コンポーネントのコールバックを呼び出し
      onSignin();
    } catch (err: unknown) {
      if (err instanceof Error) {
        // エラー情報を親コンポーネントに通知
        onSignin(err);
      }
    } finally {
      // 必要に応じて処理完了後の共通処理
    }
  }

  return <SigninForm onSignin={handleSignin} />
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
