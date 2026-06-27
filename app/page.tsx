"use client";

import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StockListTemplate from "./components/templates/StockListTemplate";
import LoginTemplate from "./components/templates/LoginTemplate";
import { usePost } from "./hooks/usePost";
import { ENDPOINTS } from "./constants/endpointConstants";

type GoogleAuthResponse = {
  access_token?: string;
};

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { post: login, data } = usePost<
    { id_token: string },
    GoogleAuthResponse
  >(ENDPOINTS.AUTH_GOOGLE);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (data?.access_token) {
      localStorage.setItem("access_token", data.access_token);
      setIsLoggedIn(true);
    }
  }, [data]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      {isLoggedIn ? (
        <StockListTemplate />
      ) : (
        <LoginTemplate
          onLogin={(credentialResponse) => {
            if (!credentialResponse.credential) return;
            login({ id_token: credentialResponse.credential });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      )}
    </GoogleOAuthProvider>
  );
}
