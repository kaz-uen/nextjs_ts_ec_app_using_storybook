import { Product } from "@/types";
import { Reducer } from "react";

type ShopReducerAction =
  | {
      type: 'ADD_PRODUCT'
      payload: Product
    }
  | {
      type: 'REMOVE_PRODUCT'
      payload: number
    }

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * 商品追加アクション
 * @param product 商品
 * @param state 現在の状態
 * @returns 次の状態
 */
const addProductToCart = (product: Product, state: Product[]) => {
  return [...state, product];
}

/**
 * 商品削除アクション
 * @param productId 商品のid
 * @param state 現在の状態
 * @returns 次の状態
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  const removeItemIndex = state.findIndex((item) => item.id === productId);
  const newState = [...state];
  newState.splice(removeItemIndex, 1);
  return newState;
}

/**
 * ショッピングカートのReducer
 * @param state 現在の状態
 * @param action アクション
 * @returns 次の状態
 */
export const shopReducer: Reducer<Product[], ShopReducerAction> = (state: Product[], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return addProductToCart(action.payload, state);
    case REMOVE_PRODUCT:
      return removeProductFromCart(action.payload, state);
    default:
      return state;
  }
}
