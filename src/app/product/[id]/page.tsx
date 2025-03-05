import Layout from "@/components/templates/Layout";
import ProductDetailContainer from "@/containers/ProductDetailContainer";
import getAllProducts from "@/services/products/get-all-products";
import getProduct from "@/services/products/get-product";
import type { ApiContext, Product } from "@/types";

interface ProductPageProps {
  params: {
    id: number;
  }
}

/**
 * 静的ページ生成のためのパス情報を生成する関数
 * Next.js 13以降では、getStaticPathsの代わりにgenerateStaticParamsを使用
 * ビルド時に実行され、生成する静的ページのパスを定義する
 *
 * ＜generateStaticParamsを使用した実装のメリット＞
 * ・SEO対策: ビルド時に静的なHTMLが生成されるため、検索エンジンがコンテンツを正しくクロールできる
 * ・パフォーマンス: 事前生成されたページをCDNでキャッシュできるため、高速なページ読み込みが可能
 * ・UX向上: 初期表示時のローディング状態を回避できる
 * ・フォールバック対応: initialプロパティを通じて初期データを提供しつつ、クライアントサイドでの更新も可能
 *
 * => 商品詳細ページの場合、SEOとパフォーマンスが重要なため、generateStaticParamsを使用した静的生成の実装を推奨
 */
export async function generateStaticParams() {
  // APIのベースURLを環境変数から取得（未設定の場合はローカルホストを使用）
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000'
  }

  // APIから全商品情報を取得
  const products = await getAllProducts(context);

  // 各商品IDに対応するパラメータオブジェクトの配列を返却
  // これにより、各商品IDに対応する静的ページが生成される
  return products.map((product: Product) => ({
    id: product.id.toString(),
  }))
}

/**
 * 動的な商品データを取得する関数
 * @param productId - 取得対象の商品ID
 * @returns 商品情報のオブジェクト、またはnull
 */
async function getProductData(productId: number) {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000'
  }

  try {
    // 商品情報を取得
    const product = await getProduct(context, { id: productId });

    return product;
  } catch (error) {
    console.error('商品データの取得に失敗しました:', error);
    // エラー時はnullを返し、呼び出し側で処理する
    return null;
  }
}

/**
 * 商品詳細ページのメインコンポーネント
 * Next.js 13のServer Componentとして実装
 * @param params - URLパラメータ（商品ID）
 */
const ProductPage = async (
  // Next.js13のApp Routerでは、引数のparamsに、
  // []で囲まれたフォルダ名のidが動的ルーティングの情報として渡ってくる
  { params }: ProductPageProps
) => {
  // URLパラメータから商品IDを数値として取得
  const productId = Number(params.id);
  // 有効な数値でない場合
  if (isNaN(productId) || productId <= 0) {
    // NOTE：エラーページにリダイレクトするか、エラーメッセージを表示する
    return (
      <Layout>
        <div>無効な商品IDです</div>
      </Layout>
    )
  }

  // 商品データを非同期で取得
  const product = await getProductData(productId);
  // 商品データが取得できなかった場合
  if (!product) {
    return (
      <Layout>
        <div>商品が見つかりませんでした</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <ProductDetailContainer productId={productId} product={product} />
    </Layout>
  )
}

export default ProductPage;
