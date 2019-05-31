import React from "react";
import Header from "../components/LayoutComponent/Header";
import Footer from "../components/LayoutComponent/Footer";

export default ({ children }) => (
  <div className="main-container">
    <Header />
    {children}
    <Footer />
  </div>
);
