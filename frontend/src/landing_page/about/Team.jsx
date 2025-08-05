import React from "react";

function Team() {
  return (
    <>
      <div className="container ">
        <div className="row p-5 mb-5 border-top">
          <h1 className="fs-4 text-center ">People</h1>
        </div>

        <div className="row p-5 mt-5">
          <div className="row text-muted fs-6">
            <div className="col-6">
              <img
                src=".\media\image\developer.svg"
                alt="developer"
                style={{ borderRadius: "5%" }}
              />
              <h4>Bablu Kumar</h4>
              <h6>Developer</h6>
            </div>
            <div className="col-6">
              <p>
                I’m a passionate full-stack developer who loves turning ideas
                into fast, scalable, and user-friendly digital products.
                Comfortable working across both frontend and backend
                technologies, I enjoy building products that solve real-world
                problems and deliver delightful user experiences. With a strong
                focus on clean code, continuous learning, and modern best
                practices, I’m driven by the challenge of bringing impactful
                products like TreadBuddy to life. When I’m not coding, I’m
                exploring new tools, contributing to projects, and constantly
                sharpening my craft.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Team;
