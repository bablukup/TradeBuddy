// src/components/GeneralContextProvider.jsx
import React, { useState, createContext, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

export const GeneralContext = createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},
  setDefaultUID: (uid) => {}, // for hotkeys fallback
  selectedStockUID: "",
});

const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [defaultUID, setDefaultUID] = useState(""); // fallback for hotkeys

  const openBuyWindow = (uid) => {
    if (!uid) return;
    setSelectedStockUID(uid);
    if (isSellWindowOpen) setIsSellWindowOpen(false); // ensure sell closes
    setIsBuyWindowOpen(true);
  };

  const closeBuyWindow = () => {
    setIsBuyWindowOpen(false);
    // selectedStockUID ko preserve rehne do taaki B/S toggle bina hover ke ho sake
    // setSelectedStockUID("");
  };

  const openSellWindow = (uid) => {
    if (!uid) return;
    setSelectedStockUID(uid);
    if (isBuyWindowOpen) setIsBuyWindowOpen(false); // ensure buy closes
    setIsSellWindowOpen(true);
  };

  const closeSellWindow = () => {
    setIsSellWindowOpen(false);
    // setSelectedStockUID("");
  };

  // Global hotkeys: B/b = Buy, S/s = Sell, Esc = Close
  useEffect(() => {
    const onKeyDown = (e) => {
      const el = e.target;
      // ignore when typing
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      ) {
        return;
      }

      const key = e.key;
      // Resolve target: last selected → default watchlist item
      const targetUID = selectedStockUID || defaultUID;

      if (key === "b" || key === "B") {
        if (targetUID) {
          if (isSellWindowOpen) setIsSellWindowOpen(false);
          openBuyWindow(targetUID);
        }
      } else if (key === "s" || key === "S") {
        if (targetUID) {
          if (isBuyWindowOpen) setIsBuyWindowOpen(false);
          openSellWindow(targetUID);
        }
      } else if (key === "Escape") {
        let anyClosed = false;
        if (isBuyWindowOpen) {
          setIsBuyWindowOpen(false);
          anyClosed = true;
        }
        if (isSellWindowOpen) {
          setIsSellWindowOpen(false);
          anyClosed = true;
        }
        // Agar dono band hue to selection clear (taaki next B/S default par jaye)
        if (anyClosed) {
          setSelectedStockUID("");
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedStockUID, defaultUID, isBuyWindowOpen, isSellWindowOpen]);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        closeBuyWindow,
        openSellWindow,
        closeSellWindow,
        setDefaultUID, // call from WatchList mount
        selectedStockUID,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} />}
      {isSellWindowOpen && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
