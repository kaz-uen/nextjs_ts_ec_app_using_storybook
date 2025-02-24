import Link from "next/link";
import type { ApiContext } from "@/types";
import Layout from "@/components/templates/Layout";
import UserProfileContainer from "@/containers/UserProfileContainer";
import getUser from "@/services/users/get-user";
import getAllUsers from "@/services/users/get-all-users";
import getAllProducts from "@/services/products/get-all-products";

/**
 * 静的ページ生成のためのパス情報を生成する関数
 * Next.js 13以降では、getStaticPathsの代わりにgenerateStaticParamsを使用
 * ビルド時に実行され、生成する静的ページのパスを定義する
 */
export async function generateStaticParams() {
  // APIのベースURLを環境変数から取得（未設定の場合はローカルホストを使用）
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000'
  }

  // APIから全ユーザー情報を取得
  const users = await getAllUsers(context);

  // 各ユーザーIDに対応するパラメータオブジェクトの配列を返却
  // これにより、各ユーザーIDに対応する静的ページが生成される
  return users.map((user) => ({
    id: user.id.toString(),
  }))
}

/**
 * 動的なユーザーデータを取得する関数
 * @param userId - 取得対象のユーザーID
 * @returns ユーザー情報と関連商品情報を含むオブジェクト、またはnull
 */
async function getUserData(userId: number) {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000'
  }

  try {
    // ユーザー情報と商品情報を取得
    const user = await getUser(context, { id: userId });
    const products = await getAllProducts(context, { userId });

    return { user, products };
  } catch (error) {
    console.error('ユーザーデータの取得に失敗しました:', error);
    throw error;
  }
}

/**
 * ユーザーページのメインコンポーネント
 * Next.js 13のServer Componentとして実装
 * @param params - URLパラメータ（ユーザーID）
 */
const UserPage = async (
  // Next.js13のApp Routerでは、引数のparamsに、
  // []で囲まれたフォルダ名のidが動的ルーティングの情報として渡ってくる
  { params }: { params: { id: string }}
) => {
  // URLパラメータからユーザーIDを数値として取得
  const userId = Number(params.id);
  // ユーザーデータを非同期で取得
  const userData = await getUserData(userId);
  // 取得したデータを分割代入
  const { user, products } = userData;

  return (
    <Layout>
      <Link href="/">トップ</Link>
      <UserProfileContainer userId={userId} user={user} />
      {/* TODO：商品一覧の表示を追加する */}
    </Layout>
  )
}

export default UserPage;
