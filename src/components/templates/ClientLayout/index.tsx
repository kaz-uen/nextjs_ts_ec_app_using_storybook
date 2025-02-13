'use client';

import StyledComponentsRegistry from "@/app/lib/registry";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ApiContext } from "@/types";

const context: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_PATH || '/api/proxy',
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <AuthContextProvider context={context}>
        {children}
      </AuthContextProvider>
    </StyledComponentsRegistry>
  );
}
