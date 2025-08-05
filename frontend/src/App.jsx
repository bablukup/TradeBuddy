import { useState } from "react";
import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import PricingPage from "./landing_page/pricing/PricingPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import SupportPage from "./landing_page/support/SupportPage";
import AboutPage from "./landing_page/about/AboutPage";
import Footer from "./landing_page/Footer";
import Navbar from "./landing_page/Navbar";
import NotFound from "./landing_page/NotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
