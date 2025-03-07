import CartContainer from "@/containers/CartContainer";
import Layout from "@/components/templates/Layout";

const CartPage = () => {
  return (
    <Layout>
      <div>カートページ</div>
      <CartContainer />
    </Layout>
  )
}

export default CartPage;
