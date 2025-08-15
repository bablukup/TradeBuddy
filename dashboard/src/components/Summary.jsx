import { useEffect, useState } from "react";
import "./Summary.css";

const Summary = () => {
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [history, setHistory] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  const authUrl = `${BASE_URL}/api/auth/me`;
  const portfolioUrl = `${BASE_URL}/api/trade/portfolio`;
  const historyUrl = `${BASE_URL}/api/trade/history`;

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

    const fetchUser = fetch(authUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    const fetchPortfolio = fetch(portfolioUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    const fetchHistory = fetch(historyUrl, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());

    Promise.all([fetchUser, fetchPortfolio, fetchHistory])
      .then(([userData, portfolioData, historyData]) => {
        setUser(userData || null);
        setPortfolio(portfolioData?.portfolio || []);
        setHistory(historyData?.trades || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch Error:", err);
        setError(err.message || "Error loading data");
        setLoading(false);
      });
  }, [token]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div className="no-data">No data available</div>;

  return (
    <div className="summary-container">
      <div className="username">
        <h6>Hi, {user.username || "Data not available"} 👋</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span className="section-title">Equity</span>
        <div className="data">
          <div className="first">
            <h3>{user.balance ? `₹${user.balance}` : "Data not available"}</h3>
            <p>Margin available</p>
          </div>
          <div className="second">
            <p>
              Margins used <span>Data not available</span>
            </p>
            <p>
              Opening balance{" "}
              <span>
                {user.balance ? `₹${user.balance}` : "Data not available"}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span className="section-title">Holdings</span>
        <div className="data">
          <div className="first">
            <h3 className="profit">
              {portfolio.length
                ? `₹${portfolio.reduce(
                    (sum, item) => sum + item.qty * item.price,
                    0
                  )}`
                : "Data not available"}{" "}
              <small>+Data not available</small>
            </h3>
            <p>P&L</p>
          </div>
          <div className="second">
            <p>
              Current Value{" "}
              <span>
                {portfolio.length
                  ? `₹${portfolio.reduce(
                      (sum, item) => sum + item.qty * item.price,
                      0
                    )}`
                  : "Data not available"}
              </span>
            </p>
            <p>
              Investment{" "}
              <span>
                {portfolio.length
                  ? `₹${portfolio.reduce(
                      (sum, item) => sum + item.qty * item.avg,
                      0
                    )}`
                  : "Data not available"}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default Summary;
