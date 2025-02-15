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

  // フォーム送信時の処理
  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;
    // onSigninが存在する場合のみ実行
    onSignin?.(username, password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} aria-label='サインインフォーム'>
      <div>
        <label htmlFor='username'>ユーザー名</label>
        <input
          type='text'
          id='username'
          {...register('username', { required: 'ユーザー名は必須です' })}
          placeholder="ユーザー名"
          aria-invalid={errors.username ? 'true' : 'false'} // フォーム要素の入力値が有効か無効かを示す。入力エラーを音声で通知
          disabled={isLoading} // ローディング中は入力を無効化
        />
        {errors.username && <span role='alert'>{errors.username.message}</span>}
      </div>
      <div>
        <label htmlFor='password'>パスワード</label>
        <input
          type='password'
          id='password'
          {...register('password', { required: 'パスワードは必須です' })}
          placeholder="パスワード"
          aria-invalid={errors.password ? 'true' : 'false'} // フォーム要素の入力値が有効か無効かを示す。入力エラーを音声で通知
          disabled={isLoading} // ローディング中は入力を無効化
        />
        {errors.password && <span role='alert'>{errors.password.message}</span>}
      </div>
      {error && <span role='alert'>{error}</span>}
      <button type='submit' disabled={isLoading}>ログイン</button>
    </form>
  )
}

export default SigninForm;
