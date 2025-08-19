// import React, { useState, useEffect, useMemo } from "react";
// import "./Summary.css";
// import ValueBar from "/charts/valueBar";

// const Summary = () => {
//   const [user, setUser] = useState(null);
//   const [portfolio, setPortfolio] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedIndex, setSelectedIndex] = useState(0);

//   const BASE_URL =
//     import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

//   const authUrl = `${BASE_URL}/api/auth/me`;
//   const portfolioUrl = `${BASE_URL}/api/trade/portfolio`;
//   const historyUrl = `${BASE_URL}/api/trade/history`;

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     } else {
//       setError("User not authenticated. Please login.");
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (!token) return;

//     const fetchUser = fetch(authUrl, {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then((res) => res.json());

//     const fetchPortfolio = fetch(portfolioUrl, {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then((res) => res.json());

//     const fetchHistory = fetch(historyUrl, {
//       headers: { Authorization: `Bearer ${token}` },
//     }).then((res) => res.json());

//     Promise.all([fetchUser, fetchPortfolio, fetchHistory])
//       .then(([userData, portfolioData, historyData]) => {
//         setUser(userData || null);
//         setPortfolio(portfolioData?.portfolio || []);
//         setHistory(historyData?.trades || []);
//         setLoading(false);
//         setError(null);
//       })
//       .catch((err) => {
//         console.error("❌ Fetch Error:", err);
//         setError(err.message || "Error loading data");
//         setLoading(false);
//       });
//   }, [token]);

//   const metricsArray = useMemo(() => {
//     const totalCurrentValue = portfolio.reduce(
//       (sum, item) => sum + (item.qty * item.price || 0),
//       0
//     );
//     const totalInvestmentValue = portfolio.reduce(
//       (sum, item) => sum + (item.qty * item.avg || 0),
//       0
//     );
//     const pnlValue = totalCurrentValue - totalInvestmentValue;

//     return [
//       {
//         label: "Current value",
//         value: totalCurrentValue,
//       },
//       {
//         label: "Investment value",
//         value: totalInvestmentValue,
//       },
//       {
//         label: "P&L",
//         value: pnlValue,
//       },
//     ];
//   }, [portfolio]);

//   const formatCurrency = (num) => {
//     if (num === undefined || num === null || isNaN(num)) return "₹0.00";
//     return num.toLocaleString("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 2,
//     });
//   };

//   if (loading)
//     return (
//       <div className="loading-container">
//         <div
//           className="spinner-border text-primary"
//           role="status"
//           style={{ width: 40, height: 40 }}
//         />
//         <p className="loading-text mt-3">Loading...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="error-container">
//         <p className="error-text">{error}</p>
//       </div>
//     );

//   if (!user)
//     return (
//       <div className="no-data-container">
//         <p className="no-data-text">No data available</p>
//       </div>
//     );

//   return (
//     <div className="summary-container container py-4">
//       <div className="username-section mb-4">
//         <h6>Hi, {user.username || "Data not available"} 👋</h6>
//         <hr className="divider" />
//       </div>

//       <div className="section equity-section mb-4">
//         <span className="section-title">Equity</span>
//         <div className="data flex-wrap">
//           <div className="first-block">
//             <h3>
//               {user.balance
//                 ? formatCurrency(user.balance)
//                 : "Data not available"}
//             </h3>
//             <p>Margin available</p>
//           </div>
//           <div className="second-block">
//             <p>
//               Margins used <span>Data not available</span>
//             </p>
//             <p>
//               Opening balance{" "}
//               <span>
//                 {user.balance
//                   ? formatCurrency(user.balance)
//                   : "Data not available"}
//               </span>
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>

//       <div className="section holdings-section mb-4">
//         <span className="section-title">Holdings</span>
//         <div className="data flex-wrap">
//           <div className="first-block">
//             <h3 className="profit">
//               {portfolio.length
//                 ? formatCurrency(metricsArray[0].value)
//                 : "Data not available"}{" "}
//               <small>+Data not available</small>
//             </h3>
//             <p>P&L</p>
//           </div>
//           <div className="second-block">
//             <p>
//               Current Value{" "}
//               <span>
//                 {portfolio.length
//                   ? formatCurrency(metricsArray.value)
//                   : "Data not available"}
//               </span>
//             </p>
//             <p>
//               Investment{" "}
//               <span>
//                 {portfolio.length
//                   ? formatCurrency(metricsArray[1].value)
//                   : "Data not available"}
//               </span>
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>

//       <ValueBar
//         metrics={metricsArray}
//         selected={selectedIndex}
//         onChange={setSelectedIndex}
//       />
//     </div>
//   );
// };

// export default Summary;
import React, { useState, useEffect, useMemo } from "react";
import ValueBar from "/charts/valueBar";
import "./Summary.css";

const Summary = () => {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError("User not authenticated. Please login.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchUser = fetch(`${BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    const fetchPortfolio = fetch(`${BASE_URL}/api/trade/portfolio`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    const fetchHistory = fetch(`${BASE_URL}/api/trade/history`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    Promise.all([fetchUser, fetchPortfolio, fetchHistory])
      .then(([userData, portfolioData, historyData]) => {
        setUser(userData || null);
        setPortfolio(portfolioData?.portfolio || []);
        setHistory(historyData?.trades || []);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error loading data");
        setLoading(false);
      });
  }, [token]);

  const metricsArray = useMemo(() => {
    const totalCurrentValue = portfolio.reduce(
      (sum, item) => sum + (item.qty * item.price || 0),
      0
    );
    const totalInvestmentValue = portfolio.reduce(
      (sum, item) => sum + (item.qty * item.avg || 0),
      0
    );
    const pnlValue = totalCurrentValue - totalInvestmentValue;

    return [
      { label: "Current value", value: totalCurrentValue },
      { label: "Investment value", value: totalInvestmentValue },
      { label: "P&L", value: pnlValue },
    ];
  }, [portfolio]);

  const formatCurrency = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "₹0.00";
    return num.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });
  };

  if (loading)
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status" />
        <p className="loading-text mt-3">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="error-container">
        <p className="error-text">{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="no-data-container">
        <p className="no-data-text">No data available</p>
      </div>
    );

  return (
    <div className="summary-container container py-4">
      <div className="username-section mb-4">
        <h6>Hi, {user.username || "Data not available"} 👋</h6>
        <hr className="divider" />
      </div>

      <section className="equity-section mb-4">
        <span className="section-title">Equity</span>
        <div className="data flex-wrap">
          <div className="first-block">
            <h3>
              {user.balance
                ? formatCurrency(user.balance)
                : "Data not available"}
            </h3>
            <p>Margin available</p>
          </div>
          <div className="second-block">
            <p>
              Margins used <span>Data not available</span>
            </p>
            <p>
              Opening balance{" "}
              <span>
                {user.balance
                  ? formatCurrency(user.balance)
                  : "Data not available"}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </section>

      <section className="holdings-section mb-4">
        <span className="section-title">Holdings</span>
        <div className="data flex-wrap">
          <div className="first-block">
            <h3 className="profit">
              {portfolio.length
                ? formatCurrency(metricsArray[0].value)
                : "Data not available"}{" "}
              <small>+0</small>
            </h3>
            <p>P&L</p>
          </div>
          <div className="second-block">
            <p>
              Current Value{" "}
              <span>
                {portfolio.length
                  ? formatCurrency(metricsArray.value)
                  : "Data not available"}
              </span>
            </p>
            <p>
              Investment{" "}
              <span>
                {portfolio.length
                  ? formatCurrency(metricsArray.value)
                  : "Data not available"}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </section>

      <ValueBar
        metrics={metricsArray}
        selected={selectedIndex}
        onChange={setSelectedIndex}
      />
    </div>
  );
};

export default Summary;
