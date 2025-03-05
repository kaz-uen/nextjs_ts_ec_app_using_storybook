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
  flex-wrap: wrap;
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

const HomePageContainer = ({ products }: HomePageContainerProps) => {
  const {clothesProducts, bookProducts, shoesProducts} = products;

  const renderProductCardCarousel = (products: Product[]) => {
    return (
      <ProductList>
        {products.map((p: Product,) => (
          <ProductItem key={p.id}>
            <Link href={`/product/${p.id}`}>
              <ProductImage src={p.imageUrl} alt={p.title} />
              <ProductName>{p.title}</ProductName>
              <ProductPrice>{p.price.toLocaleString()}円</ProductPrice>
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
