import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { GeneralContext } from "./GeneralContextProvider";
import { watchlist } from "../data/data";
import "./SellActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [marginRequired, setMarginRequired] = useState(0);
  const [availableQty, setAvailableQty] = useState(0);
  const [availableBalance, setAvailableBalance] = useState(0); // optional, if you want to show balance too
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderType, setOrderType] = useState("Limit");
  const [productType, setProductType] = useState("Longterm");
  const [activeTab, setActiveTab] = useState("Regular");
  const [stopLoss, setStopLoss] = useState("");
  const [target, setTarget] = useState("");
  const [triggerPrice, setTriggerPrice] = useState("");
  const { closeSellWindow } = useContext(GeneralContext);

  const stock = watchlist.find((s) => s.name === uid);
  const BASE_URL =
    import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

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
      fetch(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => res.json()), // optional - balance fetch
    ])
      .then(([portfolioData, userData]) => {
        const p = portfolioData?.portfolio?.find((p) => p.name === uid);
        setStockPrice(p?.price ?? 0);
        setAvailableQty(p?.qty ?? 0);
        setAvailableBalance(userData?.balance ?? 0); // optional
      })
      .catch(() => {
        setErrorMsg("Error fetching data from server");
      });
  }, [uid, BASE_URL]);

  useEffect(() => {
    if (stockPrice > 0 && stockQuantity > 0) {
      setMarginRequired(parseFloat((stockPrice * stockQuantity).toFixed(2)));
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
        `${BASE_URL}/api/trade`,
        {
          name: uid,
          qty: stockQuantity,
          price: stockPrice,
          mode: "sell",
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

  if (!stock) return null;

  return (
    <div
      className="sell-action-window"
      role="dialog"
      aria-label="Sell Stock Window"
    >
      <div className="window-header">
        <div className="stock-header">
          <span className="stock-symbol">{stock.name}</span>
          <button
            className="toggle-btn active"
            aria-label="Active stock indicator"
          >
            ●
          </button>
        </div>
        <div className="stock-prices">
          <span className="exchange-price">
            ● BSE ₹{stock.price.toFixed(2)}
          </span>
          <span className="exchange-price">
            ○ NSE ₹{stock.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="order-tabs">
        {["Quick", "Regular", "MTF", "Iceberg", "Cover"].map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="edit-btn" aria-label="Edit order details">
          ✏️
        </button>
      </div>

      <div className="product-type">
        <label>
          <input
            type="radio"
            name="product"
            value="Intraday"
            checked={productType === "Intraday"}
            onChange={(e) => setProductType(e.target.value)}
          />
          <span>Intraday</span>
          <span className="product-code">MIS</span>
        </label>
        <label>
          <input
            type="radio"
            name="product"
            value="Longterm"
            checked={productType === "Longterm"}
            onChange={(e) => setProductType(e.target.value)}
          />
          <span>Longterm</span>
          <span className="product-code">CNC</span>
        </label>
        <span className="advanced-link" tabIndex={0}>
          Advanced ⌄
        </span>
      </div>

      <div className="order-form">
        <div className="form-row">
          <div className="input-group">
            <label htmlFor="quantity-input">Qty.</label>
            <div className="qty-input">
              <input
                id="quantity-input"
                type="number"
                min="1"
                max={availableQty}
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                aria-required="true"
              />
              <button className="qty-selector" aria-label="Select quantity">
                ≡
              </button>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="price-input">Price</label>
            <input
              id="price-input"
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
              aria-required="true"
            />
          </div>
          <div className="input-group">
            <label htmlFor="trigger-price-input">Trigger price</label>
            <input
              id="trigger-price-input"
              type="number"
              value={triggerPrice}
              onChange={(e) => setTriggerPrice(e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        <div className="order-type">
          {["Market", "Limit", "SL", "SL-M"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="orderType"
                value={type}
                checked={orderType === type}
                onChange={(e) => setOrderType(e.target.value)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>

        <div className="advanced-options">
          <div className="option-row">
            <div className="checkbox-group">
              <label>
                <input type="checkbox" />
                <span>AMO</span>
                <span className="icon">💳</span>
                <span>Stoploss</span>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                  className="small-input"
                  aria-label="Stoploss %"
                />
                <span>%</span>
              </label>
            </div>
            <div className="checkbox-group">
              <label>
                <input type="checkbox" />
                <span>Target</span>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="small-input"
                  aria-label="Target %"
                />
                <span>%</span>
                <span className="info-icon" aria-label="Information">
                  ⓘ
                </span>
              </label>
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="error-message" style={{ color: "red" }}>
            {errorMsg}
          </div>
        )}

        <div className="order-footer">
          <div className="balance-info">
            <span>
              Required <strong>₹{marginRequired.toFixed(2)}</strong>
            </span>
            <span className="balance-change">+1.49</span>
            <span>
              Available <strong>{availableQty}</strong>
            </span>
          </div>

          <div className="action-buttons">
            <button
              className="btn-sell"
              onClick={handleSellClick}
              disabled={
                isLoading ||
                stockQuantity <= 0 ||
                stockPrice <= 0 ||
                stockQuantity > availableQty
              }
              aria-disabled={
                isLoading ||
                stockQuantity <= 0 ||
                stockPrice <= 0 ||
                stockQuantity > availableQty
              }
            >
              {isLoading ? "Processing..." : "Sell"}
            </button>
            <button className="btn-cancel" onClick={closeSellWindow}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
