import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import type { Product } from "@/types";

interface AddToCartButtonContainerProps {
  product: Product; //追加される商品
  onAddToCartButtonClick?: (product: Product) => void; //追加ボタンを押した時のイベントハンドラ
}

/**
 * カート追加ボタンコンテナ
 */
const AddToButtonContainer = ({ product, onAddToCartButtonClick }: AddToCartButtonContainerProps) => {
  const { cart, addProductToCart } = useShoppingCartContext();
  const handleAddToCartButtonClick = () => {
    const productId = Number(product.id);
    const result = cart.findIndex((v) => v.id === productId);

    // 同じ商品がカートに存在しない場合はカートに追加する
    if (result === -1) {
      addProductToCart(product);
    }

    onAddToCartButtonClick?.(product);
  }

  return (
    <button onClick={handleAddToCartButtonClick}>カートに追加</button>
  )
}

export default AddToButtonContainer;
