'use client';

import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
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

    // TODO：一度のディスパッチで全商品を設定する方針に変更
    // dispatch({ type: 'SET_CART', payload: parsedCart });
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

  // TODO：カート機能拡張のため以下のメソッドも追加して実装する
  /**
   * 商品の数量を更新するメソッド
   * @param productId - 更新する商品のID
   * @param quantity - 新しい数量
   */
  // const updateProductQuantity = (productId: number, quantity: number) => {
  //   dispatch({ type: UPDATE_QUANTITY, payload: { id: productId, quantity } });
  // }

  /**
   * カートを空にするメソッド
   */
  // const clearCart = () => {
  //   dispatch({ type: CLEAR_CART });
  // }

  /**
   * カート内の合計金額を計算するメソッド
   * @returns カート内商品の合計金額
   */
  // const calculateTotal = () => {
  //   return cartState.reduce((total, product) => total + product.price * (product.quantity || 1), 0);
  // }

  // TODO：コンテキスト値をメモ化する
  // const contextValue = useMemo(() => ({
  //   cart: cartState,
  //   addProductToCart,
  //   removeProductFromCart,
  // }), [cartState])

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
