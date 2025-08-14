import { useEffect, useState } from "react";

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

  // Load token
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError("User not authenticated. Please login.");
      setLoading(false);
    }
  }, []);

  // Fetch all data after token is available
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

  if (loading) return <div>(Loading...)</div>;
  if (error) return <div style={{ color: "red" }}>({error})</div>;
  if (!user) return <div>No data available</div>;

  return (
    <>
      <div className="username">
        <h6>Hi, {user.username || "Data not available dynamically"} 👋</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>
              {user.balance
                ? `${user.balance}k`
                : "Data not available dynamically"}
            </h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>Data not available dynamically</span>
            </p>
            <p>
              Opening balance{" "}
              <span>
                {user.balance
                  ? `${user.balance}k`
                  : "Data not available dynamically"}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              {portfolio.length
                ? `${portfolio.reduce(
                    (sum, item) => sum + item.qty * item.price,
                    0
                  )}k`
                : "Data not available dynamically"}{" "}
              <small>+Data not available dynamically</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value{" "}
              <span>
                {portfolio.length
                  ? `${portfolio.reduce(
                      (sum, item) => sum + item.qty * item.price,
                      0
                    )}k`
                  : "Data not available dynamically"}
              </span>
            </p>
            <p>
              Investment{" "}
              <span>
                {portfolio.length
                  ? `${portfolio.reduce(
                      (sum, item) => sum + item.qty * item.avg,
                      0
                    )}k`
                  : "Data not available dynamically"}
              </span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
