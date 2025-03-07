'use client';

import useProduct from "@/services/products/use-product";
import ProductDetail from "@/components/organisms/ProductDetail";
import AddToButtonContainer from "@/containers/AddToCarButtonContainer";
import type { ApiContext, Product } from "@/types";

interface ProductDetailContainerProps {
  productId: number;
  product?: Product;
}

const ProductDetailContainer = (
  { productId, product }: ProductDetailContainerProps
) => {
  const context: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
  }

  // 最新の商品情報を取得し、更新があった場合にはinitialで指定されているデータを上書きする
  const { product: p } = useProduct(context, { id: productId, initial: product});
  // ※この実装に関しては /src/containers/UserProfileContainer.tsx の解説を参照

  if (!p) return <div>Loading...</div>

  return (
    <div>
      <ProductDetail product={p} />
      <AddToButtonContainer product={p} />
    </div>
  )
}

export default ProductDetailContainer;
