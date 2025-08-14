import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GeneralContext } from "./GeneralContextProvider";
import "./SellActionWindow.css";
import { watchlist } from "../data/data";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [marginRequired, setMarginRequired] = useState(0);
  const [availableQty, setAvailableQty] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { closeSellWindow } = useContext(GeneralContext);

  const stock = watchlist.find((s) => s.name === uid);
  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

  // Fetch user’s holding qty & current price
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please login to place an order");
      return;
    }

    setErrorMsg("");

    Promise.all([
      fetch(`${BASE_URL}/api/trade/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()),
    ])
      .then(([portfolioData]) => {
        const s = portfolioData?.portfolio?.find((p) => p.name === uid);

        if (s?.price !== undefined) {
          setStockPrice(s.price);
        } else {
          setStockPrice(0);
          setErrorMsg((prev) => prev || "Could not fetch stock price");
        }

        if (s?.qty !== undefined) {
          setAvailableQty(s.qty);
        } else {
          setAvailableQty(0);
          setErrorMsg((prev) => prev || "Could not fetch available quantity");
        }
      })
      .catch(() => {
        setErrorMsg("Error fetching data from server");
      });
  }, [uid]);

  // Calculate margin dynamically
  useEffect(() => {
    if (stockPrice > 0 && stockQuantity > 0) {
      setMarginRequired((stockPrice * stockQuantity).toFixed(2));
    } else {
      setMarginRequired(0);
    }
  }, [stockPrice, stockQuantity]);

  const handleSellClick = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMsg("Please login first");
      return;
    }

    // Validation
    if (stockQuantity <= 0 || stockPrice <= 0) {
      setErrorMsg("Quantity and Price must be greater than 0");
      return;
    }
    if (stockQuantity > availableQty) {
      setErrorMsg("You do not have enough quantity to sell");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      await axios.post(
        `${BASE_URL}/api/trade`, // corrected endpoint
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "sell", // lowercase to avoid case mismatch
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Sell Order Placed Successfully");
      closeSellWindow();
    } catch (err) {
      setErrorMsg(
        err.response?.data?.error || "Order failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container" id="sell-window" draggable="true">
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
              max={availableQty}
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
              parseFloat(stockQuantity) <= parseFloat(availableQty) &&
              stockPrice > 0
                ? "green"
                : "red",
          }}
        >
          Margin: ₹{marginRequired} | Available Qty: {availableQty}
        </span>

        <div>
          <button
            className="btn btn-blue"
            onClick={handleSellClick}
            disabled={
              isLoading ||
              stockQuantity <= 0 ||
              stockPrice <= 0 ||
              stockQuantity > availableQty
            }
          >
            {isLoading ? "Processing..." : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={closeSellWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
