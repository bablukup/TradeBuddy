import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State for showing message on Open Account button click
  const [showMsg, setShowMsg] = useState(false);

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  // Click handler for Open Account button
  const handleClick = () => {
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1500);
  };

  const formatCurrency = (num) => {
    if (num === undefined || num === null) return "—";
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to view funds");
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/api/funds`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFunds(res.data);
        setError("");
      })
      .catch(() => {
        setError("Error fetching funds");
      })
      .finally(() => setLoading(false));
  }, [BASE_URL]);

  if (loading)
    return (
      <div className="text-center pt-5">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="mt-3 fw-semibold text-secondary">Loading data...</div>
      </div>
    );
  if (error)
    return <p className="text-center mt-5 text-danger fw-semibold">{error}</p>;

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <div className="funds-message">
          <span className="fs-6 fw-semibold text-primary">
            Instant, zero-cost fund transfers with UPI
          </span>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-3 mb-3 flex-wrap">
          <Link className="btn btn-success px-4" to="#">
            Add funds
          </Link>
          <Link className="btn btn-outline-primary px-4" to="#">
            Withdraw
          </Link>
        </div>
      </div>
      <div className="row justify-content-center gy-4 gx-lg-5 gx-3">
        {/* Equity Card */}
        <div className="col-12 col-md-7 col-lg-6">
          <div className="card shadow-sm h-100 border-0">
            <div className="card-body">
              <div className="mb-3">
                <span className="fw-bold fs-5 text-dark">Equity</span>
              </div>
              {/* Data grid */}
              <div className="row g-2">
                <InfoPair
                  label="Available margin"
                  value={formatCurrency(funds.availableMargin)}
                  valueClass="text-success"
                />
                <InfoPair
                  label="Used margin"
                  value={formatCurrency(funds.usedMargin)}
                />
                <InfoPair
                  label="Available cash"
                  value={formatCurrency(funds.availableCash)}
                />
                <InfoPair
                  label="Opening Balance"
                  value={formatCurrency(funds.openingBalance)}
                />
                <InfoPair
                  label="Holdings Value"
                  value={formatCurrency(funds.holdingsValue)}
                />
                <InfoPair
                  label="Investment"
                  value={formatCurrency(funds.investment)}
                />
                <InfoPair
                  label="P&L"
                  value={
                    <>
                      <span
                        className={
                          funds.pnl >= 0 ? "text-success" : "text-danger"
                        }
                      >
                        {formatCurrency(funds.pnl)}
                      </span>
                      <span
                        style={{ marginLeft: 6 }}
                        className={
                          funds.pnl >= 0 ? "text-success" : "text-danger"
                        }
                      >
                        ({funds.pnlPercent}%)
                      </span>
                    </>
                  }
                  valueClass={`${
                    funds.pnl >= 0
                      ? "fw-bold text-success"
                      : "fw-bold text-danger"
                  }`}
                />
                <InfoPair
                  label="Collateral (Liquid funds)"
                  value={formatCurrency(funds.collateralLiquid)}
                />
                <InfoPair
                  label="Collateral (Equity)"
                  value={formatCurrency(funds.collateralEquity)}
                />
                <InfoPair
                  label="Total Collateral"
                  value={formatCurrency(funds.totalCollateral)}
                  customRowFull
                />
              </div>
            </div>
          </div>
        </div>
        {/* Commodity card */}
        <div className="col-12 col-md-5 col-lg-4">
          <div
            className="card h-100 text-center border-0"
            style={{ background: "#f6fafc" }}
          >
            <div className="card-body d-flex flex-column justify-content-center">
              <p className="mb-2 fw-semibold text-dark">
                You don't have a commodity account
              </p>
              <button
                className="btn btn-primary px-4 mt-2 fw-semibold"
                type="button"
                onClick={handleClick}
                style={{ minWidth: "120px" }}
              >
                Open Account
              </button>
              {showMsg && (
                <div
                  className="alert alert-info py-1 px-2 mt-2"
                  style={{
                    fontSize: "0.99rem",
                    borderRadius: "7px",
                    transition: "opacity 0.2s",
                  }}
                >
                  Sorry, this service is currently unavailable.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Style tweaks for all screens including tablet */}
      <style>{`
        .card {
          border-radius: 14px !important;
        }
        .info-pair-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding: 8px 0;
          font-weight: 500;
          font-size: 1rem;
          flex-wrap: wrap;
        }
        .info-label {
          color: #234f62;
          min-width: 125px;
          flex: 1 0 55%;
          word-break: break-word;
        }
        .info-value {
          flex: 1 0 40%;
          text-align: right;
          word-break: break-word;
          font-weight: 600;
          color: #065b2b;
        }
        @media (max-width: 991px) {
          .info-label {
            min-width: 95px;
            font-size: 1rem;
          }
        }
        @media (max-width: 767px) {
          .card {
            padding: 10px !important;
          }
          .info-label,
          .info-value {
            font-size: 0.98rem;
          }
        }
      `}</style>
    </div>
  );
};

// Info row subcomponent for consistent, responsive layout
function InfoPair({ label, value, valueClass = "", customRowFull = false }) {
  return (
    <div
      className={
        customRowFull ? "info-pair-row border-top pt-2" : "info-pair-row"
      }
    >
      <span className="info-label">{label}</span>
      <span className={`info-value ${valueClass}`}>{value}</span>
    </div>
  );
}

export default Funds;
