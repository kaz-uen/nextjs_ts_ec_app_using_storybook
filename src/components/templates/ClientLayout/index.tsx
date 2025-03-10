'use client';

import StyledComponentsRegistry from "@/app/lib/registry";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ShoppingCartContextProvider } from "@/contexts/ShoppingCartContext";
import { ApiContext } from "@/types";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    /**
     * ShoppingCartContextProvider:
     * ショッピングカートの状態管理プロバイダー
     * アプリケーション全体でカートの状態を共有するために使用
     *
     * AuthContextProvider：
     * 認証機能を提供するプロバイダー
     * アプリケーション全体で認証の状態を共有するために使用
     */
    <StyledComponentsRegistry>
      <AuthContextProvider context={context}>
        <ShoppingCartContextProvider>
          {children}
          </ShoppingCartContextProvider>
        </AuthContextProvider>
    </StyledComponentsRegistry>
  );
}
