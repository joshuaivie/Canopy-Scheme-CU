import React from "react";
import Header from "components/navigation/Header";
import Footer from "components/navigation/Footer";

export default ({ children, toggleModal }) => (
  <div className="main-container" id="layoutContent">
    <Header toggleModal={toggleModal} />
    <div id="layoutMain">{children}</div>
    <Footer />
  </div>
);
