'use client';

import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import purchase from "@/services/purchases/purchase";
import { ApiContext } from "@/types";
import { useAuthGuard } from "@/utils/hooks";
import { useState } from "react";

/**
 * カートコンテナ
 */
const CartContainer = () => {
  // 認証ガード
  useAuthGuard();

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      await purchase(context, { productId: id });
      // NOTE：トーストやモーダルなどのUI通知に変更する
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
      setIsLoading(false);
    }
  }

  return (
    <div>
      {isLoading ? (
        <p>処理中...</p>
      ) : (
        <div>
          {cart.length === 0 ? (
            <p>カートは空です。</p>
          ) : (
            cart.map((p) => (
              <div key={p.id}>
                <p>{p.title}</p>
                <p>{p.id}</p>
                <p>{p.price}</p>
                <button onClick={() => handleBuyButtonClick(p.id)} disabled={isLoading}>購入</button>
                <button onClick={() => handleRemoveButtonClick(p.id)} disabled={isLoading}>削除</button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default CartContainer;
