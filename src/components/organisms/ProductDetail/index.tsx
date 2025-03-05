'use client';

import Image from "next/image";
import { Product } from "@/types";
import styled from "styled-components";
import { theme } from "@/themes";

interface ProductDetailProps {
  product: Product;
}

const DetailRoot = styled.section`
  margin-bottom: 8px;
`

const DetailInner = styled.article`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-inline: auto;
  max-width: 980px;
  padding: 32px;
  @media screen and (min-width: ${theme.breakPoints.md}) {
    flex-direction: row;
    padding: 32px 0;
  }
`

const ImageContainer = styled.div`
  width: 500px;
  margin-inline: auto;
`

const TextContainer = styled.div`
  width: 100%;
`

const ProductImage = styled(Image)`
  max-width: inherit;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: gray;
`

const ProductName = styled.h1`
  font-size: ${theme.fontSizes.large}px;
  font-weight: bold;
  margin-bottom: 16px;
`

const ProductPrice = styled.p`
  font-size: ${theme.fontSizes.large}px;
  font-weight: bold;
  color: ${theme.colors.red};
  margin-bottom: 4px;
`

const ProductId = styled.p`
  font-size: ${theme.fontSizes.extraSmall}px;
  margin-bottom: 4px;
`

const ProductPriceTax = styled.span`
  font-size: ${theme.fontSizes.extraSmall}px;
`

const ProductOwner = styled.p`
  font-size: ${theme.fontSizes.extraSmall}px;
  margin-bottom: 8px;
`

const ProductDescription = styled.p`
  font-size: ${theme.fontSizes.medium}px;
`

const ProductDetail = ({ product: p }: ProductDetailProps) => {
  return (
    <DetailRoot aria-label="商品詳細">
      <DetailInner>
        <ImageContainer>
          <ProductImage
            src={p.imageUrl}
            width={500}
            height={500}
            alt={`${p.title}の商品画像`}
          />
        </ImageContainer>
        <TextContainer>
          <ProductName>{p.title}</ProductName>
          <ProductPrice>{p.price.toLocaleString()}円<ProductPriceTax>（税込）</ProductPriceTax></ProductPrice>
          <ProductId>商品ID：{p.id}</ProductId>
          <ProductOwner>出品者：{p.owner.username}</ProductOwner>
          {p.description && <ProductDescription>{p.description}</ProductDescription>}
        </TextContainer>
      </DetailInner>
    </DetailRoot>
  )
}

export default ProductDetail;
