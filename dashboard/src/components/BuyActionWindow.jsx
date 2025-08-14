import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GeneralContext } from "./GeneralContextProvider";
import "./BuyActionWindow.css";
import { watchlist } from "../data/data";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [marginRequired, setMarginRequired] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { closeBuyWindow } = useContext(GeneralContext);

  const stock = watchlist.find((s) => s.name === uid);
  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  // Dynamic data fetch (Balance + Price together)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please login to place an order");
      return;
    }

    setErrorMsg(""); // reset error
    Promise.all([
      fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),

      fetch(`${BASE_URL}/api/trade/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([userData, portfolioData]) => {
        if (userData?.balance !== undefined) {
          setAvailableBalance(userData.balance);
        } else {
          setAvailableBalance(0);
          setErrorMsg("Could not fetch balance");
        }

        const s = portfolioData?.portfolio?.find((p) => p.name === uid);
        if (s?.price !== undefined) {
          setStockPrice(s.price);
        } else {
          setStockPrice(0);
          setErrorMsg((prev) => prev || "Could not fetch stock price");
        }
      })
      .catch(() => {
        setErrorMsg("Error fetching data from server");
      });
  }, [uid]);

  // Update marginRequired dynamically
  useEffect(() => {
    if (stockPrice > 0 && stockQuantity > 0) {
      setMarginRequired((stockPrice * stockQuantity).toFixed(2));
    } else {
      setMarginRequired(0);
    }
  }, [stockPrice, stockQuantity]);

  const handleBuyClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please login first");
      return;
    }

    // Validation before API call
    if (stockQuantity <= 0 || stockPrice <= 0) {
      setErrorMsg("Quantity and Price must be greater than 0");
      return;
    }
    if (availableBalance < marginRequired) {
      setErrorMsg("Insufficient balance");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    axios
      .post(
        `${BASE_URL}/api/trade`,
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "buy", // always lowercase to avoid case sensitivity issues
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert("✅ Order placed successfully");
        closeBuyWindow();
      })
      .catch((err) => {
        setErrorMsg(
          err.response?.data?.error || "Order failed. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <h4>{stock ? <span>{stock.name}</span> : ""}</h4>

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span
          style={{
            color:
              parseFloat(availableBalance) >= parseFloat(marginRequired)
                ? "green"
                : "red",
          }}
        >
          Margin required ₹{marginRequired} / Balance ₹{availableBalance}
        </span>

        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={
              isLoading ||
              stockQuantity <= 0 ||
              stockPrice <= 0 ||
              availableBalance < marginRequired
            }
          >
            {isLoading ? "Processing..." : "Buy"}
          </button>

          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
