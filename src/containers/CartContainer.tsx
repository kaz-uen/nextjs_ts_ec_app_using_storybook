'use client';

import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import purchase from "@/services/purchases/purchase";
import { ApiContext } from "@/types";
import { useAuthGuard } from "@/utils/hooks";

/**
 * カートコンテナ
 */
const CartContainer = () => {
  // 認証ガード
  useAuthGuard();

  const context: ApiContext = {
    apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
  }

  const { cart, removeProductFromCart } = useShoppingCartContext();

  // 削除ボタンを押した時、商品を削除
  const handleRemoveButtonClick = (id: number) => {
    removeProductFromCart(id);
  }

  // 購入ボタンを押した時、商品を購入
  const handleBuyButtonClick = async (id: number) => {
    try {
      await purchase(context, { productId: id });
      window.alert('購入しました');
      // 商品購入後はカートから商品を削除する
      removeProductFromCart(id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        window.alert(err.message);
      }
    } finally {
      // NOTE：ローディングの終了など
    }
  }

  return (
    <div>
      {cart.map((p) => (
        <>
          <p>{p.title}</p>
          <p>{p.id}</p>
          <p>{p.price}</p>
          <button onClick={() => handleBuyButtonClick(p.id)}>購入</button>
          <button onClick={() => handleRemoveButtonClick(p.id)}>削除</button>
        </>
      ))}
    </div>
  )
}

export default CartContainer;
