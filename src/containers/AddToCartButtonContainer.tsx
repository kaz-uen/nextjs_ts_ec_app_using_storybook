'use client';

import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import type { Product } from "@/types";
import { useRouter } from "next/navigation";

interface AddToCartButtonContainerProps {
  product: Product; //追加される商品
}

/**
 * カート追加ボタンコンテナ
 */
const AddToCartButtonContainer = ({ product }: AddToCartButtonContainerProps) => {
  const router = useRouter();
  const { cart, addProductToCart } = useShoppingCartContext();

  const handleAddToCartButtonClick = () => {
    try {
      const productId = Number(product.id);
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
        // NOTE：トーストやモーダルなどのUI通知に変更する
        window.alert('すでに同じ商品がカートに存在します。');
      }
    } catch (error) {
      console.error('カートに商品を追加できませんでした:', error);
      // NOTE：エラーメッセージをユーザーに表示する処理をここに追加
    }
  }

  return (
    <button onClick={handleAddToCartButtonClick}>カートに追加</button>
  )
}

export default AddToCartButtonContainer;
