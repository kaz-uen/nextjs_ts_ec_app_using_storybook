import Link from "next/link";
import type { ApiContext } from "@/types";
import Layout from "@/components/templates/Layout";
import getUser from "@/services/users/get-user";
import UserProfileContainer from "@/containers/UserProfileContainer";

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000'

// 静的パスの生成
export async function generateStaticParams() { //getStaticPathsの代替として generateStaticParamsを利用し、静的パスを生成
  // TODO：ここでcontextを定義する

  const res = await fetch(`${API_BASE_URL}/users`);
  if (!res.ok) {
    throw new Error('Failed to fetch user data');
  }

  // TODO：全ユーザー情報の取得は、getAllUsersを使用するようにする
  const users = await res.json();

  console.log('generateStaticParams')

  return users.map((user) => ({
    id: user.id.toString(),
  }))
}

// 動的なデータ取得
async function getUserData(userId: number) {
  // TODO：fetchの処理は、それぞれgetUserとgetAllProductsを使用するようにする
  const [userRes, productsRes] = await Promise.all([
    fetch(`${API_BASE_URL}/users/${userId}`, { next: { revalidate: 10} }),
    fetch(`${API_BASE_URL}/products?userId=${userId}`, { next: { revalidate: 10} }),
  ])

  if (!userRes.ok || !productsRes.ok) return null;

  const user = await userRes.json();
  const products = await productsRes.json();

  return { user, products };
}

// ページコンポーネントの生成
const UserPage = async ({ params }: { params: { id: string }}) => {
  const userId = Number(params.id);
  const userData = await getUserData(userId);
  const { user, products } = userData;

  return (
    <Layout>
      <Link href="/">トップ</Link>
      <UserProfileContainer userId={userId} user={user} />

    </Layout>
  )
}

export default UserPage;
