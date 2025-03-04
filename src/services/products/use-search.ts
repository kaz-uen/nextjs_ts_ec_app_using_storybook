import type { ApiContext, Category, Condition, Product } from "@/types";
import { fetcher } from "@/utils";
import useSWR from 'swr';

interface UseSearchProps {
  category?: Category; // 商品カテゴリー（オプショナル）
  conditions?: Condition[]; // 商品の状態（新品/中古）の配列（オプショナル）
  userId?: number; // ユーザーID（オプショナル）
  sort?: keyof Omit<Product, 'owner'>; // ソートキー（owner以外のProduct型のキー）
  order?: 'asc' | 'desc'; // ソート順（昇順/降順）
  initial?: Product[]; // 初期データ（オプショナル）
}

/**
 * プロダクトAPI（一覧取得）のカスタムフック
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 商品一覧
 */
const useSearch = (
  context: ApiContext,
  {
    category,
    conditions,
    userId,
    initial,
    sort = 'id', // デフォルト値：'id'
    order = 'desc', // デフォルト値：'desc'（降順）
  }: UseSearchProps = {}, // デフォルト値：空オブジェクト
) => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`; // APIのエンドポイントパスを生成（末尾のスラッシュを削除）
  const params = new URLSearchParams() // URLSearchParamsオブジェクトを作成（クエリパラメータの構築用）

  // 各パラメータが存在する場合、URLSearchParamsに追加
  category?.toString() && params.append('category', category.toString());
  conditions?.forEach((condition) => params.append('condition', condition));
  userId?.toString() && params.append('owner.id', userId.toString());
  sort?.toString() && params.append('_sort', sort.toString());
  order?.toString() && params.append('_order', order.toString());

  // URLSearchParamsを文字列に変換
  const query = params.toString();

  // useSWRフックを使用してデータをフェッチ
  const { data, error } = useSWR(
    query.length > 0 ? `${path}?${query}` : path, // クエリがある場合は「path?query」、ない場合はpathのみ
    fetcher, // フェッチ関数
  );
  // → useSWRについては /src/services/users/use-user.ts の解説参照

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useSearch;
