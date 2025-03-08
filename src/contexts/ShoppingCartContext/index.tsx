'use client';

import React, { createContext, useContext, useEffect, useReducer } from "react";
import type { Product } from "@/types";
import { shopReducer, ADD_PRODUCT, REMOVE_PRODUCT } from "@/contexts/ShoppingCartContext/reducers";

type ShoppingCartContextType = {
  cart: Product[];
  addProductToCart: (product: Product) => void;
  removeProductFromCart: (productId: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
})

export const useShoppingCartContext = (): ShoppingCartContextType => useContext(ShoppingCartContext);

/**
 * ショッピングカートコンテキストプロバイダー
 */
export const ShoppingCartContextProvider = (
  { children }: { children?: React.ReactNode }
) => {
  const [cartState, dispatch] = useReducer(shopReducer, []);

  // カートデータを読み込む
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart) as Product[];
      parsedCart.forEach(product => {
        dispatch({ type: ADD_PRODUCT, payload: product });
      })
    }
  }, [])

  // カートデータの変更を保存
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartState));
  }, [cartState])

  // 商品をカートに追加
  const addProductToCart = (product: Product) => {
    dispatch({ type: ADD_PRODUCT, payload: product });
  }

  // 商品をカートから削除
  const removeProductFromCart = (productId: number) => {
    dispatch({ type: REMOVE_PRODUCT, payload: productId });
  }

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
