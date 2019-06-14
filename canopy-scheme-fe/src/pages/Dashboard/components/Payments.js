import React from "react";
import { Button, Card, Col, Table, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeatureLock from "components/FeatureLock";
import { UserAction, TableAction } from "actions";
import { UserStorage } from "storage";
import { errorAlert } from "utils/notification";
// import { createTimeStamp } from "utils/createTimeStamp";
import { LoadingSpinner, RetryBtn } from "components/spinners";
import statuses from "data/statuses.json";

const commaNumber = require("comma-number");

const RenderEmptyHistory = () => (
  <tr>
    <td
      colSpan={5}
      style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
    >
      You have not made any Purchase yet!
    </td>
  </tr>
);

const RenderPaymentHistory = transactions =>
  transactions.map((row, index) => (
    <tr key={`row_${index}`}>
      <td>{row.created_at}</td>
      <td>{row.reference}</td>
      <td>₦{commaNumber(parseInt(row.amount))}</td>
      <td
        style={{
          color: statuses[row.status]
        }}
      >
        {row.status}
      </td>
      <td>{row.total_tables}</td>
    </tr>
  ));

const DisplayPayments = ({
  transactions,
  isFetching,
  errorFetching,
  getPaymentHistory
}) => {
  if (isFetching) {
    return (
      <tr>
        <td colSpan={5}>
          <LoadingSpinner />
        </td>
      </tr>
    );
  } else if (errorFetching) {
    return (
      <tr>
        <td colSpan={5}>
          <RetryBtn retryEvent={getPaymentHistory} />
        </td>
      </tr>
    );
  }
  return (
    <React.Fragment>
      {transactions.length > 0
        ? RenderPaymentHistory(transactions)
        : RenderEmptyHistory()}
    </React.Fragment>
  );
};

class Payments extends React.Component {
  constructor() {
    super();

    this.state = {
      columns: [
        { name: "Date", dataName: "created_at" },
        { name: "Reference", dataName: "reference" },
        { name: "Amount", dataName: "amount" },
        { name: "Status", dataName: "status" },
        { name: "Tables", dataName: "total_tables" },
        { name: "", dataName: "" }
      ],
      transactions: [],
      show: false,
      numberOfTables: 1,
      tablePrice: 10000, // naira
      totalPrice: 10000, // naira
      isFetching: false,
      errorFetching: false
    };
  }

  componentDidMount() {
    const {
      userInfo: { email_verified }
    } = UserStorage;
    if (email_verified) {
      this.getPaymentHistory();
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  increaseTableNumber = event => {
    event.preventDefault();
    let { numberOfTables, tablePrice, transactions } = this.state;
    let limit = 5;
    transactions.forEach(transaction => {
      limit -= transaction.total_tables;
    });
    if (numberOfTables >= limit) {
      errorAlert(`You can only pay for ${limit} more table(s)`);
      return;
    }
    numberOfTables += 1;
    this.setState({
      numberOfTables,
      totalPrice: numberOfTables * tablePrice
    });
  };

  decreaseTableNumber = event => {
    event.preventDefault();
    let { numberOfTables, tablePrice } = this.state;
    if (numberOfTables <= 1) return;

    numberOfTables -= 1;
    this.setState({
      numberOfTables,
      totalPrice: numberOfTables * tablePrice
    });
  };

  getPaymentHistory = async () => {
    this.setState({ isFetching: true, errorFetching: false });
    try {
      const transactions = await UserAction.getTransactions();
      this.setState({ transactions });
    } catch (err) {
      this.setState({ errorFetching: true });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  addTransactiontoTable = transaction => {
    let { transactions } = this.state;
    transactions.push(transaction);
    this.setState({ transactions });
  };

  render() {
    const {
      transactions,
      totalPrice,
      tablePrice,
      show,
      columns,
      numberOfTables,
      isFetching,
      errorFetching
    } = this.state;
    const {
      userInfo: { email_verified }
    } = UserStorage;
    let limit = 5;
    transactions.forEach(transaction => {
      limit -= transaction.total_tables;
    });

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>Payments</h5>
            {email_verified ? (
              <React.Fragment>
                {limit > 0 ? (
                  <Button
                    onClick={this.handleOpen}
                    className="make-payment-button"
                    disabled={errorFetching}
                  >
                    <FontAwesomeIcon icon="credit-card" /> &nbsp; Book Table(s)
                  </Button>
                ) : (
                  <p className="form-error-msg desktop-only">
                    You have paid for 5 tables
                  </p>
                )}
              </React.Fragment>
            ) : null}
          </Card.Header>

          <Card.Body>
            {email_verified ? (
              <React.Fragment>
                <Table borderless hover responsive>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Reference</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Tables</th>
                    </tr>
                  </thead>
                  <tbody>
                    <DisplayPayments
                      // {...{isFetching, transactions, columns}} // a shorter syntax
                      isFetching={isFetching}
                      errorFetching={errorFetching}
                      transactions={transactions}
                      columns={columns}
                      getPaymentHistory={this.getPaymentHistory}
                    />
                  </tbody>
                </Table>
                {limit > 0 ? (
                  <Button
                    onClick={this.handleOpen}
                    className="make-payment-button mobile"
                    disabled={errorFetching}
                  >
                    <FontAwesomeIcon icon="credit-card" />
                    &nbsp;Book Table(s)
                  </Button>
                ) : (
                  <p className="form-error-msg mobile-only">
                    You have paid for 5 tables
                  </p>
                )}
              </React.Fragment>
            ) : (
              <FeatureLock />
            )}
          </Card.Body>
        </Card>

        {/* payment modal */}
        {email_verified ? (
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
              </Form>
            </Modal.Body>
          </Modal>
        ) : null}
      </Col>
    );
  }
}
export default Payments;
