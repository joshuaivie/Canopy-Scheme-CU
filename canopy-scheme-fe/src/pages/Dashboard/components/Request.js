import React from "react";
import { Accordion, Card, Col, Button, Form, Row, Container } from "react-bootstrap";

// Form
import Pageclip from "pageclip";
const pageClipAPIKey = "api_uMH3GF8b82NhKiJGZ5UdficUSlB9udWs";
const pageclip = new Pageclip(pageClipAPIKey);

class Request extends React.Component {
  state = {
    emailAddress: "",
    phoneNumber: "",
    reason: "",
    groupSize: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = this.state;
    pageclip
      .send(data)
      .then(response => {
        console.log(response.status, response.data); // => 200, [Item, Item]
      })
      .then(() => {
        return pageclip.fetch();
      })
      .then(response => {
        console.log(response.status, response.data); // => 200, [Item, Item]
      });
  };

  render() {
    const { emailAddress, phoneNumber, reason, groupSize } = this.state;
    return (
      <Accordion>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          <h5>Special Request</h5>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <Container>
              <Row>
                <Col xs="12" md="4">
                  <h6>...</h6>
                </Col>
                <Col xs="12" md="8">
                  <Form
                    action="https://formspree.io/faithid10@gmail.com"
                    method="post"
                    enctype="text/plain"
                  >
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email Address"
                        name="emailAddress"
                        value={emailAddress}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="e.g +23400000000000"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Reason</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="3"
                        placeholder="Please explain why you want the expansion"
                        name="reason"
                        value={reason}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Group Size</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="How large is the intended group?"
                        name="groupSize"
                        value={groupSize}
                        onChange={this.handleChange}
                        required
                      />
                    </Form.Group>
                    <Button type="submit">Send Request</Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Accordion.Collapse>
      </Accordion>
    );
  }
}

export default Request;
