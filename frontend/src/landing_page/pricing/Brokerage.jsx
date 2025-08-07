import React from "react";

function Brokerage() {
  return (
    <>
      <div className="container">
        <div className="mb-4 text-center">
          <h1 className="fw-bold">
            See how TradeBuddy stacks up against the competition.
          </h1>
        </div>

        <div className="row text-center align-items-center shadow rounded mb-3">
          <div className="col-12 col-md-4 border bg-light">
            <h5 className="border-bottom py-3 fw-semibold">Feature</h5>
            <p className="border-bottom py-3 mb-0">Equity Delivery</p>
            <p className="border-bottom py-3 mb-0">Intraday</p>
            <p className="border-bottom py-3 mb-0">Mutual Funds</p>
          </div>

          <div className="col-12 col-md-4 border">
            <h5 className="border-bottom py-3 fw-semibold">TradeBuddy</h5>
            <p className="border-bottom py-3 mb-0 fw-bold text-success">₹0</p>
            <p className="border-bottom py-3 mb-0 fw-bold text-success">
              ₹0/order
            </p>
            <p className="border-bottom py-3 mb-0 fw-bold text-success">₹0</p>
          </div>

          <div className="col-12 col-md-4 border">
            <h5 className="border-bottom py-3 fw-semibold">Others</h5>
            <p className="border-bottom py-3 mb-0">₹20/order</p>
            <p className="border-bottom py-3 mb-0">₹30/order</p>
            <p className="border-bottom py-3 mb-0">₹10/order</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Brokerage;
