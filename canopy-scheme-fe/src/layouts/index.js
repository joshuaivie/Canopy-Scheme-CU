import React from "react";
import Header from "components/navigation/Header";
import Footer from "components/navigation/Footer";

export default ({ children, toggleModal }) => (
  <div className="main-container">
    <Header toggleModal={toggleModal} />
    {children}
    <Footer />
  </div>
);
