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
        <th>Date</th>
        <th>Amount</th>
        <th>Tables</th>
        <th>Reference</th>
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
  constructor() {
    super();

    this.state = {
      columns: [
        { name: "date", dataName: "created_at" },
        { name: "amount", dataName: "amount" },
        { name: "tables", dataName: "total_table" },
        { name: "Reference", dataName: "paystack_ref" }
      ],
      data: [],
      show: false,
      numberOfTables: 1,
      tablePrice: 10000, // naira
      totalPrice: 10000, // naira
      isLoading: false,
      errorMsg: ""
    };
  }

  componentDidMount() {
    this.getPaymentHistory();
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  // handleChange = event => {
  //   this.setState({ [event.target.name]: event.target.value });
  //   this.setState({ totalPrice: this.state.tablePrice * event.target.value });
  // };

  increaseTableNumber = event => {
    event.preventDefault();
    const { numberOfTables, tablePrice } = this.state;
    if (numberOfTables < 5) {
      this.setState({
        numberOfTables: numberOfTables + 1
      });
    } else {
      this.setState({ errorMsg: "Oops, you cannot have more than 5 tables" });
    }
    this.setState({ totalPrice: numberOfTables * tablePrice });
  };

  decreaseTableNumber = event => {
    event.preventDefault();
    const { numberOfTables, tablePrice } = this.state;
    numberOfTables > 1
      ? this.setState({
          numberOfTables: numberOfTables - 1
        })
      : this.setState({ errorMsg: "Thats just stupid" });
    this.setState({ totalPrice: numberOfTables * tablePrice });
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

  render() {
    const { data, totalPrice, tablePrice, show, numberOfTables } = this.state;
    const { email } = UserStorage.userInfo;

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>Payments</h5>
            {data.length <= 5 ? (
              <Button onClick={this.handleOpen} className="make-payment-button">
                Book Table(s) &nbsp;&nbsp;
                <FontAwesomeIcon icon="credit-card" />
              </Button>
            ) : (
              <></>
            )}
          </Card.Header>

          <Card.Body>
            <DisplayPayments data={this.state.data} columns={this.state.columns} />
            <div>
              {data.length <= 5 ? (
                <Button
                  onClick={this.handleOpen}
                  className="make-payment-button mobile"
                >
                  Book Table(s) &nbsp;&nbsp;
                  <FontAwesomeIcon icon="credit-card" />
                </Button>
              ) : (
                <></>
              )}
            </div>
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
              {/* Where table selection happen 😃 */}
              <div className="payment-container">
                <div className="display-table">
                  <p>Tables</p>
                  <div className="table-button">
                    <button onClick={this.decreaseTableNumber}>
                      <FontAwesomeIcon icon="minus" />
                    </button>
                    <p style={{ color: "white" }}>{numberOfTables}</p>
                    <button onClick={this.increaseTableNumber}>
                      <FontAwesomeIcon icon="plus" />
                    </button>
                  </div>
                </div>
                <div className="display-price">
                  <p>Total cost</p>
                  <h4>₦{commaNumber(numberOfTables * tablePrice)}</h4>
                </div>
              </div>

              {/* Where payments breakdown is displayed */}
              <div className="payment-breakdown-container">
                <p>
                  Number of Tables <span>{numberOfTables}</span>
                </p>
                <p>
                  Number of Chairs <span>{numberOfTables * 8}</span>
                </p>
                <p>
                  Decoration{" "}
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                </p>
                <p>
                  Security{" "}
                  <span>
                    <FontAwesomeIcon icon="check-circle" />
                  </span>
                </p>
              </div>

              {/* Paystack Button */}
              <PaystackButton
                text="Pay"
                tag="button"
                email={email}
                amount={nairaToKobo(totalPrice)} // Paystack works with kobo
                close={this.paystackClose}
                class="btn btn-primary btn-center payment-button"
                callback={this.paystackCallback}
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
