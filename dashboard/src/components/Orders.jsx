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
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.trades || []);
      })
      .catch(() => {
        setError("Error fetching orders");
      })
      .finally(() => setLoading(false));
  }, [BASE_URL]);

  const formatDateTime = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <p className="text-center mt-5 fs-5 text-muted">⏳ Loading orders...</p>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <p className="text-danger fw-bold fs-5">{error}</p>
        <Link to="/" className="btn btn-outline-success mt-3">
          Back to Home
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-5">
        <p className="fw-semibold text-muted fs-5">
          📭 You haven't placed any orders today
        </p>
        <Link to="/" className="btn btn-outline-primary mt-3">
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4 fw-bold text text-center"> Your Orders</h2>
      <div className="table-responsive rounded shadow-sm">
        <table className="table table-borderless table-hover align-middle">
          <thead className="table-light">
            <tr className="text-center">
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="text-center">
                <td className="fw-semibold">{order.name}</td>
                <td>{order.qty}</td>
                <td>₹{order.price}</td>
                <td>
                  <span
                    className={`badge rounded-pill ${
                      order.mode === "buy"
                        ? "bg-success-subtle text-success"
                        : "bg-danger-subtle text-danger"
                    } px-3 py-2 text-uppercase fw-bold`}
                  >
                    {order.mode}
                  </span>
                </td>
                <td className="text-muted">
                  {formatDateTime(order.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
