'use client';

import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Product } from "@/types";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "@/contexts/ShoppingCartContext/reducers";

/**
 * ショッピングカートのコンテキスト型定義
 * カートの状態と操作メソッドを含む
 */
type ShoppingCartContextType = {
  cart: Product[];  //カート内の商品配列
  addProductToCart: (product: Product) => void;  //商品追加メソッド
  removeProductFromCart: (productId: number) => void;  //商品削除メソッド
}

/**
 * ショッピングカートのコンテキスト作成
 * デフォルト値として空の配列と空の関数を設定
 */
const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
})

/**
 * ショッピングカートコンテキストを使用するためのカスタムフック
 * コンポーネントからカートの状態と操作メソッドにアクセスするために使用
 */
export const useShoppingCartContext = (): ShoppingCartContextType => useContext(ShoppingCartContext);

/**
 * ショッピングカートコンテキストプロバイダーコンポーネント
 * カートの状態管理とローカルストレージとの同期を行う
 *
 * @param children - 子コンポーネント
 */
export const ShoppingCartContextProvider = (
  { children }: { children?: React.ReactNode }
) => {
  // カートの状態管理にuseReducerを使用
  // 初期値は空配列
  const [cartState, dispatch] = useReducer(shopReducer, []);

  /**
   * コンポーネントマウント時にローカルストレージからカートデータを読み込む
   * 永続化されたカートの状態を復元する
   */
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as Product[];
      parsedCart.forEach(product => {
        dispatch({ type: ADD_PRODUCT, payload: product });
      })
    }
  }, [])

  /**
   * カートの状態が変更されたときにローカルストレージに保存
   * カートの状態を永続化する
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState])

  /**
   * 商品をカートに追加するメソッド
   * @param product - 追加する商品
   */
  const addProductToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
  }

  /**
   * 商品をカートから削除するメソッド
   * @param productId - 削除する商品のID
   */
  const removeProductFromCart = (productId: number) => {
    dispatch({ type: REMOVE_PRODUCT, payload: productId });
  }

  // コンテキストプロバイダーを返却
  // 値としてカートの状態と操作メソッドを提供
  return (
    <ShoppingCartContext.Provider
      value={{
        cart: cartState,
        addProductToCart,
        removeProductFromCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
