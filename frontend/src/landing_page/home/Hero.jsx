import React from "react";

function Hero() {
  return (
    <>
      <div className="container p-5 mb-5">
        <div className="row justify-content-center text-center align-items-center">
          <div className="col-12 col-md-8 col-lg-6">
            <img
              src="/media/image/homeHero.png"
              alt="HomeHero"
              className="mb-4 img-fluid rounded shadow"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
            <h1 className="mt-3 fw-bold" style={{ fontWeight: "700" }}>
              Simplify Your Investments with TradeBuddy
            </h1>
            <p className="lead text-muted my-4">
              Your all-in-one platform for seamless stock trading, intelligent
              portfolio tracking, and real-time market insights — designed for
              modern investors.
            </p>
            <button
              className="btn btn-primary btn-lg px-5"
              style={{ borderRadius: "50px" }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
