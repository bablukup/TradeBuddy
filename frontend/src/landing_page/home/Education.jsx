import React from "react";

function Education() {
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <img src="\media\image\education.svg" alt="education" />
          </div>
          <div className="col-6">
            <h1 className="fs-2 mb-5">Completely Free Stock Education</h1>
            <p className="text-muted">
              The world’s most comprehensive online guide to stock markets—from
              beginner basics to advanced trading mastery.
            </p>
            <a href="/">Start Learning Now</a>
            <p className="text-muted mt-5">
              TradingQ&A: India’s most active community for all your trading and
              investment questions.
            </p>
            <a href="/">Ask Your First Question</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Education;
