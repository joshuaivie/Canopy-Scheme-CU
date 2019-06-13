import React from "react";
import { Button, Card, Col, Table, Modal, Form, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaystackButton from "react-paystack";
import FeatureLock from "components/FeatureLock";
import { UserAction, TableAction } from "actions";
import { generateRandomString } from "utils/string";
import { nairaToKobo } from "utils/money";
import { UserStorage } from "storage";
import { errorAlert } from "utils/notification";
import { createTimeStamp } from "utils/createTimeStamp";
import commaNumber from "comma-number";

const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_KEY;

const RenderEmptyHistory = columns => (
  <tr>
    <td
      colSpan={columns.length}
      style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
    >
      You have not made any Purchase yet!
    </td>
  </tr>
);

const RenderPaymentHistory = (transactions, columns) =>
  transactions.map((row, index) => (
    <tr key={`row_${index}`}>
      {columns.map(column =>
        column.dataName === "amount" ? (
          <td key={`data_${column.dataName}`}>
            ₦{commaNumber(parseInt(row[column.dataName]))}
          </td>
        ) : (
          <td key={`data_${column.dataName}`}>{row[column.dataName]}</td>
        )
      )}
    </tr>
  ));

const DisplayPayments = ({
  columns,
  transactions,
  isFetching,
  errorFetching,
  getPaymentHistory
}) => {
  if (isFetching) {
    return (
      <tr>
        <td colSpan={columns.length}>
          <Spinner
            animation="border"
            style={{ height: "2rem", width: "2rem", margin: "auto", display: "block" }}
          />
        </td>
      </tr>
    );
  } else if (errorFetching) {
    return (
      <tr>
        <td colSpan={columns.length}>
          <FontAwesomeIcon
            onClick={() => getPaymentHistory()}
            icon="redo"
            style={{ height: "2rem", width: "2rem", margin: "auto", display: "block" }}
          />
        </td>
      </tr>
    );
  }
  return (
    <React.Fragment>
      {transactions.length > 0
        ? RenderPaymentHistory(transactions, columns)
        : RenderEmptyHistory(columns)}
    </React.Fragment>
  );
};

class Payments extends React.Component {
  constructor() {
    super();

    this.state = {
      columns: [
        { name: "Date", dataName: "updated_at" },
        { name: "Mode", dataName: "mode" },
        { name: "Amount", dataName: "amount" },
        { name: "Tables", dataName: "total_table" },
        { name: "Reference", dataName: "reference" }
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
      limit -= transaction.total_table;
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

  mergeAllTransactionTypes = transactions => {
    let newTransactions = [];

    transactions.offline.forEach(transactionsList => {
      newTransactions.push({ mode: "Bank", ...transactionsList });
    });

    transactions.online.forEach(transactionsList => {
      const {
        paystack_ref: reference,
        amount,
        updated_at,
        total_table
      } = transactionsList;
      newTransactions.push({
        mode: "Online",
        reference,
        amount,
        updated_at,
        total_table
      });
    });

    return newTransactions;
  };

  getPaymentHistory = async () => {
    this.setState({ isFetching: true, errorFetching: false });
    try {
      const transactions = await UserAction.getTransactions();
      this.setState({ transactions: this.mergeAllTransactionTypes(transactions) });
    } catch (err) {
      this.setState({ errorFetching: true });
    } finally {
      this.setState({ isFetching: false });
    }
  };

  paystackCallback = async response => {
    const { trxref } = response;
    const { numberOfTables, totalPrice } = this.state;
    try {
      await TableAction.pay({
        amount: totalPrice,
        totalTables: numberOfTables,
        paystackRef: trxref
      });
    } catch (err) {
      console.log(err);
    } finally {
      let { transactions } = this.state;
      transactions.push({
        mode: "Online",
        amount: totalPrice,
        created_at: createTimeStamp(),
        total_table: numberOfTables,
        paystack_ref: trxref
      });
      this.setState({ show: false, transactions });
    }
  };

  paystackClose = () => {
    this.setState({ show: false });
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
      userInfo: { email, email_verified }
    } = UserStorage;
    let limit = 5;
    transactions.forEach(transaction => {
      limit -= transaction.total_table;
    });

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>Payments</h5>
            {email_verified && (
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
            )}
          </Card.Header>

          <Card.Body>
            {email_verified ? (
              <React.Fragment>
                <Table borderless hover responsive>
                  <thead>
                    <tr>
                      {columns.map(title => (
                        <th>{title.name}</th>
                      ))}
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
                    Book Table(s) &nbsp;
                    <FontAwesomeIcon icon="credit-card" />
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
        {email_verified && (
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
        )}
      </Col>
    );
  }
}

export default Payments;
