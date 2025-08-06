import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";

function ProductsPage() {
  return (
    <>
      <Hero />
      <LeftSection
        imageURL="/media/image/kite.png"
        productName="TradeBuddy"
        productDescription=" TradeBuddy offers a seamless trading experience across devices. Access detailed analytics, real-time charts, and essential trading functionalities whether you’re at your desk or on-the-go. Stay in control of your investments anytime, anywhere."
        tryDemo=""
        learnMore=""
      />
      <RightSection
        imageURL="/media/image/console.png"
        productName="Pie Chart Analytics on Desktop"
        productDescription=" Visualize and interpret your portfolio performance with TradeBuddy’s intuitive analytics dashboard. Pie charts and graphical summaries provide instant insights into your investment distribution, helping you make smarter, data-driven decisions."
        learnMore=""
      />
      <LeftSection
        imageURL="/media/image/varsity.png"
        productName="Compliance & Health Check on Mobile"
        productDescription=" Experience smart trading with on-the-fly compliance checks and personal finance health indicators. TradeBuddy’s mobile interface ensures you stay compliant and well-informed, letting you track your goals and risk level at a glance."
        tryDemo=""
        learnMore=""
      />
      <RightSection
        imageURL="/media/image/kiteconnect.png"
        productName="Trading API Code Sample"
        productDescription=" Embrace the power of automation with TradeBuddy’s developer-friendly API. Effortlessly integrate trading features into your workflow, manage orders programmatically, and unlock advanced investment strategies with clear, accessible code samples."
        learnMore=""
      />
      <LeftSection
        imageURL="/media/image/coin.png"
        productName="Mobile Portfolio Overview"
        productDescription=" Manage your assets with ease using TradeBuddy’s intuitive mobile portfolio view. Monitor market movements, review investment performance, and receive actionable insights wherever you are, empowering you to trade with confidence."
        tryDemo=""
        learnMore=""
      />
      <Universe />
    </>
  );
}

export default ProductsPage;

RightSection;
