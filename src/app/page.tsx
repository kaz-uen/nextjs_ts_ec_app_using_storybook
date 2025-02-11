// import Image from "next/image";
import "./reset.css";
import Layout from "@/components/templates/Layout";
import Intro from "@/components/organisms/Intro";

export default function Home() {
  return (
    <Layout>
      <Intro
        title="タイトル"
        description="テキストが入ります。テキストが入ります。テキストが入ります。"
      />
    </Layout>
  );
}
