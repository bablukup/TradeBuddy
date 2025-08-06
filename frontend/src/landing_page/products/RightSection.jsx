import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
}) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col mt-5">
            <h1>{productName}</h1>
            <p>{productDescription}</p>
            <a href={learnMore} style={{ margin: "50px" }}>
              Learn More
            </a>
          </div>
          <div className="col m-3 ">
            <img src={imageURL} alt="TradeBuddy" />
          </div>
        </div>
      </div>
    </>
  );
}

export default RightSection;
