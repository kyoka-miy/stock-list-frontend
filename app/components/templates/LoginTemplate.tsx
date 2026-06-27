"use client";

import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import styled, { keyframes } from "styled-components";

type Props = {
  onLogin: (credentialResponse: CredentialResponse) => void;
  onError: () => void;
};

const floatIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background:
    radial-gradient(
      circle at top left,
      rgba(51, 103, 214, 0.18),
      transparent 34%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(16, 185, 129, 0.16),
      transparent 28%
    ),
    linear-gradient(180deg, #f6fbff 0%, #eef4fb 100%);
`;

const Shell = styled.div`
  width: min(980px, 100%);
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  border-radius: 32px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.14);
  backdrop-filter: blur(18px);
  animation: ${floatIn} 420ms ease-out;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Hero = styled.div`
  position: relative;
  padding: 4rem 3.5rem;
  background:
    linear-gradient(
      160deg,
      rgba(11, 31, 58, 0.96) 0%,
      rgba(14, 59, 110, 0.92) 100%
    ),
    #0f2747;
  color: #f8fbff;

  @media (max-width: 900px) {
    padding: 3rem 2rem;
  }
`;

const Accent = styled.div`
  position: absolute;
  inset: auto -80px -80px auto;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(64, 196, 255, 0.28),
    rgba(64, 196, 255, 0)
  );
`;

const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #b7d5f7;
  font-size: 0.76rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Headline = styled.h1`
  margin: 1.25rem 0 0;
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

const Description = styled.p`
  margin: 1.2rem 0 0;
  max-width: 34rem;
  color: rgba(240, 247, 255, 0.82);
  font-size: 1rem;
  line-height: 1.8;
`;

const FeatureList = styled.div`
  margin-top: 2rem;
  display: grid;
  gap: 0.95rem;
`;

const Feature = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  color: #e5f0fb;
  font-size: 0.95rem;
  line-height: 1.7;
`;

const Dot = styled.span`
  margin-top: 0.55rem;
  width: 0.55rem;
  height: 0.55rem;
  flex: 0 0 auto;
  border-radius: 50%;
  background: linear-gradient(180deg, #68d5ff 0%, #2eaadc 100%);
  box-shadow: 0 0 0 6px rgba(104, 213, 255, 0.12);
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), #ffffff);

  @media (max-width: 900px) {
    padding: 2rem;
  }
`;

const Card = styled.div`
  padding: 2rem;
  border-radius: 24px;
  border: 1px solid #e4edf7;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
`;

const CardTitle = styled.h2`
  margin: 0;
  color: #11243d;
  font-size: 1.55rem;
  font-weight: 700;
  letter-spacing: -0.03em;
`;

const LoginArea = styled.div`
  margin-top: 1.8rem;
  display: flex;
  justify-content: center;
`;

export default function LoginTemplate({ onLogin, onError }: Props) {
  return (
    <Page>
      <Shell>
        <Hero>
          <Accent />
          <Eyebrow>Smart Watchlists</Eyebrow>
          <Headline>株式の比較と監視を、ひとつの画面で</Headline>
          <Description>
            気になる銘柄をリストにまとめて、指標をすばやく横断比較できます。
            ログインすると、あなた専用のウォッチリストにアクセスできます。
          </Description>
          <FeatureList>
            <Feature>
              <Dot />
              複数のウォッチリストを切り替えながら銘柄を整理
            </Feature>
            <Feature>
              <Dot />
              指標を一覧比較し、値動きの変化を即座に確認
            </Feature>
            <Feature>
              <Dot />
              行クリックで詳細情報をモーダル表示
            </Feature>
          </FeatureList>
        </Hero>
        <Panel>
          <Card>
            <CardTitle>Googleアカウントでログイン</CardTitle>
            <LoginArea>
              <GoogleLogin onSuccess={onLogin} onError={onError} />
            </LoginArea>
          </Card>
        </Panel>
      </Shell>
    </Page>
  );
}
