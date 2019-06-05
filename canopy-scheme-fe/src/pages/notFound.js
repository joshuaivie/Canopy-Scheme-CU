import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  return (
    <div id="page-not-found">
      <h1>Oops !</h1>
      <h4>404 - page not found</h4>
      <p>The page you are looking for might have been removed or does not exist</p>
      <Link to="/">
        <Button>Go home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
