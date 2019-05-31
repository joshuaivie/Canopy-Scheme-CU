import React from "react";
import Header from "../components/LayoutComponent/Header";
import Footer from "../components/LayoutComponent/Footer";

export default ({ children, toggleModal }) => (
  <div className="main-container">
    <Header toggleModal={toggleModal} />
    {children}
    <Footer />
  </div>
);
