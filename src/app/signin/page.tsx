'use client';

import Layout from "@/components/templates/Layout";
import SigninFormContainer from "@/containers/SigninFormContainer";
import { useRouter } from "next/navigation";

/**
 * 7. サインインページを作成
 */
const SigninPage = () => {
  const router = useRouter();

  // 認証後のイベントハンドラ（サインイン完了時のコールバック関数）
  const handleSignin = async (err?: Error) => {
    if (!err) { // エラーがない場合（サインイン成功時）
      // サインイン後、トップページに遷移させる
      await router.push('/');
    }
  }

  return (
    <Layout>
      <SigninFormContainer onSignin={handleSignin} />
    </Layout>
  )
}

export default SigninPage;
