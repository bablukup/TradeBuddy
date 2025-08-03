import React from "react";
function Stats() {
  return (
    <>
      <div className="container p-3">
        <div className="row p-5">
          <div className="col-6 p-5">
            <h1 className="fs-2 mb-5">Trust with TradeBuddy</h1>
            <h2 className="fs-4">Customer-first always</h2>
            <p className="text-muted">
              Millions choose TradeBuddy, trusted with ₹3.5+ lakh crores
              transacted.
            </p>
            <h2 className="fs-4">No spam or gimmicks</h2>
            <p className="text-muted">
              No annoying distractions or tricks, just investing tools you
              control freely.
            </p>
            <h2 className="fs-4">The TradeBuddy universe</h2>
            <p className="text-muted">
              Not just an app, but a broad ecosystem with 30+ fintech partners.
            </p>
            <h2 className="fs-4">Do better with your money</h2>
            <p className="text-muted">
              Smart Alerts and Portfolio Guard help you invest confidently and
              quickly.
            </p>
          </div>
          <div className="col-6 p-5">
            <img
              src="\media\image\ecosystem.png"
              alt="ecosystem"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Stats;
