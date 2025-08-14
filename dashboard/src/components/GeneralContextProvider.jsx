import React, { useState, createContext, useCallback, useEffect } from "react";
import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

export const GeneralContext = createContext(null);

const GeneralContextProvider = ({ children }) => {
  const [windowType, setWindowType] = useState(null); // 'buy' | 'sell' | null
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [defaultUID, setDefaultUID] = useState("");

  const openWindow = useCallback((type, uid) => {
    if (!uid) return;
    setSelectedStockUID(uid);
    setWindowType(type);
  }, []);

  const closeWindow = useCallback(() => {
    setWindowType(null);
  }, []);

  // Global hotkeys
  const onKeyDown = useCallback(
    (e) => {
      const el = e.target;
      if (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable)
      )
        return;

      const targetUID = selectedStockUID || defaultUID;
      if (!targetUID) return;

      if (e.key.toLowerCase() === "b") {
        openWindow("buy", targetUID);
      } else if (e.key.toLowerCase() === "s") {
        openWindow("sell", targetUID);
      } else if (e.key === "Escape") {
        closeWindow();
      }
    },
    [selectedStockUID, defaultUID, openWindow, closeWindow]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: (uid) => openWindow("buy", uid),
        openSellWindow: (uid) => openWindow("sell", uid),
        closeBuyWindow: closeWindow,
        closeSellWindow: closeWindow,
        setDefaultUID,
        selectedStockUID,
        isBuyWindowOpen: windowType === "buy",
        isSellWindowOpen: windowType === "sell",
      }}
    >
      {children}
      {windowType === "buy" && <BuyActionWindow uid={selectedStockUID} />}
      {windowType === "sell" && <SellActionWindow uid={selectedStockUID} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
