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
    `${context.apiRootUrl}/products/${id}`,
    fetcher,
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
