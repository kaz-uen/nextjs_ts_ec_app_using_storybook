'use client';

import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Main = styled.main`
  min-height: 100vh;
`

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>

  )
}

export default Layout;
