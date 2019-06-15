import React from "react";
import { Spinner } from "react-bootstrap";

export default () => (
  <React.Fragment>
    <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
    {"Loading..."}
  </React.Fragment>
);
