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
  }, []);

  if (loading) return <p>⏳ Loading funds...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
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

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
