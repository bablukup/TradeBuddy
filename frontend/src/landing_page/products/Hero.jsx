import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container">
      <div className="row mt-5 border-bottom mb-5">
        <div className="col-12 col-md-8 mx-auto text-center text-md-start">
          <h1 className="fw-bold">Products</h1>
          <h5 className="mb-2 mt-2">
            Sleek, modern, and intuitive trading platform designed for
            effortless investing.
          </h5>
          <p>
            Check out our&nbsp;
            <Link className="nav-link active d-inline p-0" to="/">
              offerings →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
