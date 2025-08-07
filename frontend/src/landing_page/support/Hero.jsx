import React from "react";

function Hero() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col">
            <h1 className="fw-bold mb-3">Support Portal</h1>
            <form class="d-flex" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
