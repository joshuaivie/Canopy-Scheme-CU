import React from "react";
import Header from "../components/LayoutComponent/header";
import Footer from "../components/LayoutComponent/footer";

export default ({ children }) => (
  <div className="main-container">
    <Header />
    {children}
    <Footer />
  </div>
);
