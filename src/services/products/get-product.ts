import type { ApiContext, Product } from "@/types";
import { fetcher } from "@/utils";

interface GetProductParams {
  id: number; //商品ID
}

/**
 * 商品API（個別取得）
 * @param context APIコンテキスト - APIのルートURLなどの設定を含む
 * @param params パラメータ - 取得対象の商品ID
 * @returns Promise<Product> - 商品情報を含むPromise
 */
const getProduct = async (
  context: ApiContext,
  { id }: GetProductParams
): Promise<Product> => {
  // APIエンドポイントから商品情報を取得
  return await fetcher(
    // エンドポイントURLの生成
    // context.apiRootUrlの末尾のスラッシュを削除し、/products/{id}の形式に整形
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
    {
      // キャッシュの設定
      // revalidate: 10 - 10秒間キャッシュを有効にし、その後再検証
      next: { revalidate: 10 },
      // リクエストヘッダーの設定
      headers: {
        // レスポンスとしてJSONを受け取ることを指定
        Accept: 'application/json',
        // リクエストボディがJSONであることを指定
        'Content-Type': 'application/json',
      },
    }
  )
}

export default getProduct;
