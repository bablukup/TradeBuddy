import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("open"); // 'open' or 'executed'
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
    setError("");
    setLoading(true);

    fetch(`${BASE_URL}/api/trade/history`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch orders");
        return res.json();
      })
      .then((data) => {
        setOrders(data.trades || []);
        setError("");
      })
      .catch(() => {
        setError("Error fetching orders");
      })
      .finally(() => setLoading(false));
  }, [BASE_URL]);

  const openOrders = orders.filter((o) => o.status !== "executed");
  const executedOrders = orders.filter((o) => o.status === "executed");
  const list = tab === "open" ? openOrders : executedOrders;

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? "—"
      : d.toLocaleString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          day: "numeric",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <div
      className="orders-container"
      style={{ padding: 20, maxWidth: 1000, margin: "auto" }}
    >
      <h2>Your Orders</h2>

      {/* Tab Buttons */}
      <div style={{ marginBottom: 15, display: "flex", gap: 15 }}>
        {["open", "executed"].map((key) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "8px 16px",
              fontWeight: 600,
              borderRadius: 6,
              cursor: "pointer",
              border: "none",
              backgroundColor: tab === key ? "#0d6efd" : "#e7e7e7",
              color: tab === key ? "white" : "#333",
            }}
            aria-pressed={tab === key}
          >
            {key === "open" ? "Open Orders" : "Executed Orders"}
            <span style={{ marginLeft: 8, fontWeight: "normal" }}>
              ({key === "open" ? openOrders.length : executedOrders.length})
            </span>
          </button>
        ))}
      </div>

      {/* Loading/Error */}
      {loading && <p>Loading orders...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Orders Table */}
      {!loading && !error && (
        <>
          {list.length === 0 ? (
            <p style={{ textAlign: "center", marginTop: 40, color: "#666" }}>
              No orders found.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr
                    style={{ backgroundColor: "#f8f9fa", textAlign: "center" }}
                  >
                    {tab === "executed" && (
                      <th style={{ padding: "10px" }}>Time</th>
                    )}
                    <th style={{ padding: "10px" }}>Stock</th>
                    <th style={{ padding: "10px" }}>Qty</th>
                    <th style={{ padding: "10px" }}>Price</th>
                    <th style={{ padding: "10px" }}>Type</th>
                    {tab === "executed" && (
                      <th style={{ padding: "10px" }}>Product</th>
                    )}
                    {tab === "executed" && (
                      <th style={{ padding: "10px" }}>Avg. Price</th>
                    )}
                    <th style={{ padding: "10px" }}>Status</th>
                    {tab === "open" && (
                      <th style={{ padding: "10px" }}>Date & Time</th>
                    )}
                    {tab === "executed" && (
                      <th style={{ padding: "10px" }}>—</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {list.map((order, idx) => (
                    <tr
                      key={order._id || idx}
                      style={{
                        textAlign: "center",
                        borderBottom: "1px solid #ddd",
                        backgroundColor: idx % 2 === 0 ? "#fff" : "#fdfdfd",
                      }}
                    >
                      {tab === "executed" && (
                        <td style={{ padding: "8px" }}>
                          {formatDateTime(order.createdAt)}
                        </td>
                      )}
                      <td style={{ padding: "8px", fontWeight: "600" }}>
                        {order.name || "—"}
                      </td>
                      <td style={{ padding: "8px" }}>{order.qty || "—"}</td>
                      <td style={{ padding: "8px" }}>₹{order.price || "—"}</td>
                      <td style={{ padding: "8px" }}>
                        <span
                          style={{
                            padding: "4px 8px",
                            borderRadius: 12,
                            color: order.mode === "buy" ? "#198754" : "#dc3545",
                            backgroundColor:
                              order.mode === "buy" ? "#d1e7dd" : "#f8d7da",
                            fontWeight: "600",
                            fontSize: "0.85rem",
                            textTransform: "uppercase",
                            display: "inline-block",
                            minWidth: "50px",
                          }}
                        >
                          {order.mode || "—"}
                        </span>
                      </td>
                      {tab === "executed" && (
                        <td style={{ padding: "8px" }}>
                          {order.product || "—"}
                        </td>
                      )}
                      {tab === "executed" && (
                        <td style={{ padding: "8px" }}>
                          ₹{order.avgPrice || order.price || "—"}
                        </td>
                      )}
                      <td style={{ padding: "8px" }}>
                        {order.status === "executed" && (
                          <span
                            style={{
                              backgroundColor: "#e2e3e5",
                              color: "#6c757d",
                              padding: "4px 10px",
                              borderRadius: 20,
                              fontSize: "0.85rem",
                            }}
                          >
                            Executed
                          </span>
                        )}
                        {order.status === "open" && (
                          <span
                            style={{
                              backgroundColor: "#cff4fc",
                              color: "#0dcaf0",
                              padding: "4px 10px",
                              borderRadius: 20,
                              fontSize: "0.85rem",
                            }}
                          >
                            Open
                          </span>
                        )}
                        {order.status &&
                          order.status !== "open" &&
                          order.status !== "executed" && (
                            <span
                              style={{
                                backgroundColor: "#fff3cd",
                                color: "#664d03",
                                padding: "4px 10px",
                                borderRadius: 20,
                                fontSize: "0.85rem",
                              }}
                            >
                              {order.status}
                            </span>
                          )}
                      </td>
                      {tab === "open" && (
                        <td style={{ padding: "8px", color: "#6c757d" }}>
                          {formatDateTime(order.createdAt)}
                        </td>
                      )}
                      {tab === "executed" && <td></td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
