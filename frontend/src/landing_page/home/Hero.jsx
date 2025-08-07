import React from "react";

function Hero() {
  return (
    <>
      <div className="Container p-5 mb-5">
        <div className="row text-Center">
          <img
            src="/media/image/homeHero.png"
            alt="HomeHero"
            className="mb-5"
          />
          <h1 className="mt-5 fw-bold">
            Simplify Your Investments with TradeBuddy
          </h1>
          <p>
            Your all-in-one platform for seamless stock trading, intelligent
            portfolio tracking, and real-time market insights — designed for
            modern investors.
          </p>
          <button
            className="btn btn-primary p-2 fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default Hero;
