import useSWR from "swr";
import type { ApiContext, Product } from "@/types";
import { fetcher } from "@/utils";

interface UseProductProps {
  id: number;
  initial?: Product;
}

const useProduct = (
  context: ApiContext,
  { id, initial }: UseProductProps
) => {
  const { data, error, mutate } = useSWR(
    `${context.apiRootUrl.replace(/\/$/g, '')}/products/${id}`,
    fetcher,
    {
      // リフェッチの設定やキャッシュの設定を追加
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
    /**
     * 1. revalidateOnFocus: false
     * デフォルトの動作: true
     *
     * 設定の意味:
     * ・ブラウザのタブやウィンドウにフォーカスが戻った時のデータ再取得を制御
     * ・falseに設定することで、フォーカス時の自動再取得を無効化
     *
     * この設定を選んだ理由:
     * ・商品情報は頻繁に更新される可能性が低い
     * ・不要なAPI呼び出しを減らしてパフォーマンスを改善
     * ・ユーザーの操作を妨げない
     *
     * 2. dedupingInterval: 60000
     * デフォルトの動作: 2000（2秒）
     *
     * 設定の意味:
     * ・指定した時間内（この場合1分間）は同一のリクエストを重複して実行しない
     * ・キャッシュされたデータを再利用する期間を指定
     *
     * この設定を選んだ理由:
     * ・サーバーへの不要なリクエストを削減
     * ・商品情報は1分程度の鮮度であれば問題ない
     * ・パフォーマンスとリソース使用の最適化
     */
  )

  return {
    product: data ?? initial,  // APIから取得したデータまたは初期値を返す
    isLoading: !error && !data,  // エラーがなく、かつデータもまだない場合にtrueを返す
    isError: error,
    mutate, // SWRのキャッシュを更新するための関数
    // エラーの詳細情報を提供
    error: error ? {  // エラーが発生した場合、詳細情報を提供
      message: error.message,  // エラーメッセージ
      status: error.status, // HTTPステータスコードなど
    } : undefined,
  }
}

export default useProduct;
