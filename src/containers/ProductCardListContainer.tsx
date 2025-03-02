import useSearch from "@/services/products/use-search";
import Link from "next/link";
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

const ProductImage = styled.img`
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

const context = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

const ProductCardListContainer = ({ category, conditions }: ProductCardListContainerProps) => {
  const { products, isLoading } = useSearch(context, {
    category,
    conditions,
  })

  return (
    <ProductList>
      {products.map((p: Product) => (
        <ProductItem key={p.id}>
          <Link href={`/products/${p.id}`}>
            <ProductImage src={p.imageUrl} alt={p.title} />
            <ProductName>{p.title}</ProductName>
            <ProductPrice>{p.price.toLocaleString()}円</ProductPrice>
          </Link>
        </ProductItem>
      ))}
    </ProductList>
  )
}

export default ProductCardListContainer;
