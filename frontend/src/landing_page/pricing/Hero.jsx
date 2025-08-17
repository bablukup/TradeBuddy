import React from "react";

function Hero() {
  return (
    <div className="container my-5">
      <div className="text-center mb-5 px-3 px-md-0">
        <h1 className="fw-bold mb-3">Charges</h1>
        <p
          className="text-muted mx-auto"
          style={{ fontSize: "1.25rem", maxWidth: "600px" }}
        >
          List of all charges and taxes
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 px-4">
          <img
            src="/media/image/pricingEquity.svg"
            alt="Free equity delivery"
            className="img-fluid mb-3"
            style={{ maxHeight: "150px", objectFit: "contain" }}
          />
          <h2 className="text-center">Free equity delivery</h2>
          <p className="text-center mt-3">
            All equity delivery investments (NSE, BSE), are absolutely free — ₹0
            brokerage.
          </p>
        </div>

        <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 px-4">
          <img
            src="/media/image/pricingEquity.svg"
            alt="Intraday and F&O trades"
            className="img-fluid mb-3"
            style={{ maxHeight: "150px", objectFit: "contain" }}
          />
          <h2 className="text-center">Intraday and F&O trades</h2>
          <p className="text-center mt-3">
            Flat ₹20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        <div className="col-12 col-md-4 d-flex flex-column align-items-center mb-4 px-4">
          <img
            src="/media/image/pricingEquity.svg"
            alt="Free direct MF"
            className="img-fluid mb-3"
            style={{ maxHeight: "150px", objectFit: "contain" }}
          />
          <h2 className="text-center">Free direct MF</h2>
          <p className="text-center mt-3">
            All direct mutual fund investments are absolutely free — ₹0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
