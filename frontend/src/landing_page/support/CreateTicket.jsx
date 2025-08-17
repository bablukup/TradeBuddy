import React from "react";

function CreateTicket() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row g-4">
        <div className="col-12 col-md-6">
          <div className="card h-100">
            <img
              src="/media/image/help.svg" // Corrected path slashes
              className="card-img-top"
              alt="Help"
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Quick chat</h5>
              <p className="card-text flex-grow-1">
                Start a quick chat now for instant help!
              </p>
              <button className="btn btn-primary mt-auto" type="button">
                Chat Now
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card h-100">
            <img
              src="/media/image/call.svg"
              className="card-img-top"
              alt="Call"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">Quick call</h5>
              <p className="card-text flex-grow-1">
                Call us quickly for immediate support!
              </p>
              <button className="btn btn-primary mt-auto" type="button">
                Call Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <h5 className="fw-bold mt-5 text-center">
        24/7 support available. Reach out to us anytime, and we’ll be happy to
        help.
      </h5>
    </div>
  );
}

export default CreateTicket;
