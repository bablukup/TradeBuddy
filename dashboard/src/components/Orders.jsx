// import React, { useEffect, useState } from "react";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [tab, setTab] = useState("open"); // 'open' or 'executed'
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const BASE_URL =
//     import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("⚠ Please login to view your orders");
//       setLoading(false);
//       return;
//     }
//     fetch(`${BASE_URL}/api/trade/history`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch orders");
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data.trades || []);
//         setError("");
//       })
//       .catch(() => {
//         setError("Error fetching orders");
//       })
//       .finally(() => setLoading(false));
//   }, [BASE_URL]);

//   // Filter orders by status
//   const openOrders = orders.filter((o) => o.status !== "executed");
//   const executedOrders = orders.filter((o) => o.status === "executed");

//   const formatDateTime = (dateStr) => {
//     if (!dateStr) return "—";
//     const d = new Date(dateStr);
//     return isNaN(d.getTime())
//       ? "—"
//       : d.toLocaleString("en-IN", {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//   };

//   if (loading)
//     return (
//       <div
//         className="d-flex flex-column align-items-center justify-content-center"
//         style={{ minHeight: 220 }}
//       >
//         <div
//           className="spinner-border text-primary"
//           style={{ width: 30, height: 30 }}
//         />
//       </div>
//     );

//   if (error)
//     return (
//       <div className="container py-5 text-center">
//         <div className="alert alert-danger fs-6 fw-semibold mb-4">{error}</div>
//       </div>
//     );

//   const list = tab === "open" ? openOrders : executedOrders;

//   return (
//     <div className="container py-4">
//       <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
//         <button
//           className={`btn btn-sm ${
//             tab === "open" ? "btn-primary" : "btn-outline-primary"
//           } px-3`}
//           style={{ fontWeight: 600, borderRadius: "6px" }}
//           onClick={() => setTab("open")}
//         >
//           Open Orders
//         </button>
//         <button
//           className={`btn btn-sm ${
//             tab === "executed" ? "btn-primary" : "btn-outline-primary"
//           } px-3`}
//           style={{ fontWeight: 600, borderRadius: "6px" }}
//           onClick={() => setTab("executed")}
//         >
//           Executed Orders
//         </button>
//         <span
//           className="ms-auto badge bg-primary-subtle text-primary px-3 py-2 fs-6 rounded-pill shadow-sm"
//           style={{ fontWeight: 600 }}
//         >
//           {tab === "open" ? "Open" : "Executed"}: {list.length}
//         </span>
//       </div>
//       {list.length === 0 ? (
//         <div className="py-5 text-center">
//           <div
//             className="text-secondary small mb-3"
//             style={{ letterSpacing: 0.2 }}
//           >
//             No orders yet.
//           </div>
//         </div>
//       ) : (
//         <div
//           className="card shadow-sm border-0 mx-auto"
//           style={{ maxWidth: 950 }}
//         >
//           <div className="card-body p-0">
//             <div className="table-responsive">
//               <table className="table table-borderless mb-0 align-middle zerodha-orders-table">
//                 <thead className="table-light border-bottom">
//                   <tr className="text-center">
//                     {tab === "executed" && (
//                       <th style={{ fontSize: ".93rem" }}>Time</th>
//                     )}
//                     <th style={{ fontSize: ".93rem" }}>Stock</th>
//                     <th style={{ fontSize: ".93rem" }}>Qty</th>
//                     <th style={{ fontSize: ".93rem" }}>Price</th>
//                     <th style={{ fontSize: ".93rem" }}>Type</th>
//                     {tab === "executed" && (
//                       <th style={{ fontSize: ".93rem" }}>Product</th>
//                     )}
//                     {tab === "executed" && (
//                       <th style={{ fontSize: ".93rem" }}>Avg. price</th>
//                     )}
//                     <th style={{ fontSize: ".93rem" }}>Status</th>
//                     {tab === "open" && (
//                       <th style={{ fontSize: ".93rem" }}>Date & Time</th>
//                     )}
//                     {tab === "executed" && (
//                       <th style={{ fontSize: ".93rem" }}>—</th>
//                     )}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {list.map((order, idx) => (
//                     <tr
//                       className="text-center zerodha-row"
//                       key={order._id || idx}
//                     >
//                       {tab === "executed" && (
//                         <td
//                           className="text-secondary"
//                           style={{ fontSize: ".96rem" }}
//                         >
//                           {formatDateTime(order.createdAt)}
//                         </td>
//                       )}
//                       <td
//                         className="fw-semibold text-dark"
//                         style={{ fontSize: ".96rem" }}
//                       >
//                         {order.name || "—"}
//                       </td>
//                       <td style={{ fontSize: ".96rem" }}>{order.qty || "—"}</td>
//                       <td style={{ fontSize: ".96rem" }}>
//                         ₹{order.price || "—"}
//                       </td>
//                       <td>
//                         <span
//                           className={`badge rounded-pill px-2 fw-bold text-uppercase ${
//                             order.mode === "buy"
//                               ? "bg-success-subtle text-success"
//                               : "bg-danger-subtle text-danger"
//                           }`}
//                           style={{
//                             fontSize: ".93rem",
//                             letterSpacing: "0.03rem",
//                           }}
//                         >
//                           {order.mode || "—"}
//                         </span>
//                       </td>
//                       {tab === "executed" && (
//                         <td style={{ fontSize: ".96rem" }}>
//                           {order.product || "—"}
//                         </td>
//                       )}
//                       {tab === "executed" && (
//                         <td style={{ fontSize: ".96rem" }}>
//                           {order.avgPrice || order.price || "—"}
//                         </td>
//                       )}
//                       <td>
//                         {order.status === "executed" && (
//                           <span
//                             className="badge rounded-pill bg-secondary-subtle text-secondary"
//                             style={{ fontSize: ".93rem" }}
//                           >
//                             Executed
//                           </span>
//                         )}
//                         {order.status === "open" && (
//                           <span
//                             className="badge rounded-pill bg-info-subtle text-info"
//                             style={{ fontSize: ".93rem" }}
//                           >
//                             Open
//                           </span>
//                         )}
//                         {order.status &&
//                           order.status !== "open" &&
//                           order.status !== "executed" && (
//                             <span
//                               className="badge rounded-pill bg-warning-subtle text-warning"
//                               style={{ fontSize: ".93rem" }}
//                             >
//                               {order.status}
//                             </span>
//                           )}
//                       </td>
//                       {tab === "open" && (
//                         <td
//                           style={{ fontSize: ".96rem" }}
//                           className="text-secondary"
//                         >
//                           {formatDateTime(order.createdAt)}
//                         </td>
//                       )}
//                       {tab === "executed" && <td></td>}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}
//       <style>{`
//         .zerodha-orders-table {
//           font-size: 0.97rem;
//           background: #f9fbfc;
//         }
//         .zerodha-orders-table th, .zerodha-orders-table td {
//           vertical-align: middle !important;
//           padding-top: 0.57rem !important;
//           padding-bottom: 0.57rem !important;
//         }
//         .zerodha-row:hover {
//           background: #f5f7fa !important;
//           transition: background 0.14s;
//         }
//         .zerodha-orders-table th { background: #f4f8fa !important; }
//         @media (max-width: 767px) {
//           .zerodha-orders-table { font-size: 0.92rem; }
//           .card { padding: 0 !important; }
//           .zerodha-orders-table th,
//           .zerodha-orders-table td {
//             padding-left: 4px !important;
//             padding-right: 4px !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Orders;
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
