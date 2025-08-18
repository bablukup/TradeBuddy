import React, { useState, useEffect } from "react";
import axios from "axios";
import DoughnutChart from "/charts/doughnut";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  const formatCurrency = (num) => {
    if (isNaN(num)) return "₹0.00";
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  };

  const safeValue = (val) =>
    val && !isNaN(val) && Number(val) > 0 ? Number(val) : 0;

  const fetchHoldings = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to view holdings");
      setLoading(false);
      return;
    }

    axios
      .get(`${BASE_URL}/api/trade/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllHoldings(res.data.portfolio || []);
        setError("");
      })
      .catch(() => {
        setError("Error fetching holdings");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHoldings();
    const interval = setInterval(fetchHoldings, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const getHoldingChartData = () => {
    return {
      labels: allHoldings.map((item) => item.name || "Unknown"),
      datasets: [
        {
          label: "Holdings Value",
          data: allHoldings.map(
            (item) => safeValue(item.price) * safeValue(item.qty)
          ),
          backgroundColor: [
            "#36A2EB",
            "#FF6384",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const totalInvestment = allHoldings.reduce(
    (sum, s) => sum + safeValue(s.avg) * safeValue(s.qty),
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, s) => sum + safeValue(s.price) * safeValue(s.qty),
    0
  );
  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;

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
      <h3 className="mb-4 fw-bold text-primary">
        Holdings ({allHoldings.length})
      </h3>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="border rounded p-3 text-center h-100 bg-white shadow-sm">
            <div className="fs-5 fw-bold">
              {formatCurrency(totalInvestment)}
            </div>
            <div className="text-secondary small mt-1">Total investment</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="border rounded p-3 text-center h-100 bg-white shadow-sm">
            <div className="fs-5 fw-bold">{formatCurrency(currentValue)}</div>
            <div className="text-secondary small mt-1">Current value</div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="border rounded p-3 text-center h-100 bg-white shadow-sm">
            <div
              className={
                pnl >= 0
                  ? "fs-5 fw-bold text-success"
                  : "fs-5 fw-bold text-danger"
              }
            >
              {formatCurrency(pnl)} ({pnlPercent.toFixed(2)}%)
            </div>
            <div className="text-secondary small mt-1">P&amp;L</div>
          </div>
        </div>
      </div>

      {/* Doughnut chart */}
      <div className="row mb-5">
        <div className="col-12 col-md-6 mx-auto">
          <div style={{ maxWidth: "400px", margin: "auto" }}>
            <DoughnutChart data={getHoldingChartData()} />
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="table-responsive mb-4">
        <table className="table table-hover align-middle shadow-sm bg-white">
          <thead className="table-light">
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&amp;L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const avg = safeValue(stock.avg);
              const price = safeValue(stock.price);
              const qty = safeValue(stock.qty);
              const curValue = price * qty;
              const profitLoss = curValue - avg * qty;
              const profClass =
                profitLoss >= 0
                  ? "text-success fw-bold"
                  : "text-danger fw-bold";
              const netClass = String(stock.net || "").includes("-")
                ? "text-danger"
                : "text-success";
              const dayClass = String(stock.day || "").includes("-")
                ? "text-danger"
                : "text-success";

              return (
                <tr key={index}>
                  <td>{stock.name || "—"}</td>
                  <td>{qty || "—"}</td>
                  <td>{avg ? formatCurrency(avg) : "—"}</td>
                  <td>{price ? formatCurrency(price) : "—"}</td>
                  <td>{curValue ? formatCurrency(curValue) : "—"}</td>
                  <td className={profClass}>
                    {avg && price && qty ? formatCurrency(profitLoss) : "—"}
                  </td>
                  <td className={netClass}>{stock.net || "—"}</td>
                  <td className={dayClass}>{stock.day || "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* In-page style for Zerodha look & responsiveness */}
      <style>{`
        .table th, .table td { vertical-align: middle !important; }
        .table { font-size: 1rem; }
        @media (max-width: 767px) {
          .table-responsive { font-size: .95rem; }
          .table th, .table td { padding: 6px !important; }
          .bg-white { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Holdings;
