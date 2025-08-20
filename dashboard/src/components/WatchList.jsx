import React, { useState, useContext, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";
import { GeneralContext } from "./GeneralContextProvider";

const symbols = [
  "INFY.NSE",
  "ONGC.NSE",
  "TCS.NSE",
  "KPITTECH.NSE",
  "QUICKHEAL.NSE",
  "WIPRO.NSE",
  "M&M.NSE",
  "RELIANCE.NSE",
  "HINDUNILVR.NSE",
];

const BASE_URL =
  import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:8080";

const WatchList = () => {
  const { setDefaultUID } = useContext(GeneralContext);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(`${BASE_URL}/quote/${symbol}`);
            const json = await res.json();

            if (json.success && json.data) {
              return {
                name: symbol.replace(".NSE", ""),
                price: json.data.price || "-",
                percent: json.data.percent || "-",
                isDown: json.data.isDown || false,
              };
            }
            // Agar data na mile toh fallback
            return {
              name: symbol.replace(".NSE", ""),
              price: "-",
              percent: "-",
              isDown: false,
            };
          })
        );
        setStocks(results);

        if (results.length > 0) {
          setDefaultUID(results[0].name);
        } else {
          setDefaultUID("");
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setStocks([]);
        setDefaultUID("");
      }
    }

    fetchQuotes();
  }, [setDefaultUID]);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {stocks.length} / 50</span>
      </div>

      <ul className="list">
        {stocks.map((stock, index) => (
          <WatchListItem stock={stock} key={index} />
        ))}
      </ul>
    </div>
  );
};

const WatchListItem = ({ stock }) => {
  const [ShowWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {ShowWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

const WatchListActions = ({ uid }) => {
  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  return (
    <span className="actions">
      <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
        <button className="buy" onClick={() => openBuyWindow(uid)}>
          Buy
        </button>
      </Tooltip>
      <Tooltip
        title="Sell (S)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="sell" onClick={() => openSellWindow(uid)}>
          Sell
        </button>
      </Tooltip>
      <Tooltip
        title="Analytics (A)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="action">
          <BarChartOutlined className="icon" />
        </button>
      </Tooltip>
      <Tooltip
        title="More (A)"
        placement="top"
        arrow
        TransitionComponent={Grow}
      >
        <button className="action">
          <MoreHoriz className="icon" />
        </button>
      </Tooltip>
    </span>
  );
};

export default WatchList;
