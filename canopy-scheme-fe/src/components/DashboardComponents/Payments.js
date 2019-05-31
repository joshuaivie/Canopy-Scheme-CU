import React from "react";
import { Button, Card, Col, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaystackButton from "react-paystack";
import { UserAction } from "actions";
import { generateRandomString } from "utils/string";
import { nairaToKobo } from "utils/money";
import { UserStorage } from "storage";
const commaNumber = require("comma-number");
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_KEY;

const RenderEmptyHistory = columns => (
  <td
    colSpan={columns.length}
    style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
  >
    You have not made any Purchase yet!
  </td>
);

const RenderPaymentHistory = (data, columns) =>
  data.map((row, index) => (
    <tr key={`row_${index}`}>
      {columns.map(column => (
        <td key={`data_${column.dataName}`}>{row[column.dataName]}</td>
      ))}
    </tr>
  ));

const DisplayPayments = props => {
  return (
    <Table borderless hover responsive>
      <thead>
        {props.columns.map(column => (
          <th style={{ textTransform: "capitalize" }} key={`payment_${column.name}`}>
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
      { name: "date", dataName: "created_at" },
      { name: "amount", dataName: "amount" },
      { name: "tables", dataName: "total_table" },
      { name: "Reference", dataName: "paystack_ref" }
    ],
    data: [],
    show: false,
    numberOfTables: 1,
    tablePrice: 7500, // naira
    totalPrice: 7500, // naira
    isLoading: false
  };

  componentDidMount() {
    this.getPaymentHistory();
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  handleChange = event => {
    let numberOfTablesSelected = event.target.value;
    this.setState({ [event.target.name]: numberOfTablesSelected });
    this.setState({ totalPrice: this.state.tablePrice * numberOfTablesSelected });
  };

  getPaymentHistory = async () => {
    this.setState({ data: await UserAction.getTransactions() });
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
    const { totalPrice, tablePrice, show, numberOfTables } = this.state;
    const { email } = UserStorage.userInfo;

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>Payments</h5>

            <Button onClick={this.handleOpen}>
              Make Payment &nbsp;&nbsp;
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
            <Modal.Title style={{ textAlign: "center" }}>Pay for Tables</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form
              onSubmit={event => {
                event.preventDefault();
              }}
            >
              <br />

              <div className="display-price">
                <p>Total cost</p>
                <h4>₦{commaNumber(totalPrice)}</h4>
              </div>
              <br />

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
                <option>6</option>
              </Form.Control>

              <p className="calculate-price">
                ₦{commaNumber(tablePrice)} <FontAwesomeIcon icon="times" />{" "}
                {numberOfTables} Table(s) <FontAwesomeIcon icon="times" /> 8 Chairs = ₦
                {commaNumber(totalPrice)}
              </p>

              <PaystackButton
                text="Pay"
                tag="button"
                email={email}
                amount={nairaToKobo(totalPrice)} // Paystack works with kobo
                close={this.paystackClose}
                class="btn btn-primary btn-center"
                callback={this.paystackCallback}
                disabled={this.validateCheckout()}
                reference={generateRandomString()}
                paystackkey={PAYSTACK_PUBLIC_KEY}
              />
            </Form>
          </Modal.Body>
        </Modal>
      </Col>
    );
  }
}

export default Payments;
