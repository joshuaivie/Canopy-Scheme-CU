import React from "react";
import Header from "components/navigation/Header";
import Footer from "components/navigation/Footer";
import AuthModal from "pages/Home/components/AuthModal";

export default ({ children, toggleModal, showAuthModal, history }) => {
  return (
    <div className="main-container" id="layoutContent">
      <Header toggleModal={toggleModal} />
      <div id="layoutMain">{children}</div>
      <Footer />
      <AuthModal
        showAuthModal={showAuthModal}
        toggleModal={toggleModal}
        history={history}
      />
    </div>
  );
};
