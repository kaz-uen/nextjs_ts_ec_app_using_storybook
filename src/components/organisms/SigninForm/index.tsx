'use client';

import { useForm } from "react-hook-form";

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

  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;
    // onSigninが存在する場合のみ実行
    onSignin && onSignin(username, password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type='text'
          {...register('username', { required: 'ユーザー名は必須です' })}
          placeholder="ユーザー名"
        />
        {errors.username && <span>{errors.username.message}</span>}
        <input
          type='password'
          {...register('password', { required: 'パスワードは必須です' })}
          placeholder="パスワード"
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      {error && <p>{error}</p>}
      <button type='submit' disabled={isLoading}>ログイン</button>
    </form>
  )
}

export default SigninForm;
