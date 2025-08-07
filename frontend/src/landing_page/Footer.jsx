import React from "react";

function Footer() {
  return (
    <>
      <footer style={{ background: "rgb(248, 249, 250)" }}>
        <div className="container">
          <div className="row ">
            <div className="col">
              <h1 className="fs-2 ">TradeBuddy</h1>
              <p className="text-muted">
                &copy; 2025 - 2025, TradeBuddy Financial Services Pvt. Ltd. All
                rights reserved.
              </p>
            </div>
            <div className="col">
              <p>Account</p>
              <a href="">Open demat account</a> <br />
              <a href="">Fund transfer</a>
              <br />
              <a href="">Commodity</a>
              <br />
              <a href="">Referral program</a>
            </div>
            <div className="col">
              <p>Support</p>
              <a href="">Contact us</a>
              <br />
              <a href="">Support portal</a>
              <br />
              <a href="">Downloads</a>
              <br />
              <a href="">T-Connect blog</a>
            </div>
            <div className="col">
              <p>Company</p>
              <a>About</a> <br />
              <a>Philosophy</a> <br />
              <a>Press & media</a>
              <br />
              <a>Careers</a> <br />
              <a>TradeBuddy Cares (CSR)</a>
              <br />
              <a>TradeBuddy.tech</a>
              <br />
              <a>Open source</a>
              <br />
            </div>
          </div>
          <div className="mt-5 text-small text-muted fs-6">
            <div className="mb-3">
              <strong>TradeBuddy (Demo Full-Stack Project)</strong>
            </div>
            <p>
              TradeBuddy is a self-designed, modern investment platform created
              as a demonstration project to showcase my skills in both frontend
              and backend web development within the fintech domain. This
              full-stack project was built using React for the frontend and
              [your backend technology—e.g., Node.js, Express, Django, or any
              other] for the backend API, providing a complete simulation of a
              secure, scalable trading platform.
            </p>

            <div className="mt-4 mb-2">
              <strong>Note:</strong>
            </div>
            <p>
              This is a non-commercial, self-built demo project for learning and
              resume purposes and is not affiliated with any real financial
              institution or brokerage.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
