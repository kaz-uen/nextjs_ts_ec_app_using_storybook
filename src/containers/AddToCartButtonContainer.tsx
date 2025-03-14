'use client';

import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { theme } from "@/themes";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";
import { ShoppingCartIcon } from '@/components/atoms/IconButton';
import styled from "styled-components";

interface AddToCartButtonContainerProps {
  product: Product; //追加される商品
}

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  background-color: #23abdd;
  transition: opacity .2s;

  &:hover {
    opacity: .8;
  }
`

const ButtonText = styled.span`
  color: ${theme.colors.white};
  font-size: ${theme.fontSizes.small}px;
  font-weight: bold;
  margin-left: 4px;
`

const CartIcon = styled(ShoppingCartIcon)`
  color: ${theme.colors.white};
`

/**
 * カート追加ボタンコンテナ
 */
const AddToCartButtonContainer = ({ product }: AddToCartButtonContainerProps) => {
  const router = useRouter();

  // ShoppingCartContextから現在のカート状態と追加関数を取得
  const { cart, addProductToCart } = useShoppingCartContext();

  /**
   * カートに追加ボタンのクリックハンドラー
   * 1. 商品の重複チェック
   * 2. カートへの商品追加
   * 3. ユーザーの選択に応じたカートページへの遷移
   */
  const handleAddToCartButtonClick = () => {
    try {
      const productId = Number(product.id);
      // カート内に同じ商品が存在するかチェック
      const result = cart.findIndex((v) => v.id === productId);

      // 同じ商品がカートに存在しない場合はカートに追加する
      if (result === -1) {
        addProductToCart(product);
        // NOTE：カートに追加した後、トースト通知などでユーザーにフィードバックを提供する
        const checkFlg = window.confirm('カートに移動しますか？');
        if (checkFlg) {
          // カートページに遷移する
          router.push('/cart');
        }
      } else {
        // 重複商品がある場合はユーザーに通知
        // NOTE：トーストやモーダルなどのUI通知に変更する
        window.alert('すでに同じ商品がカートに存在します。');
      }
    } catch (error) {
      console.error('カートに商品を追加できませんでした:', error);
      // NOTE：エラーメッセージをユーザーに表示する処理をここに追加
    }
  }

  return (
    <Button onClick={handleAddToCartButtonClick}>
      <CartIcon />
      <ButtonText>カートに追加</ButtonText>
    </Button>
  )
}

export default AddToCartButtonContainer;
