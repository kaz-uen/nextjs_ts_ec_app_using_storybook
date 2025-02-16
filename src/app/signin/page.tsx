'use client';

import Layout from "@/components/templates/Layout";
import SigninFormContainer from "@/containers/SigninFormContainer";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { theme } from "@/themes";

const SigninFormRoot = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  @media screen and (min-width: ${theme.breakPoints.md}) {
    padding: 16px 0;
  }
`

const SigninFormInner = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (min-width: ${theme.breakPoints.md}) {
  }
`

const Heading = styled.h1`
  font-size: ${theme.fontSizes.medium}px;
  margin-bottom: 16px;
  @media screen and (min-width: ${theme.breakPoints.md}) {
    font-size: ${theme.fontSizes.mediumLarge}px;
  }
`

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
      <SigninFormRoot>
        <SigninFormInner>
          <Heading>ログイン</Heading>
          <SigninFormContainer onSignin={handleSignin} />
        </SigninFormInner>
      </SigninFormRoot>
    </Layout>
  )
}

export default SigninPage;
