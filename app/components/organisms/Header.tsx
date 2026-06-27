"use client";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ENDPOINTS } from "@/app/constants/endpointConstants";
import { usePost } from "@/app/hooks/usePost";

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 8px;
`;

const ProfileArea = styled.div`
  position: relative;
  flex: 0 0 auto;
`;

const ProfileButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #d8e3f3;
  border-radius: 50%;
  background: #fff;
  color: #2559a7;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(17, 36, 61, 0.08);
  transition: background 0.2s ease;

  &:hover {
    background: #f2f8ff;
    cursor: pointer;
  }

  .material-symbols-outlined {
    font-size: 22px;
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 240px;
  background: #fff;
  border: 1px solid #dfe8f5;
  border-radius: 12px;
  padding: 0.85rem;
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.12);
  z-index: 1200;
`;

const MenuLabel = styled.div`
  color: #5b6b7f;
  font-size: 12px;
  margin-bottom: 2px;
`;

const MenuValue = styled.div`
  color: #1a2740;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  word-break: break-word;
`;

const LogoutButton = styled.button`
  width: 100%;
  border: 1px solid #f3c5c5;
  border-radius: 8px;
  background: #fff5f5;
  color: #b3261e;
  font-size: 13px;
  font-weight: 600;
  padding: 0.5rem 0.8rem;
  cursor: pointer;

  &:hover {
    background: #ffe8e8;
  }
`;

const TitleSection = styled.div``;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: #222;
`;

const Subtitle = styled.div`
  color: #666;
  font-size: 16px;
  margin-top: 4px;
`;

export default function Header() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [accountName, setAccountName] = useState<string>("-");
  const [accountEmail, setAccountEmail] = useState<string>("-");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    if (storedName) {
      setAccountName(storedName);
    }
    if (storedEmail) {
      setAccountEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { post: logout } = usePost(ENDPOINTS.AUTH_LOGOUT);

  const handleLogout = async () => {
    await logout({});
    localStorage.removeItem("access_token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.reload();
  };

  return (
    <HeaderRow>
      <TitleSection>
        <Title>株式ウォッチリスト</Title>
        <Subtitle>
          気になる銘柄を追加して、重要指標を一覧で比較できます
        </Subtitle>
      </TitleSection>
      <ProfileArea ref={menuRef}>
        <ProfileButton
          type="button"
          onClick={() => setIsUserMenuOpen((prev) => !prev)}
          aria-label="Open user menu"
        >
          <span className="material-symbols-outlined">person</span>
        </ProfileButton>
        {isUserMenuOpen && (
          <ProfileMenu>
            <MenuLabel>アカウント名</MenuLabel>
            <MenuValue>{accountName}</MenuValue>
            <MenuLabel>メールアドレス</MenuLabel>
            <MenuValue>{accountEmail}</MenuValue>
            <LogoutButton type="button" onClick={handleLogout}>
              ログアウト
            </LogoutButton>
          </ProfileMenu>
        )}
      </ProfileArea>
    </HeaderRow>
  );
}
