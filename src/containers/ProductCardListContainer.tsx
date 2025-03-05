import useSearch from "@/services/products/use-search";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { theme } from "@/themes";
import type { Category, Condition, Product } from "@/types";

interface ProductCardListContainerProps {
  category?: Category;
  conditions?: Condition[]
}

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
`

const ProductItem = styled.li`
  display: flex;
  flex-direction: column;
`

const ProductImage = styled(Image)`
  width: 100%;
  min-width: 160px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: gray;
`

const ProductName = styled.h3`
  font-size: ${theme.fontSizes.small}px;
`

const ProductPrice = styled.span`
  display: block;
  text-align: right;
  font-size: ${theme.fontSizes.small}px;
`

const ProductCardListContainer = ({ category, conditions }: ProductCardListContainerProps) => {
  const context = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
  }
  /**
   * next.config.mjsのrewritesの設定（下記部分）により、
   * /api/proxyへのリクエストはhttp://localhost:8000（APIサーバー）に転送されるようになっている
   * そのため、APIサーバーのURLを直接指定する必要はない
   *
   * return [
   *  {
   *     source: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/:path*`,
   *     destination: `${process.env.API_BASE_URL}/:path*`,
   *   },
   * ]
   */

  const { products, isLoading } = useSearch(context, {
    category,
    conditions,
  })

  return (
    <>
      {isLoading ? (
        <div>読み込み中</div>
      ) : (
        <ProductList>
          {products.map((p: Product) => (
            <ProductItem key={p.id}>
              <Link href={`/product/${p.id}`}>
                <ProductImage
                  src={p.imageUrl}
                  alt={p.title}
                  width={160}
                  height={160}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtgJyxtZIHwAAAABJRU5ErkJggg=="
                />
                <ProductName>{p.title}</ProductName>
                <ProductPrice>{p.price.toLocaleString()}円</ProductPrice>
              </Link>
            </ProductItem>
          ))}
        </ProductList>
      )}
    </>
  )
}

export default ProductCardListContainer;
