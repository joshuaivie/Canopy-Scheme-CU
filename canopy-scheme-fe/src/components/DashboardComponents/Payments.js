import React from "react";
import { Button, Card, Col, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaystackButton from "react-paystack";
import { UserStorage } from "storage";

const RenderEmptyHistory = columns => (
  <td
    colSpan={columns.length}
    style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
  >
    You have not made any Purchase yet!
  </td>
);

const RenderPaymentHistory = (data, columns) =>
  data.map(row => (
    <tr key={"row_" + row.id}>
      {columns.map(column => (
        <td key={"data" + column.name}>{row[column.name]}</td>
      ))}
    </tr>
  ));

const DisplayPayments = props => {
  return (
    <Table borderless hover responsive>
      <thead>
        {props.columns.map(column => (
          <th style={{ textTransform: "capitalize" }} key={column.name}>
            {column.name}
          </th>
        ))}
      </thead>
      <tbody>
        {props.data.length > 0
          ? RenderPaymentHistory(props.data, props.columns)
          : RenderEmptyHistory(props.columns)}
      </tbody>
    </Table>
  );
};

class Payments extends React.Component {
  state = {
    columns: [
      { name: "date" },
      { name: "amount" },
      { name: "tables" },
      { name: "Reference" }
    ],
    data: [
      {
        date: "12-03-19",
        amount: "15,000",
        tables: "1",
        id: 1
      },
      {
        date: "26-03-19",
        amount: "45,000",
        tables: "3",
        id: 2
      }
    ],
    show: false,
    numberOfTables: 1,
    tablePrice: 7500,
    totalPrice: 0
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleChange = event => {
    let numberOfTablesSelected = event.target.value;
    const { tablePrice } = this.state;
    this.setState({ [event.target.name]: numberOfTablesSelected });
    this.setState({ totalPrice: tablePrice * numberOfTablesSelected });
  };
  generateReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";
    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  paystackCallback = response => {
    console.log(response);
  };

  paystackClose = () => {
    console.log("Payment closed");
  };

  validateCheckout = () => {
    // validate that all the table pricing and everything else is correct
    return false;
  };

  render() {
    const { totalPrice, show } = this.state;
    const userEmail = "awotunde.emmanuel1@gmail.com"; // UserStorage.userInfo.email;
    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>Payments</h5>
            <Button onClick={this.handleOpen}>
              Make Payment
              {"  "}
              <FontAwesomeIcon icon="credit-card" />
            </Button>
          </Card.Header>
          <Card.Body>
            <DisplayPayments data={this.state.data} columns={this.state.columns} />
          </Card.Body>
        </Card>

        {/* payment modal */}
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Pay for Tables</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Select Number of Tables</Form.Label>
                <Form.Control
                  as="select"
                  name="numberOfTables"
                  onChange={this.handleChange}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>
              <p className="total-price-text">
                <strong>Total Price:</strong> ₦{totalPrice}
              </p>
              <PaystackButton
                text="Pay"
                class="btn btn-primary btn-center"
                callback={this.paystackCallback}
                close={this.paystackClose}
                disabled={this.validateCheckout()}
                reference={this.generateReference()}
                email={userEmail}
                amount={totalPrice}
                paystackkey={process.env.REACT_APP_PAYSTACK_KEY}
                tag="button"
              />
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default Payments;
