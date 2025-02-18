// 一時的にCSRにする
'use client';

import { GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ApiContext } from "@/types";
import Layout from "@/components/templates/Layout";
import getUser from "@/services/users/get-user";
import type { ApiContext } from "@/types";

const UserPage = async ({ params, id, user, products }) => {
  const router = useRouter();

  // ページ生成中の場合はローディング表示
  if (router.isFallback) return <div>Loading...</div>

  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || '/api/proxy',
  }

  if (!params) throw new Error('params is undefined');

  const userData = await getUser(context, { id: params.id });
  console.log(userData)

  return (
    <Layout>
      <Link href="/">トップ</Link>

      <p>{userData.displayName}</p>

    </Layout>
  )
}


export default UserPage;
