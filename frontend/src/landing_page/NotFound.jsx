import React from "react";

function NotFound() {
  return (
    <>
      <div className="Container p-5 mb-5">
        <div className="row text-Center">
          <h1 className="mt-5">404</h1>
          <p className="mt-2 mb-4">Page Not Found</p>
          <button
            className="btn btn-primary p-2 fs-5 mb-5"
            style={{ width: "20%", margin: "0 auto" }}
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
