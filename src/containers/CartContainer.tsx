'use client';

import Link from "next/link";
import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import purchase from "@/services/purchases/purchase";
import { ApiContext } from "@/types";
import { useAuthGuard } from "@/utils/hooks";
import { useState } from "react";
import { theme } from "@/themes";
import styled from "styled-components";

const Inner = styled.div`
  margin-inline: auto;
  max-width: 980px;
  padding: 32px 16px;
  @media screen and (min-width: ${theme.breakPoints.md}) {
    padding: 32px 0;
  }
`

const Heading = styled.h1`
  font-size: ${theme.fontSizes.large}px;
  margin-bottom: 16px;
`

const Text = styled.p`
  font-size: ${theme.fontSizes.medium}px;
  margin-bottom: 8px;
`

const ContinueLink = styled(Link)`
  text-decoration: underline;
  cursor: pointer;
`

const ProductItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  list-style-type: none;
`

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const ProductImage = styled.img`
  width: 160px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: gray;
  margin-right: 24px;
`

const ProductName = styled.div`
  width: 250px;
`

const ProductNameText = styled.h2`
  font-size: ${theme.fontSizes.mediumLarge}px;
`

const ProductPrice = styled.div`
  width: 90px;
  font-size: ${theme.fontSizes.mediumLarge}px;
  font-weight: bold;
  color: ${theme.colors.red};
`

const Buttons = styled.div`
  display: flex;
  gap: 32px;
`

const PurchaseButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: ${theme.colors.black};
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.medium}px;
  font-weight: bold;
  transition: opacity .2s;

  &:hover {
    opacity: .5;
  }
`

const DeleteButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`

/**
 * カートコンテナ
 */
const CartContainer = () => {
  // 認証状態をチェック
  // 未認証の場合は自動的にサインインページにリダイレクト
  useAuthGuard();

  // ローディング状態を管理するstate
  const [isLoading, setIsLoading] = useState(false);

  // API通信用のコンテキスト設定
  const context: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
  }

  // ShoppingCartContextから現在のカート状態と操作関数を取得
  const { cart, removeProductFromCart } = useShoppingCartContext();

  /**
   * 削除ボタンクリック時のハンドラー
   * 指定されたIDの商品をカートから削除
   * @param id 削除する商品のID
   */
  const handleRemoveButtonClick = (id: number) => {
    removeProductFromCart(id);
  }

  /**
   * 購入ボタンクリック時のハンドラー
   * 指定されたIDの商品を購入し、成功時にカートから削除
   * @param id 購入する商品のID
   */
  const handleBuyButtonClick = async (id: number) => {
    try {
      // ローディング状態を開始
      setIsLoading(true);
      // 購入APIを呼び出し
      await purchase(context, { productId: id });
      // NOTE：成功時のユーザー通知（トーストやモーダルなどのUI通知に変更する）
      window.alert('購入しました');
      // 商品購入後はカートから商品を削除する
      removeProductFromCart(id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
      } else {
        // NOTE：Error以外の例外用の処理を追加する
        console.log(err);
      }
    } finally {
      // 処理完了後、ローディング状態を解除
      setIsLoading(false);
    }
  }

  return (
    <Inner>
      <Heading>ショッピングカート</Heading>

      {/* ローディング中の表示 */}
      {isLoading ? (
        <p>処理中...</p>
      ) : (
        <div>
          {/* カートが空の場合の表示 */}
          {cart.length === 0 ? (
            <>
              <Text>ショッピングカートに商品はありません。</Text>
              <ContinueLink href="/">ショッピングを続ける</ContinueLink>
            </>
          ) : (
            // カート内の商品一覧を表示
            <ul>
              {cart.map((p) => (
                <>
                  <ProductItem key={p.id}>
                    <ProductInfo>
                      <ProductImage src={p.imageUrl} alt={p.title} />
                      <ProductName>
                        <ProductNameText>{p.title}</ProductNameText>
                        <p>商品ID：{p.id}</p>
                      </ProductName>
                      <ProductPrice>{p.price.toLocaleString()}円</ProductPrice>
                    </ProductInfo>
                    <Buttons>
                      {/* 購入ボタン - ローディング中は無効化 */}
                      <PurchaseButton onClick={() => handleBuyButtonClick(p.id)} disabled={isLoading}>購入</PurchaseButton>
                      {/* 削除ボタン - ローディング中は無効化 */}
                      <DeleteButton onClick={() => handleRemoveButtonClick(p.id)} disabled={isLoading}>X削除</DeleteButton>
                    </Buttons>
                  </ProductItem>
                  <hr />
                </>
              ))}
            </ul>
          )}
        </div>
      )}
    </Inner>
  )
}

export default CartContainer;
