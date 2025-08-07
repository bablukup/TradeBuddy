import React from "react";

function Hero() {
  return (
    <>
      <div className="container">
        <div className="row">
          <h1 className="mt-5 fw-bold">Charges</h1>
          <p
            className="text-muted"
            style={{ fontSize: "1.25rem", color: "#9b9b9b" }}
          >
            List of all charges and taxes
          </p>
          <div className="col-4">
            <img src="\media\image\pricingEquity.svg" alt="pricingEquity" />
            <h2>Free equity delivery</h2>
            <p className="mt-3">
              All equity delivery investments (NSE, BSE), are absolutely free —
              ₹ 0 brokerage.
            </p>
          </div>
          <div className="col-4">
            <img src="\media\image\pricingEquity.svg" alt="pricing" />
            <h2>Intraday and F&O trades</h2>
            <p className="mt-3">
              Flat ₹ 20 or 0.03% (whichever is lower) per executed order on
              intraday trades across equity, currency, and commodity trades.
              Flat ₹20 on all option trades.
            </p>
          </div>
          <div className="col-4">
            <img src="\media\image\pricingEquity.svg" alt="pricing" />
            <h2>Free direct MF</h2>
            <p className="mt-3">
              All direct mutual fund investments are absolutely free — ₹ 0
              commissions & DP charges.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
