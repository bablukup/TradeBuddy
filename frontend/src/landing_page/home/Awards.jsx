import React from "react";

function Awards() {
  return (
    <>
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 p-3">
            <img
              src="/media/image/largestBroker.svg"
              alt="largestBroker"
              className="img-fluid"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>
          <div className="col-12 col-md-6 p-3 mt-3 mt-md-0">
            <h1>India’s Leading Stock Platform</h1>
            <p className="mb-5">
              Join over 2 million investors who power their financial journeys
              with seamless trading in a wide range of markets, every single
              day.
            </p>
            <div className="row">
              <div className="col-6">
                <ul>
                  <li>Trade stocks easily</li>
                  <li>Real-time analytics</li>
                  <li>Invest IPOs funds</li>
                </ul>
              </div>
              <div className="col-6">
                <ul>
                  <li>Advanced tracking tools</li>
                  <li>Nationwide trust</li>
                  <li>Personalized insights</li>
                </ul>
              </div>
            </div>
            <img
              src="/media/image/pressLogos.png"
              alt="pressLogos"
              className="img-fluid mt-4"
              style={{ maxWidth: "80%" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Awards;
