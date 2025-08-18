import React from "react";
import Menu from "./Menu";

const TopBar = () => {
  // Example static values; aapko yeh dynamically API ya state se lena hoga
  const niftyValue = 100.2;
  const niftyChangePercent = 0.45; // Example
  const sensexValue = 100.2;
  const sensexChangePercent = -0.32; // Example

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="index-block">
          <p className="index-name">NIFTY 50</p>
          <p className="index-points">{niftyValue.toFixed(2)}</p>
          <p
            className={`percent ${niftyChangePercent >= 0 ? "profit" : "loss"}`}
          >
            {niftyChangePercent >= 0
              ? `+${niftyChangePercent.toFixed(2)}%`
              : `${niftyChangePercent.toFixed(2)}%`}
          </p>
        </div>
        <div className="index-block">
          <p className="index-name">SENSEX</p>
          <p className="index-points">{sensexValue.toFixed(2)}</p>
          <p
            className={`percent ${
              sensexChangePercent >= 0 ? "profit" : "loss"
            }`}
          >
            {sensexChangePercent >= 0
              ? `+${sensexChangePercent.toFixed(2)}%`
              : `${sensexChangePercent.toFixed(2)}%`}
          </p>
        </div>
      </div>

      <Menu />

      <style>{`
        .topbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);
          font-family: "Inter", sans-serif;
        }
        .indices-container {
          display: flex;
          gap: 24px;
          align-items: center;
        }
        .index-block {
          display: flex;
          flex-direction: column;
          text-align: center;
          font-size: 0.9rem;
          color: #223344;
        }
        .index-name {
          font-weight: 600;
          margin: 0 0 2px 0;
          font-size: 0.85rem;
          color: #012945;
          letter-spacing: 0.04em;
        }
        .index-points {
          font-weight: 700;
          font-size: 1.1rem;
          margin: 0;
        }
        .percent {
          margin: 0;
          font-weight: 600;
          font-size: 0.85rem;
        }
        .profit {
          color: #2e7d32;
        }
        .loss {
          color: #d32f2f;
        }
        @media (max-width: 600px) {
          .topbar-container {
            flex-direction: column;
            gap: 8px;
          }
          .indices-container {
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default TopBar;
