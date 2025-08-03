import React from "react";

function Pricing() {
  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-4">
            <h1 className="fs-2 mb-5">Unbeatable Pricing</h1>
            <p className="text-muted">
              We pioneered transparent, discount broking in India. Flat fees. No
              hidden charges.
            </p>
            <a href="/">See Pricing</a>
          </div>
          <div className="col-2"></div>
          <div className="col-6">
            <div className="row p-2 border text-center">
              <div className="col p-2 border">
                <h1 className="mb-3">₹ 0</h1>
                <p>Free equity delivery & direct mutual funds</p>
              </div>
              <div className="col p-2 border">
                <h1 className="mb-3">₹ 0</h1>
                <p>Intraday and F&O trades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
