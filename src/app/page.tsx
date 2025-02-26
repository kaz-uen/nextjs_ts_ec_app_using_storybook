import "./reset.css";
import Layout from "@/components/templates/Layout";
import Intro from "@/components/organisms/Intro";
import getAllProducts from "@/services/products/get-all-products";
import HomePageContainer from "@/containers/HomePageContainer";
import { ApiContext } from "@/types";

const getProductData = async () => {
  const context: ApiContext = {
    apiRootUrl: process.env.API_BASE_URL || 'http://localhost:5000',
  }

  try {
    const [clothesProducts, bookProducts, shoesProducts] = await Promise.all([
      getAllProducts(context, { category: 'clothes', limit: 6, page: 1}),
      getAllProducts(context, { category: 'book', limit: 6, page: 1}),
      getAllProducts(context, { category: 'shoes', limit: 6, page: 1}),
    ])

    return {
      clothesProducts,
      bookProducts,
      shoesProducts,
    }
  } catch (error) {
    console.error('商品データの取得に失敗しました：', error);

    return {
      clothesProducts: [],
      bookProducts: [],
      shoesProducts: [],
    }
  }
}

const Home = async () => {
  const products = await getProductData();

  return (
    <Layout>
      <Intro
        title="タイトル"
        description="テキストが入ります。テキストが入ります。テキストが入ります。"
      />
      <HomePageContainer products={products} />
    </Layout>
  );
}

export default Home;
