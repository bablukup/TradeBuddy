import React from "react";

function Education() {
  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <img
              src="/media/image/education.svg"
              alt="education"
              className="img-fluid"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          </div>
          <div className="col-12 col-md-6">
            <h1 className="fs-2 mb-4">Completely Free Stock Education</h1>
            <p className="text-muted">
              The world’s most comprehensive online guide to stock markets—from
              beginner basics to advanced trading mastery.
            </p>
            <a href="/" className="btn btn-primary mb-3 d-inline-block">
              Start Learning Now
            </a>
            <p className="text-muted mt-4">
              TradingQ&A: India’s most active community for all your trading and
              investment questions.
            </p>
            <a href="/" className="btn btn-outline-primary d-inline-block">
              Ask Your First Question
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Education;
