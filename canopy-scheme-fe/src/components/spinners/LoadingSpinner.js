import React from "react";
import { Spinner } from "react-bootstrap";

export default ({ height = "2rem", width = "2rem" }) => (
  <Spinner
    animation="border"
    style={{ height, width, margin: "auto", display: "block" }}
  />
);
