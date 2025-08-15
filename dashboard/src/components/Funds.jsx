import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Funds = () => {
  const [funds, setFunds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

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

  if (loading) return <p className="loading-text">⏳ Loading funds...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <>
      <div className="funds-message">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="funds-actions">
          <Link className="btn btn-green" to="#">
            Add funds
          </Link>
          <Link className="btn btn-blue" to="#">
            Withdraw
          </Link>
        </div>
      </div>
      <div className="row assets-row">
        <div className="col assets-col">
          <p className="section-title">Equity</p>
          <div className="table funds-table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">
                {formatCurrency(funds.availableMargin)}
              </p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{formatCurrency(funds.usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formatCurrency(funds.availableCash)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>{formatCurrency(funds.openingBalance)}</p>
            </div>
            <div className="data">
              <p>Holdings Value</p>
              <p>{formatCurrency(funds.holdingsValue)}</p>
            </div>
            <div className="data">
              <p>Investment</p>
              <p>{formatCurrency(funds.investment)}</p>
            </div>
            <div className="data">
              <p>P&L</p>
              <p className={funds.pnl >= 0 ? "profit" : "loss"}>
                {formatCurrency(funds.pnl)} ({funds.pnlPercent}%)
              </p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>{formatCurrency(funds.collateralLiquid)}</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>{formatCurrency(funds.collateralEquity)}</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>{formatCurrency(funds.totalCollateral)}</p>
            </div>
          </div>
        </div>
        <div className="col commodity-col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue open-account-btn" to="#">
              Open Account
            </Link>
          </div>
        </div>
      </div>

      {/* Inline Styles for minor improvements */}
      <style>{`
        .loading-text, .error-text {
          text-align: center;
          margin-top: 2rem;
          font-weight: 600;
          font-size: 1.1rem;
        }
        .error-text {
          color: #d32f2f;
        }
        .funds-message {
          text-align: center;
          margin-bottom: 1.8rem;
          font-weight: 600;
          font-size: 1rem;
          color: #012945;
        }
        .funds-actions {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 0.5rem;
        }
        .assets-row {
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .assets-col {
          flex: 1 1 380px;
          max-width: 420px;
        }
        .commodity-col {
          flex: 0 1 300px;
          max-width: 320px;
          display: flex;
          align-items: flex-start;
        }
        .section-title {
          font-weight: 600;
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: #012945;
        }
        .funds-table {
          background: #f4fbfd;
          padding: 20px;
          border-radius: 14px;
          box-shadow: 0 5px 12px rgb(1 41 69 / 0.05);
        }
        .data {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-weight: 500;
          color: #012945;
        }
        .imp {
          font-weight: 700;
          color: #012945;
        }
        .colored {
          color: #2e7d32;
        }
        .profit {
          color: #2e7d32;
          font-weight: 700;
        }
        .loss {
          color: #d32f2f;
          font-weight: 700;
        }
        .commodity {
          background: #e8f1f4;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 3px 15px rgb(1 41 69 / 0.1);
          text-align: center;
          color: #012945;
          font-weight: 600;
          font-size: 1rem;
        }
        .open-account-btn {
          margin-top: 1rem;
          padding: 10px 22px;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
};

export default Funds;
