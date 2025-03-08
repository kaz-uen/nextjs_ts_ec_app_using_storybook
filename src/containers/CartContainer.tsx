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
    <div>
      {/* ローディング中の表示 */}
      {isLoading ? (
        <p>処理中...</p>
      ) : (
        <div>
          {/* カートが空の場合の表示 */}
          {cart.length === 0 ? (
            <p>カートは空です。</p>
          ) : (
            // カート内の商品一覧を表示
            cart.map((p) => (
              <div key={p.id}>
                <p>{p.title}</p>
                <p>{p.id}</p>
                <p>{p.price}</p>
                {/* 購入ボタン - ローディング中は無効化 */}
                <button onClick={() => handleBuyButtonClick(p.id)} disabled={isLoading}>購入</button>
                {/* 削除ボタン - ローディング中は無効化 */}
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
