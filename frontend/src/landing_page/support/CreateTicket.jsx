import React from "react";

function CreateTicket() {
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-6">
            <div className="card">
              <img
                src="\media\image\help.svg"
                class="card-img-top"
                alt="Help"
              />
              <div className="card-body">
                <h5 className="card-title">Quick chat</h5>

                <p className="card-text me-2">
                  Start a quick chat now for instant help!
                </p>
                <button class="btn btn-primary" type="submit">
                  Chat Now
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <img
                src="/media/image/call.svg"
                className="card-img-top"
                alt="Help"
                style={{ width: "334px", height: "230px" }}
              />

              <div className="card-body">
                <h5 className="card-title ">Quick call</h5>
                <p className="card-text me-2">
                  Call us quickly for immediate support!
                </p>
                <button class="btn btn-primary " type="submit">
                  Call Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <h5 class="fw-bold mt-5">
          24/7 support available. Reach out to us anytime, and we’ll be happy to
          help.
        </h5>
      </div>
    </>
  );
}

export default CreateTicket;
