import React from "react";

const Apps = () => {
  return (
    <div className="apps-container">
      <h1 className="apps-title">Apps</h1>
      <div className="apps-message">
        🚧 Work in progress: New apps and features coming soon!
      </div>

      <style>{`
        .apps-container {
          max-width: 900px;
          margin: 2rem auto;
          padding: 1.2rem 1rem;
          font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
            Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          color: #012945;
          text-align: center;
        }
        .apps-title {
          font-weight: 700;
          font-size: 2.2rem;
          margin-bottom: 1rem;
        }
        .apps-message {
          font-size: 1.1rem;
          color: #586e86;
          font-weight: 600;
          background: #e8f0fe;
          padding: 1.2rem;
          border-radius: 10px;
          border: 1px solid #bdd7fe;
          display: inline-block;
        }
        @media (max-width: 600px) {
          .apps-container {
            margin: 1rem;
            padding: 1rem 0.6rem;
          }
          .apps-title {
            font-size: 1.8rem;
          }
          .apps-message {
            font-size: 1rem;
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Apps;
