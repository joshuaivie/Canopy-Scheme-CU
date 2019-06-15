import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => (
  <div className="feature-lock-container">
    <FontAwesomeIcon icon="lock" size="6x" />
    <br />
    <br />
    <h2>Locked</h2>
    <p>
      Please make a payment or wait for verification of your payments to activate group
      feature.
    </p>
  </div>
);
