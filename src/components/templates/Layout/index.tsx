import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>

  )
}

export default Layout;
