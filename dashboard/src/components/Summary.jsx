import { useEffect, useState } from "react";

const Summary = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // token state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `${
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080"
  }/api/trade/portfolio`;

  // Step 1: Load token from localStorage when component mounts
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    console.log("📌 Saved Token in localStorage:", savedToken);
    if (savedToken) {
      setToken(savedToken);
    } else {
      setError("User not authenticated. Please login.");
      setLoading(false);
    }
  }, []);

  // Step 2: Fetch portfolio only after token is set
  useEffect(() => {
    if (!token) return;

    console.log("📡 Fetching portfolio with token:", token);

    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const text = await res.text();
        console.log("Raw API response:", text);
        if (!res.ok) throw new Error(text || "Failed to fetch");
        return JSON.parse(text);
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Fetch Error:", err);
        setError(err.message || "Error loading data");
        setLoading(false);
      });
  }, [token, url]);

  if (loading) return <div>(Loading...)</div>;
  if (error) return <div style={{ color: "red" }}>({error})</div>;
  if (!user) return <div>No data available</div>;

  return (
    <>
      <div className="username">
        <h6>Hi, {user.username} 👋</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
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
              1.55k <small>+5.20%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>
              Current Value <span>31.43k</span>
            </p>
            <p>
              Investment <span>29.88k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
