import type { ApiContext, Category, Condition, Product } from "@/types";
import { fetcher } from "@/utils";
import useSWR from 'swr';

interface UseSearchProps {
  category?: Category;
  conditions?: Condition[];
  userId?: number;
  sort?: keyof Omit<Product, 'owner'>;
  order?: 'asc' | 'desc';
  initial?: Product[];
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
    sort = 'id',
    order = 'desc',
  }: UseSearchProps = {},
) => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`;
  const params = new URLSearchParams()

  category?.toString() && params.append('category', category.toString());
  conditions?.forEach((condition) => params.append('condition', condition));
  userId?.toString() && params.append('owner.id', userId.toString());
  sort?.toString() && params.append('_sort', sort.toString());
  order?.toString() && params.append('_order', order.toString());
  const query = params.toString();

  const { data, error } = useSWR(
    query.length > 0 ? `${path}?${query}` : path,
    fetcher,
  );

  return {
    products: data ?? initial ?? [],
    isLoading: !error && !data,
    isError: !!error,
  }
}

export default useSearch;
