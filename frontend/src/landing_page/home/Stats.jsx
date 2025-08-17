import React from "react";

function Stats() {
  return (
    <>
      <div className="container p-3">
        <div className="row align-items-center p-4 p-md-5">
          <div className="col-12 col-md-6 p-3">
            <h1 className="fs-2 mb-4">Trust with TradeBuddy</h1>

            <h2 className="fs-5 mt-4">Customer-first always</h2>
            <p className="text-muted">
              Millions choose TradeBuddy, trusted with ₹3.5+ lakh crores
              transacted.
            </p>

            <h2 className="fs-5 mt-4">No spam or gimmicks</h2>
            <p className="text-muted">
              No annoying distractions or tricks, just investing tools you
              control freely.
            </p>

            <h2 className="fs-5 mt-4">The TradeBuddy universe</h2>
            <p className="text-muted">
              Not just an app, but a broad ecosystem with 30+ fintech partners.
            </p>

            <h2 className="fs-5 mt-4">Do better with your money</h2>
            <p className="text-muted">
              Smart Alerts and Portfolio Guard help you invest confidently and
              quickly.
            </p>
          </div>

          <div className="col-12 col-md-6 p-3">
            <img
              src="/media/image/ecosystem.svg"
              alt="ecosystem"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
