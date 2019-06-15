import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default ({ retryEvent, retryEventParams, height = "2rem", width = "2rem" }) => (
  <FontAwesomeIcon
    onClick={() => retryEvent(retryEventParams)}
    icon="redo"
    style={{ height, width, margin: "auto", display: "block" }}
  />
);
