import React from "react";

function Footer() {
  return (
    <>
      <footer style={{ background: "rgb(248, 249, 250)" }}>
        <div className="container">
          <div className="row">
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
          <div className="mt-5 text-smale text-muted fs-6">
            <p>
              <p className="mb-3">
                {" "}
                <b>TradeBuddy (Demo Full-Stack Project) </b>{" "}
              </p>{" "}
              <br />
              TradeBuddy is a self-designed, modern investment platform created
              as a demonstration project to showcase my skills in both frontend
              and backend web development within the fintech domain. This
              full-stack project was built using React for the frontend and
              [your backend technology—e.g., Node.js, Express, Django, or any
              other] for the backend API, providing a complete simulation of a
              secure, scalable trading platform.
              {/* <p className="mt-4 mb-2">
              {" "}
              <b>Key highlights:</b>{" "}
            </p>
            <p>
              User-friendly dashboard for simulated trading (stocks,
              commodities, funds), built with React.
            </p>
            <p>
              RESTful backend/API for handling mock user accounts, portfolios,
              and transaction data.
            </p>
            <p>
              Demo functionalities: user authentication, account management,
              order simulation, and real-time data updates.
            </p>
            <p>
              Custom branding with modern color themes, vector images, and
              educational sections.
            </p>
            <p>
              Project is strictly for personal portfolio and academic
              demonstration—no real trading or financial transactions.
            </p> */}
              <p className="mt-4 mb-2">
                {" "}
                <b>Note:</b>{" "}
              </p>
              <p>
                This is a non-commercial, self-built demo project for learning
                and resume purposes and is not affiliated with any real
                financial institution or brokerage.
              </p>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
