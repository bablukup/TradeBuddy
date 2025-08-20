import React from "react";

function Footer() {
  return (
    <footer style={{ background: "rgb(248, 249, 250)" }}>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h1 className="fs-2">TradeBuddy</h1>
            <p className="text-muted">
              &copy; 2025 TradeBuddy Financial Services Pvt. Ltd. All rights
              reserved.
            </p>
          </div>
          <div className="col">
            <p>
              <strong>Account</strong>
            </p>
            <a href="/signup">Open demat account</a>
            <br />
            <a href="/signup">Fund transfer</a>
          </div>
          <div className="col">
            <p>
              <strong>Support</strong>
            </p>
            <a href="/support">Contact us</a>
            <br />
            <a href="/support">Support portal</a>
          </div>
          <div className="col">
            <p>
              <strong>Company</strong>
            </p>
            <a href="/about">About</a>
            <br />
            <a href="/about">Careers</a>
          </div>
        </div>
        <div className="mt-5 text-muted fs-6">
          <p>
            This is a non-commercial demo project created for learning purposes
            and is not affiliated with any real financial institution.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
