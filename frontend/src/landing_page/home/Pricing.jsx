import React from "react";

function Pricing() {
  return (
    <>
      <div className="container mb-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 mb-4 mb-md-0">
            <h1 className="fs-2 mb-4">Unbeatable Pricing</h1>
            <p className="text-muted">
              We pioneered transparent, discount broking in India. Flat fees. No
              hidden charges.
            </p>
            <a href="/pricing" className="btn btn-primary mt-3">
              See Pricing
            </a>
          </div>

          <div className="col-12 col-md-1"></div>

          <div className="col-12 col-md-6">
            <div className="row p-3 border text-center">
              <div className="col p-3 border">
                <h1 className="mb-3">₹ 0</h1>
                <p>Free equity delivery &amp; direct mutual funds</p>
              </div>
              <div className="col p-3 border">
                <h1 className="mb-3">₹ 0</h1>
                <p>Intraday and F&amp;O trades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pricing;
