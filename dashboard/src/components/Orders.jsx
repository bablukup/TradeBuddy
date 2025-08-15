// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
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
//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         return res.json();
//       })
//       .then((data) => {
//         setOrders(data.trades || []);
//       })
//       .catch(() => {
//         setError("Error fetching orders");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [BASE_URL]);

//   if (loading)
//     return (
//       <p
//         className="loading-text"
//         style={{ textAlign: "center", marginTop: "2rem" }}
//       >
//         ⏳ Loading orders...
//       </p>
//     );

//   if (error)
//     return (
//       <div
//         className="orders-error"
//         style={{ textAlign: "center", marginTop: "2rem" }}
//       >
//         <p style={{ color: "red", fontWeight: "600", fontSize: "1.1rem" }}>
//           {error}
//         </p>
//         <Link
//           to="/"
//           className="btn"
//           style={{ marginTop: "1rem", display: "inline-block" }}
//         >
//           Back to Home
//         </Link>
//       </div>
//     );

//   if (orders.length === 0) {
//     return (
//       <div
//         className="no-orders"
//         style={{ textAlign: "center", marginTop: "2rem" }}
//       >
//         <p style={{ fontSize: "1.1rem" }}>
//           📭 You haven't placed any orders today
//         </p>
//         <Link
//           to="/"
//           className="btn"
//           style={{ marginTop: "1rem", display: "inline-block" }}
//         >
//           Get started
//         </Link>
//       </div>
//     );
//   }

//   const formatDateTime = (dateStr) => {
//     return new Date(dateStr).toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div
//       className="orders"
//       style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}
//     >
//       <h2 style={{ marginBottom: "20px", color: "#012945", fontWeight: "700" }}>
//         📑 Your Orders
//       </h2>
//       <div
//         style={{
//           overflowX: "auto",
//           borderRadius: "8px",
//           boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
//         }}
//       >
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             backgroundColor: "#fff",
//             minWidth: "600px",
//           }}
//         >
//           <thead style={{ backgroundColor: "#f4f6f8" }}>
//             <tr>
//               <th style={thStyle}>Stock</th>
//               <th style={thStyle}>Qty</th>
//               <th style={thStyle}>Price</th>
//               <th style={thStyle}>Type</th>
//               <th style={thStyle}>Date & Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, i) => (
//               <tr
//                 key={order._id}
//                 style={{
//                   backgroundColor: i % 2 === 0 ? "#fafafa" : "#fff",
//                   textAlign: "center",
//                   transition: "background-color 0.3s",
//                 }}
//                 className="order-row"
//               >
//                 <td style={tdStyle}>{order.name}</td>
//                 <td style={tdStyle}>{order.qty}</td>
//                 <td style={tdStyle}>₹{order.price}</td>
//                 <td style={tdStyle}>
//                   <span
//                     style={{
//                       padding: "4px 12px",
//                       borderRadius: "16px",
//                       backgroundColor:
//                         order.mode === "buy"
//                           ? "rgba(0,200,0,0.12)"
//                           : "rgba(255,0,0,0.12)",
//                       color: order.mode === "buy" ? "#2e7d32" : "#d32f2f",
//                       fontWeight: "700",
//                       fontSize: "0.85rem",
//                       textTransform: "uppercase",
//                       userSelect: "none",
//                     }}
//                   >
//                     {order.mode}
//                   </span>
//                 </td>
//                 <td style={tdStyle}>{formatDateTime(order.createdAt)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Add some subtle hover effect with style */}
//       <style>{`
//         .order-row:hover {
//           background-color: #e6f7ff;
//         }
//         .btn {
//           text-decoration: none;
//           color: white;
//           background-color: #157347;
//           padding: 8px 18px;
//           border-radius: 10px;
//           font-weight: 600;
//           transition: background-color 0.3s ease;
//         }
//         .btn:hover {
//           background-color: #0a582a;
//         }
//       `}</style>
//     </div>
//   );
// };

// const thStyle = {
//   padding: "14px 12px",
//   fontWeight: "600",
//   fontSize: "1rem",
//   textAlign: "center",
//   borderBottom: "1px solid #ddd",
//   color: "#012945",
// };

// const tdStyle = {
//   padding: "12px",
//   fontSize: "0.95rem",
//   borderBottom: "1px solid #eee",
// };

// export default Orders;

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
