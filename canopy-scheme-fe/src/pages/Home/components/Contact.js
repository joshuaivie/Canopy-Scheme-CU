import React from "react";
import { Form, Button } from "react-bootstrap";
import contactSvg from "assets/svg/email.svg";

export default () => (
  <div id="contact-section" className="section">
    <div className="info text-center">
      <h1>Contact Us</h1>
      <img src={contactSvg} className="float" alt="email illustration" />
      <p>
        We're here for you. Let us know any feedback or extra support you would need and
        we'll be happy to help.{" "}
      </p>
    </div>
    <div className="form-container">
      <Form>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows="3" />
        </Form.Group>
        <Button>Send</Button>
      </Form>{" "}
    </div>
  </div>
);
