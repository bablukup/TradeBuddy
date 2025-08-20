import React from "react";

function NotFound() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#fff", padding: "15px" }}
    >
      <div className="text-center" style={{ maxWidth: "400px", width: "100%" }}>
        <img
          src="/media/image/404.svg"
          alt="404 Not Found"
          className="img-fluid mb-4"
          style={{ maxHeight: "180px", margin: "0 auto" }}
        />
        <h1 className="display-1 mb-2">404</h1>
        <p className="fs-4 mb-3 fw-semibold">Page Not Found</p>
        <p className="text-muted mb-4">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mb-4">
          <button
            className="btn btn-primary px-4"
            style={{ borderRadius: "30px", fontWeight: "500" }}
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up Now
          </button>
          <button
            className="btn btn-outline-secondary px-4"
            style={{ borderRadius: "30px", fontWeight: "500" }}
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
