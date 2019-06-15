import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <div className="feature-lock-container">
    <FontAwesomeIcon icon="lock" size="6x" />
    <br />
    <br />
    <p>
      This feature is locked because you have either not made any payment or none of
      your payments have been verified successfully. Please make a payment or wait for
      verification of your payments before you can use the Group feature
    </p>
  </div>
);
