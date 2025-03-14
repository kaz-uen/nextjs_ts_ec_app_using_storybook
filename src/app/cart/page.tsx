import CartContainer from "@/containers/CartContainer";
import Layout from "@/components/templates/Layout";

/**
 * カートページのメインコンポーネント
 * サーバーサイドレンダリング（SSR）
 */
const CartPage = () => {
  return (
    <Layout>
      <CartContainer />
    </Layout>
  )
}

export default CartPage;
