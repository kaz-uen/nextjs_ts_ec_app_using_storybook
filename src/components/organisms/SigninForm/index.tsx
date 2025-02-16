'use client';

import { useForm } from "react-hook-form";
import styled from "styled-components";
import { theme } from "@/themes";

const Form = styled.form`
  width: 100%;
`

const FormInputInner = styled.div`
  margin-bottom: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
`

const Input = styled.input`
    border: 1px solid ${theme.colors.border};
    border-radius: 5px;
    padding: 11px 12px 12px 9px;
    box-sizing: border-box;
    outline: none;
    width: 100%;
    height: 38px;
    font-size: ${theme.fontSizes.medium}px;
    line-height: 19px;
    &:focus {
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px ${theme.colors.primary}33;
    }
`

const Button = styled.button`
  background-color: ${theme.colors.black};
  font-size: inherit;
  line-height: inherit;
  color: ${theme.colors.white};
  width: 100%;
  display: inline-block;
  padding-top: 8px;
  padding-left: 16px;
  padding-bottom: 8px;
  padding-right: 16px;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  opacity: 1;
  border-radius: 4px;
  border: none;
  transition: opacity .2s;
  &:hover {
    opacity: .8;
  }
`

interface SigninFormData {
  username: string;
  password: string;
}

interface SigninFormProps {
  onSignin?: (username: string, password: string) => void;
  isLoading?: boolean;
  error?: string;
}

/**
 * 5. サインインフォームのUIを作成
 */
const SigninForm = ({ onSignin, isLoading, error }: SigninFormProps) => {
  // react-hook-formの初期化
  const {
    register, // 入力フィールドの登録
    handleSubmit, // フォーム送信ハンドラー
    formState: { errors } // バリデーションエラー情報
  } = useForm<SigninFormData>();

  // フォーム送信時の処理
  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;
    // onSigninが存在する場合のみ実行
    onSignin?.(username, password);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} aria-label='サインインフォーム'>
      <FormInputInner>
        <FormGroup>
          <label htmlFor='username'>ユーザー名</label>
          <Input
            type='text'
            id='username'
            {...register('username', { required: 'ユーザー名は必須です' })}
            placeholder="ユーザー名"
            aria-invalid={errors.username ? 'true' : 'false'} // フォーム要素の入力値が有効か無効かを示す。入力エラーを音声で通知
            disabled={isLoading} // ローディング中は入力を無効化
          />
          {errors.username && <span role='alert'>{errors.username.message}</span>}
        </FormGroup>
        <FormGroup>
          <label htmlFor='password'>パスワード</label>
          <Input
            type='password'
            id='password'
            {...register('password', { required: 'パスワードは必須です' })}
            placeholder="パスワード"
            aria-invalid={errors.password ? 'true' : 'false'} // フォーム要素の入力値が有効か無効かを示す。入力エラーを音声で通知
            disabled={isLoading} // ローディング中は入力を無効化
          />
          {errors.password && <span role='alert'>{errors.password.message}</span>}
        </FormGroup>
        {error && <span role='alert'>{error}</span>}
      </FormInputInner>

      <Button type='submit' disabled={isLoading}>ログイン</Button>
    </Form>
  )
}

export default SigninForm;
