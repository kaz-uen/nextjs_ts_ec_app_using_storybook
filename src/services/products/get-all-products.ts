import type { ApiContext, Category, Condition, Product } from "@/types";
import { fetcher } from "@/utils";
import { ApiError } from "@/errors";

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
  /**
   * 本プロジェクトは、APIサーバー側でjson-serverを使用していることを前提にコードが組まれている。
   * その上で、json-serverは以下のような便利なクエリパラメータを標準でサポートしている：
   * (1)ページネーション用パラメータ:
   * ・_page: ページ番号
   * ・_limit: 1ページあたりの件数
   * (2)ソート用パラメータ:
   * ・_sort: ソートするフィールド
   * ・_order: ソート順（ascまたはdesc）
   */
  const query = params.toString()

  try {
    return await fetcher(query.length > 0 ? `${path}?${query}` : path, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          alert("認証エラー: 再ログインしてください。");
          break;
        case 403:
          alert("権限がありません。");
          break;
        case 404:
          alert("データが見つかりませんでした。");
          break;
        case 500:
          alert("サーバーエラーが発生しました。");
          break;
        default:
          alert("不明なエラーが発生しました。");
      }
    } else {
      console.error('予期しないエラー：', error);
    }
    throw error;
  }
}

export default getAllProducts;
