import React, { useState, useEffect } from "react";
import axios from "axios";

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

  if (loading) return <p>⏳ Loading holdings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
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
              const profClass = profitLoss >= 0 ? "profit" : "loss";
              const netClass = String(stock.net || "").includes("-")
                ? "loss"
                : "profit";
              const dayClass = String(stock.day || "").includes("-")
                ? "loss"
                : "profit";

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

      {/* Summary Section */}
      <div className="row">
        <div className="col">
          <h5>{formatCurrency(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>{formatCurrency(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={pnl >= 0 ? "profit" : "loss"}>
            {formatCurrency(pnl)} ({pnlPercent.toFixed(2)}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
    </>
  );
};

export default Holdings;
