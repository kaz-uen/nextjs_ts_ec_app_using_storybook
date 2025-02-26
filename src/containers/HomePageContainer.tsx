'use client';

import { Product } from "@/types";
import { theme } from "@/themes";
import styled from "styled-components";
import Link from "next/link";

type HomePageContainerProps = {
  products: {
    clothesProducts: Product[];
    bookProducts: Product[];
    shoesProducts: Product[];
  }
}

const Root = styled.div`
  display: flex;
  justify-content: center;
`

const Inner = styled.div`
  @media screen and (min-width: ${theme.breakPoints.md}) {
    width: 1040px;
  }
`

const Heading = styled.h2`
  font-size: ${theme.fontSizes.medium}px;
`

const ProductList = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
`

const ProductItem = styled.li`
  display: flex;
  flex-direction: column;
`

const ProductImage = styled.img`
  width: 160px;
  height: 160px;
  background-color: gray;
`

const ProductName = styled.h3`
  font-size: ${theme.fontSizes.small}px;
`

const HomePageContainer = ({ products }: HomePageContainerProps) => {
  const {clothesProducts, bookProducts, shoesProducts} = products;

  const renderProductCardCarousel = (products: Product[]) => {
    return (
      <ProductList>
        {products.map((p: Product, i: number) => (
          <ProductItem key={p.title}>
            <Link href={`/products/${p.id}`}>
              <ProductImage src={p.imageUrl} alt={p.title} />
              <ProductName>{p.title}</ProductName>
              <span>{p.price}円</span>
            </Link>
          </ProductItem>
        ))}
      </ProductList>
    )
  }

  return (
    <Root>
      <Inner>
        <Heading>トップス</Heading>
        {renderProductCardCarousel(clothesProducts)}
        <hr />
        <Heading>本</Heading>
        {renderProductCardCarousel(bookProducts)}
        <hr />
        <Heading>シューズ</Heading>
        {renderProductCardCarousel(shoesProducts)}
      </Inner>
    </Root>
  );
}

export default HomePageContainer;
