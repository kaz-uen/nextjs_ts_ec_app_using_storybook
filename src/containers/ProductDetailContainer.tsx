'use client';

import useProduct from "@/services/products/use-product";
import ProductDetail from "@/components/organisms/ProductDetail";
import type { ApiContext, Product } from "@/types";

interface ProductDetailContainerProps {
  productId: number;
  product?: Product;
}

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const ProductDetailContainer = (
  { productId, product }: ProductDetailContainerProps
) => {
  // 最新の商品情報を取得し、更新があった場合にはinitialで指定されているデータを上書きする
  const { product: p } = useProduct(context, { id: productId, initial: product});
  // ※この実装に関しては /src/containers/UserProfileContainer.tsx の解説を参照

  if (!p) return <div>Loading...</div>

  return <ProductDetail product={p} />
}

export default ProductDetailContainer;
