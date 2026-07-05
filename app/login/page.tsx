"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginTemplate from "../components/templates/LoginTemplate";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <LoginTemplate setIsLoggedIn={() => router.push("/home")} />
    </GoogleOAuthProvider>
  );
}
