import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import * as ROUTES from "routes";

const NotFound = () => {
  return (
    <div className="center-large-text-container">
      <h1>Oops !</h1>
      <h4>404 - page not found</h4>
      <p>The page you are looking for might have been removed or does not exist</p>
      <Link to={ROUTES.HOME}>
        <Button>Go home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
