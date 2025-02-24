import type { ApiContext, Category, Condition, Product } from "@/types";
import { fetcher } from "@/utils";

interface GetAllProductsParams {
  category?: Category;
  conditions?: Condition[];
  userId?: number;
  sort?: keyof Omit<Product, 'owner'>;
  order?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}

/**
 * プロダクトAPI（一覧取得）
 * @param context APIコンテキスト
 * @param params 検索条件
 * @returns 商品一覧
 */
const getAllProducts = async (
  context: ApiContext,
  {
    category,
    conditions,
    userId,
    page,
    limit,
    sort = 'id',
    order = 'desc',
  }: GetAllProductsParams = {},
) => {
  const path = `${context.apiRootUrl.replace(/\/$/g, '')}/products`
  const params = new URLSearchParams()

  category?.toString() && params.append('category', category.toString());
  conditions?.forEach((condition) => params.append('condition', condition));
  userId?.toString() && params.append('owner.id', userId.toString());
  page?.toString() && params.append('_page', page.toString());
  limit?.toString() && params.append('_limit', limit.toString());
  sort?.toString() && params.append('_sort', sort.toString());
  order?.toString() && params.append('_order', order.toString());
  const query = params.toString()

  try {
    return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('商品データの取得に失敗しました:', error);
    throw error;
  }
}

export default getAllProducts;
