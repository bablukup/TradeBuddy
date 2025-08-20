import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();
  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 text-center p-5">
          <h1 className="fw-bold mt-4 mb-3">Open a TradeBuddy account</h1>
          <p className="mb-4">
            Discover TradeBuddy’s intuitive, transparent, and powerful investing
            features that simplify your journey.
          </p>
          <button
            className="btn btn-primary btn-lg px-5 mb-4"
            style={{
              borderRadius: "50px",
              maxWidth: "300px",
              width: "100%",
              margin: "0 auto",
            }}
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
