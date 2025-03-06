import React, { createContext, useContext, useReducer } from "react";
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
  const products: Product[] = [];
  const [cartState, dispatch] = useReducer(shopReducer, products);

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
