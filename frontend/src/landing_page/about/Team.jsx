import React from "react";

function Team() {
  return (
    <div className="container">
      <div className="row p-5 mb-5 border-top">
        <h1 className="fs-4 text-center">People</h1>
      </div>

      <div className="row p-5 mt-5 align-items-center">
        <div className="col-12 col-md-5 text-center mb-4 mb-md-0">
          <img
            src="/media/image/developer.svg"
            alt="Bablu Kumar"
            style={{ borderRadius: "5%", maxWidth: "100%", height: "auto" }}
            className="img-fluid"
          />
          <h4 className="mt-3">Bablu Kumar</h4>
          <h6 className="text-muted">Developer</h6>
          <div className="mt-3 d-flex justify-content-center gap-3">
            <a
              href="https://www.linkedin.com/in/bablukup/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="text-decoration-none fs-4 text-primary"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://twitter.com/bablukup"
              target="_blank"
              rel="noopener noreferrer"
              title="Twitter"
              className="text-decoration-none fs-4 text-info"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://github.com/bablukup"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="text-decoration-none fs-4 text-dark"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-7">
          <p className="text-muted fs-6">
            I’m a passionate full-stack developer who loves turning ideas into
            fast, scalable, and user-friendly digital products. Comfortable
            working across both frontend and backend technologies, I enjoy
            building products that solve real-world problems and deliver
            delightful user experiences. With a strong focus on clean code,
            continuous learning, and modern best practices, I’m driven by the
            challenge of bringing impactful products like TradeBuddy to life.
            When I’m not coding, I’m exploring new tools, contributing to
            projects, and constantly sharpening my craft.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Team;
