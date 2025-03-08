import type { ApiContext } from "@/types";
import { fetcher } from '@/utils';

interface PurchaseParams {
  productId: number; //購入する商品ID
}

/**
 * 購入API（商品購入）
 * @param context APIコンテキスト
 * @param params 商品ID
 * @returns 購入結果のメッセージ
 */
const purchase = async (
  context: ApiContext,
  params: PurchaseParams,
): Promise<{ message: string }> => {
  try {
    return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/purchases`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
  } catch (error) {
    console.error('購入結果の取得に失敗しました：', error);
    throw new Error(`購入結果の取得に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default purchase;
