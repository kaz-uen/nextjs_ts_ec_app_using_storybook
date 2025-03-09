import type { ApiContext } from "@/types";
import { fetcher } from '@/utils';

/**
 * 購入APIのパラメータ型定義
 * @property productId - 購入する商品のID
 */
interface PurchaseParams {
  productId: number; //購入する商品ID
}

/**
 * 購入API（商品購入）
 * バックエンドAPIと通信して商品購入処理を実行する
 *
 * @param context - APIコンテキスト（APIのルートURLなどの設定を含む）
 * @param params - 購入パラメータ（商品ID）
 * @returns Promise<{ message: string }> - 購入処理の結果
 */
const purchase = async (
  context: ApiContext,
  params: PurchaseParams,
): Promise<{ message: string }> => {
  try {
    // APIエンドポイントのURLを構築
    // 末尾のスラッシュを除去してURLを正規化
    return await fetcher(`${context.apiRootUrl.replace(/\/$/g, '')}/purchases`, {
      // POSTメソッドで商品購入をリクエスト
      method: 'POST',
      // JSONデータを送受信することを指定
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // リクエストボディにパラメータをJSON形式で設定
      body: JSON.stringify(params),
    })
  } catch (error) {
    console.error('購入結果の取得に失敗しました：', error);
    // Error型の場合はそのメッセージを使用、それ以外は文字列に変換
    throw new Error(`購入結果の取得に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export default purchase;
