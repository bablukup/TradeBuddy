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
    return <p className="text-center mt-4">⏳ Loading orders...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-4">
        <p className="text-danger fw-bold">{error}</p>
        <Link to="/" className="btn btn-success mt-2">
          Back to Home
        </Link>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-4">
        <p className="fw-semibold">📭 You haven't placed any orders today</p>
        <Link to="/" className="btn btn-success mt-2">
          Get started
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3 fw-bold text-primary">📑 Your Orders</h2>
      <div className="table-responsive shadow rounded">
        <table className="table table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>Stock</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Type</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.qty}</td>
                <td>₹{order.price}</td>
                <td>
                  <span
                    className={`badge ${
                      order.mode === "buy"
                        ? "bg-success-subtle text-success"
                        : "bg-danger-subtle text-danger"
                    } px-3 py-2 text-uppercase fw-bold`}
                  >
                    {order.mode}
                  </span>
                </td>
                <td>{formatDateTime(order.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
