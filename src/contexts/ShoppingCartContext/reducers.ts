import { Product } from "@/types";
import { Reducer } from "react";

/**
 * ショッピングカートのReducerアクション型定義
 * 商品の追加と削除の2種類のアクションを定義
 */
type ShopReducerAction =
  | {
      type: 'ADD_PRODUCT'
      payload: Product
    }
  | {
      type: 'REMOVE_PRODUCT'
      payload: number
    }

/**
 * アクションタイプの定数定義
 * アクション名の文字列リテラルを定数として管理
 */
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

/**
 * 商品追加アクション処理
 * 現在のカート状態に新しい商品を追加する
 *
 * @param product - 追加する商品
 * @param state - 現在のカート状態
 * @returns 新しいカート状態
 */
const addProductToCart = (product: Product, state: Product[]) => {
  // 現在の状態に新しい商品を追加した新しい配列を返す
  return [...state, product];
}

/**
 * 商品削除アクション処理
 * 指定されたIDの商品をカートから削除する
 *
 * @param productId - 削除する商品のID
 * @param state - 現在のカート状態
 * @returns 新しいカート状態
 */
const removeProductFromCart = (productId: number, state: Product[]) => {
  // 削除する商品のインデックスを検索
  const removeItemIndex = state.findIndex((item) => item.id === productId);

  // 商品が見つからない場合は現在の状態を返す
  if (removeItemIndex === -1) return state;
  // NOTE：findIndexが-1を返す（商品が見つからない場合）場合、spliceは配列の最後の要素を削除してしまうため、商品が存在するかどうかのチェックを追加

  // 現在の状態をコピー
  const newState = [...state];
  // 指定されたインデックスの商品を削除
  newState.splice(removeItemIndex, 1);
  return newState;
}

/**
 * ショッピングカートのReducer
 * アクションに応じてカートの状態を更新する
 *
 * @param state - 現在のカート状態
 * @param action - 実行するアクション
 * @returns 新しいカート状態
 */
export const shopReducer: Reducer<Product[], ShopReducerAction> = (state: Product[], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      // 商品追加処理を実行
      return addProductToCart(action.payload, state);
    case REMOVE_PRODUCT:
      // 商品削除処理を実行
      return removeProductFromCart(action.payload, state);
    default:
      return state;
  }
}
