import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();
  // Sample logos and names can be changed as per your needs
  const items = [
    { src: "/media/image/smallcaseLogo.png", name: "Smallcase" },
    { src: "/media/image/goldenpiLogo.png", name: "GoldenPi" },
    { src: "/media/image/sensibullLogo.svg", name: "Sensibull" },
    { src: "/media/image/goldenpiLogo.png", name: "GoldenPi" },
    { src: "/media/image/goldenpiLogo.png", name: "GoldenPi" },
    { src: "/media/image/goldenpiLogo.png", name: "GoldenPi" },
  ];

  return (
    <div className="container">
      <div className="row mt-5 mb-3 justify-content-center">
        <div className="col-12 text-center mb-4">
          <h1 className="fw-bold">TradeBuddy Universe</h1>
        </div>
        {items.map((item, idx) => (
          <div
            key={idx}
            className="col-6 col-md-4 mb-4 d-flex flex-column align-items-center"
          >
            <img
              src={item.src}
              alt={item.name}
              style={{ maxWidth: "120px", maxHeight: "70px" }}
              className="mb-2 img-fluid"
            />
            <p className="fw-semibold">{item.name}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary p-2 fs-5 mt-3 mb-5"
          style={{ maxWidth: "240px", width: "100%", borderRadius: "30px" }}
          onClick={() => navigate("/signup")}
        >
          Sign Up Now
        </button>
      </div>
    </div>
  );
}

export default Universe;
