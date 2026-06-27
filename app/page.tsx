"use client";

import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import StockListTemplate from "./components/templates/StockListTemplate";
import LoginTemplate from "./components/templates/LoginTemplate";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      {isLoggedIn ? (
        <StockListTemplate />
      ) : (
        <LoginTemplate setIsLoggedIn={setIsLoggedIn} />
      )}
    </GoogleOAuthProvider>
  );
}
