"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";
import React, { ReactNode } from "react";

export default function googleAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    return <>{children}</>;
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
