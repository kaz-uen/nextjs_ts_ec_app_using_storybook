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
const AddToButtonContainer = ({ product }: AddToCartButtonContainerProps) => {
  const router = useRouter();
  const { cart, addProductToCart } = useShoppingCartContext();

  const handleAddToCartButtonClick = () => {
    const productId = Number(product.id);
    const result = cart.findIndex((v) => v.id === productId);

    // 同じ商品がカートに存在しない場合はカートに追加する
    if (result === -1) {
      addProductToCart(product);
    }

    // カートに追加したら、自動的にカートページに遷移する
    router.push('/cart');
  }

  return (
    <button onClick={handleAddToCartButtonClick}>カートに追加</button>
  )
}

export default AddToButtonContainer;
