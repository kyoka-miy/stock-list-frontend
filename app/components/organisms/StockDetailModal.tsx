"use client";
import styled from "styled-components";
import { StockInfo } from "@/app/api-interface/stock";

type Props = {
  stock: StockInfo;
  onClose: () => void;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const DetailModal = styled.div`
  width: min(1080px, 92vw);
  max-height: 84vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.28);
`;

const DetailHeader = styled.div`
  padding: 18px 22px 12px 22px;
  border-bottom: 1px solid #e6eaf0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #98a1b2;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
`;

const DetailTabs = styled.div`
  display: flex;
  gap: 28px;
  padding: 0 22px;
  border-bottom: 1px solid #e6eaf0;
`;

const Tab = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${({ $active }) => ($active ? "#1f2937" : "transparent")};
  color: ${({ $active }) => ($active ? "#1f2937" : "#9aa4b2")};
  font-size: 14px;
  font-weight: 700;
  padding: 13px 0 11px 0;
`;

const DetailBody = styled.div`
  padding: 18px 22px 24px 22px;
`;

const SectionTitle = styled.div`
  font-size: 13px;
  color: #8b95a7;
  font-weight: 700;
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 18px;
`;

const MetricCard = styled.div`
  background: #f3f5f8;
  border-radius: 10px;
  padding: 12px 12px 10px 12px;
`;

export const StockDetailModal = ({ stock, onClose }: Props) => {
  return (
    <Overlay onClick={onClose}>
      <DetailModal onClick={(e) => e.stopPropagation()}>
        <DetailHeader>
          <div>
            <div style={{ fontSize: 12, color: "#98a1b2", fontWeight: 700 }}>
              {stock.symbol} {stock.market}
            </div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: "#1f2937",
                lineHeight: 1.1,
              }}
            >
              {stock.name}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginTop: 6,
              }}
            >
              <span
                style={{
                  fontSize: 40,
                  fontWeight: 800,
                  color: "#1f2937",
                  lineHeight: 1,
                }}
              >
                {stock.current_price}
              </span>
              <span
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: String(stock.price_change_ratio).startsWith("-")
                    ? "#dc2626"
                    : "#16a34a",
                }}
              >
                {stock.price_change_ratio}
              </span>
            </div>
          </div>
          <CloseButton type="button" onClick={onClose}>
            x
          </CloseButton>
        </DetailHeader>

        <DetailTabs>
          <Tab $active>基本指標</Tab>
          <Tab>株価推移</Tab>
          <Tab>配当金</Tab>
          <Tab>キャッシュフロー</Tab>
          <Tab>業績</Tab>
        </DetailTabs>

        <DetailBody>
          <SectionTitle>バリュエーション</SectionTitle>
          <Grid>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>PER</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.per}倍
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>PBR</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.pbr}倍
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>配当利回り</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.dividend_yield}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>ROE</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.roe}%
              </div>
            </MetricCard>
          </Grid>

          <SectionTitle>1株あたり指標</SectionTitle>
          <Grid>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>1株配当</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.dividend_per_share}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>配当性向</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.payout_ratio}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>出来高</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.volume}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>時価総額</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.market_cap}
              </div>
            </MetricCard>
          </Grid>

          <SectionTitle>収益性・財務健全性</SectionTitle>
          <Grid>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>営業利益率</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.operating_margin}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>流動比率</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.current_ratio}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>売上成長率</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.revenue_growth}
              </div>
            </MetricCard>
            <MetricCard>
              <div style={{ fontSize: 12, color: "#8b95a7" }}>利益成長率</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1f2937" }}>
                {stock.earnings_growth}
              </div>
            </MetricCard>
          </Grid>
        </DetailBody>
      </DetailModal>
    </Overlay>
  );
};
