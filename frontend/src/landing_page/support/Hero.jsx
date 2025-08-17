import React, { useState } from "react";

function Hero() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search logic here
    alert(`Searching for: ${searchTerm}`);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12 col-md-8 mx-auto">
          <h1 className="fw-bold mb-3 text-center text-md-start">
            Support Portal
          </h1>
          <form
            className="d-flex flex-column flex-sm-row"
            role="search"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="form-control me-sm-2 mb-2 mb-sm-0"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              required
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Hero;
