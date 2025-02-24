'use client';

import UserProfile from "@/components/organisms/UserProfile";
import useUser from "@/services/users/use-user";
import type { ApiContext, User } from "@/types";

interface UserProfileContainerProps {
  userId: number;
  user?: User;
}

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const UserProfileContainer = ({ userId, user }: UserProfileContainerProps) => {
  // 最新のユーザー情報を取得し、更新があった場合にはinitialで指定されているデータを上書きする
  const { user: u } = useUser(context, { id: userId, initial: user});
  /**
   * useUserの処理について
   *
   * 第2引数のinitialは、データがない場合に初期値として使用される
   * （１）データがない場合は、initialで指定されたデータが使用される
   * （２）データがある場合は、initialで指定されたデータが上書きされる
   * =>ここでいう「データ」とは、useUser関数の処理でuseSWRを使用して取得したデータのことを指す
   *
   * useUser関数の処理で、SWRがバックグラウンドで最新データをフェッチしている
   * そこで新しいデータが取得できたら自動的に表示を更新し、
   * データ取得に失敗した場合はinitialに渡した初期データ（user）を表示し続ける
   *
   * このような実装パターンにすることで、以下の利点がある：
   * 1. パフォーマンス
   * ・初期データにより即座に表示が可能
   * ・ページの読み込み時間が短縮
   * 2. UX（ユーザー体験）
   * ・初期表示が速い
   * ・バックグラウンドで最新データに更新
   * ・シームレスな更新
   * 3. データの鮮度
   * ・常に最新のデータを取得
   * ・他のユーザーによる更新も反映
   * 4. エラー耐性
   * ・データ取得に失敗しても初期データで表示可能
   * ・サービスの可用性が向上
   */

  if (!u) return <div>Loading...</div>

  return (
    <UserProfile
      username={u.username}
      description={u.description}
    />
  )
}

export default UserProfileContainer;
