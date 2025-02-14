'use client';

import Layout from "@/components/templates/Layout";
import SigninFormContainer from "@/containers/SigninFormContainer";
import { useRouter } from "next/navigation";

/**
 * 7. サインインページを作成
 */
const SigninPage = () => {
  const router = useRouter();

  /**
   * サインイン処理後のコールバック関数
   * @param err - サインイン処理で発生したエラー（存在する場合）
   */
  const handleSignin = async (err?: Error) => {
    try {
      if (!err) { // エラーがない場合（サインイン成功時）
        // サインイン後、トップページに遷移させる
        await router.push('/');
      } else { // エラーがある場合（サインイン失敗時）
        // エラーログを出力した上で、ユーザーへの通知のためにエラーを投げる
        console.error('サインインエラー：', err.message);
        throw new Error(`サインインに失敗しました：${err.message}`);
      }
    } catch (e) {
      // ナビゲーションエラーのハンドリング
      console.error('エラーが発生しました：', e);
      // TODO：ここでToastやアラートなどでユーザーに通知する処理を追加
    }
  }

  return (
    <Layout>
      <SigninFormContainer onSignin={handleSignin} />
    </Layout>
  )
}

export default SigninPage;
