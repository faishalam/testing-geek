"use client";

import { QueryProviders } from "@/components/queryProviders/QueryProvider";
import "../../app/globals.css";
import AuthLayoutComponents from "../../components/Layout/LayoutAuthComponents";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthLayoutComponents>
        <QueryProviders>
            {children}
          {/* <AuthProviders>{children}</AuthProviders> */}
        </QueryProviders>
      </AuthLayoutComponents>
    </>
  );
}
