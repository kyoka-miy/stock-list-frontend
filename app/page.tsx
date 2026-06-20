import { GoogleOAuthProvider } from "@react-oauth/google";
import StockListTemplate from "./components/templates/StockListTemplate";

export default function Home() {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <StockListTemplate />
    </GoogleOAuthProvider>
  );
}
