import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("⚠ Please login to view your orders");
      setLoading(false);
      return;
    }

    fetch(`${BASE_URL}/api/trade/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        setOrders(data.trades || []);
      })
      .catch(() => {
        setError("Error fetching orders");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">⏳ Loading orders...</p>;

  if (error)
    return (
      <div className="orders-error" style={{ textAlign: "center" }}>
        <p style={{ color: "red" }}>{error}</p>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </div>
    );

  if (orders.length === 0) {
    return (
      <div className="no-orders" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1.1rem" }}>
          📭 You haven't placed any orders today
        </p>
        <Link to="/" className="btn">
          Get started
        </Link>
      </div>
    );
  }

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="orders" style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>📑 Your Orders</h2>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#f4f6f8" }}>
            <tr>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Qty</th>
              <th style={thStyle}>Price</th>
              <th style={thStyle}>Type</th>
              <th style={thStyle}>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={order._id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#fafafa" : "#fff",
                  textAlign: "center",
                }}
              >
                <td style={tdStyle}>{order.name}</td>
                <td style={tdStyle}>{order.qty}</td>
                <td style={tdStyle}>₹{order.price}</td>
                <td style={tdStyle}>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor:
                        order.mode === "buy"
                          ? "rgba(0,200,0,0.1)"
                          : "rgba(255,0,0,0.1)",
                      color: order.mode === "buy" ? "green" : "red",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {order.mode}
                  </span>
                </td>
                <td style={tdStyle}>{formatDateTime(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Reusable table header style
const thStyle = {
  padding: "12px",
  fontWeight: "600",
  fontSize: "0.9rem",
  textAlign: "center",
  borderBottom: "1px solid #ddd",
};

// Reusable table data style
const tdStyle = {
  padding: "10px",
  fontSize: "0.9rem",
  borderBottom: "1px solid #eee",
};

export default Orders;
