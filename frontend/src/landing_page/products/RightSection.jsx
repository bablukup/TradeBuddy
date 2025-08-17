import React from "react";

function RightSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
}) {
  return (
    <div className="container my-5">
      <div className="row align-items-center flex-column-reverse flex-md-row">
        <div className="col-12 col-md-6 mt-3 mt-md-0">
          <h1>{productName}</h1>
          <p>{productDescription}</p>
          <a
            href={learnMore}
            className="btn btn-outline-primary mt-3"
            style={{ marginLeft: 0 }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
        <div className="col-12 col-md-6 mb-4 mb-md-0 text-center">
          <img
            src={imageURL}
            alt={productName}
            className="img-fluid"
            style={{ maxHeight: "300px", objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
