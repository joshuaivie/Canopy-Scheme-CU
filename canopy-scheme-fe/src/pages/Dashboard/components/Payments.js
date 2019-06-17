import React from "react";
import { Button, Card, Col, Table, Modal, Form, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaystackButton from "react-paystack";
import FeatureLock from "components/FeatureLock";
import PaymentHelpModal from "./PaymentHelpModal";
import { UserAction, TableAction } from "actions";
import { generateRandomString } from "utils/string";
import { nairaToKobo } from "utils/money";
import { UserStorage } from "storage";
import { errorAlert, successAlert } from "utils/notification";
import { createTimeStamp } from "utils/createTimeStamp";
import commaNumber from "comma-number";
import { LoadingSpinner, RetryBtn, BtnLoadingSpinner } from "components/spinners";
import statuses from "data/statuses.json";
import { NetworkAvailabilityContext } from "utils/http";
import TransactionDetailModal from "pages/AdminDashboard/components/TransactionDetailModal";
// import { createTimeStamp } from "utils/createTimeStamp";
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_KEY;

class Payments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "Date", dataName: "updated_at" },
        { name: "Mode", dataName: "mode" },
        { name: "Reference", dataName: "reference" },
        { name: "Amount", dataName: "amount" },
        { name: "Tables", dataName: "total_table" },
        { name: "Status", dataName: "status" }
      ],
      transactions: [],
      showTransactionDetailModal: false,
      transactionDetail: {},
      transactionIndex: null,
      show: false,
      numberOfTables: 1,
      tablePrice: 12000, // naira
      totalPrice: 12000, // naira
      isFetching: false,
      errorFetching: false,
      errorMsg: "",
      isLoading: false,
      offlinePaymentReference: "",
      showHelpModal: false
    };
    this.fileInput = React.createRef();
  }

  static contextType = NetworkAvailabilityContext;

  componentDidMount() {
    this._isMounted = true;

    const {
      userInfo: { email_verified }
    } = UserStorage;
    if (email_verified) {
      this.getPaymentHistory();
    }
  }

  RenderEmptyHistory = () => (
    <tr>
      <td
        colSpan={6}
        style={{ textAlign: "center", fontWeight: "bolder", padding: "30px" }}
      >
        <p>You have not made any Purchase yet!</p>
        <Button className="my-2" onClick={() => this.toggleModal("showHelpModal")}>
          <FontAwesomeIcon icon="question-circle" title="Know more about Payments" />
          &nbsp; How to Pay
        </Button>
      </td>
    </tr>
  );

  RenderPaymentHistory = transactions =>
    transactions.map((row, index) => (
      <tr
        key={`row_${index}`}
        onClick={() => this.toggleTransactionDetailModal(index)}
        style={{
          cursor: "pointer"
        }}
      >
        <td>{new Date(row.created_at).toLocaleString()}</td>
        <td>{row.mode}</td>
        <td>{row.reference}</td>
        <td>₦{commaNumber(parseInt(row.amount))}</td>
        <td>{row.total_table}</td>
        <td>
          <Badge variant={statuses[row.status]}>{row.status}</Badge>
        </td>
        <td>
          <Button
            onClick={() => this.toggleTransactionDetailModal(index)}
            variant="light"
          >
            View
          </Button>
        </td>
      </tr>
    ));

  DisplayPayments = ({ transactions, isFetching, errorFetching }) => {
    if (isFetching) {
      return (
        <tr>
          <td colSpan={6}>
            <LoadingSpinner />
          </td>
        </tr>
      );
    } else if (errorFetching) {
      return (
        <tr>
          <td colSpan={6}>
            <RetryBtn retryEvent={this.getPaymentHistory} />
          </td>
        </tr>
      );
    }
    return (
      <React.Fragment>
        {transactions.length > 0
          ? this.RenderPaymentHistory(transactions)
          : this.RenderEmptyHistory()}
      </React.Fragment>
    );
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleOpen = () => {
    this.setState({ show: true });
  };

  toggleModal = state => {
    const { [state]: visibility } = this.state;
    this.setState({ [state]: !visibility });
  };

  toggleTransactionDetailModal = (transactionIndex = null) => {
    if (transactionIndex !== null) {
      const { transactions } = this.state;
      this.setState({
        transactionDetail: transactions[transactionIndex],
        transactionIndex
      });
    }
    this.toggleModal("showTransactionDetailModal");
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value, errorMsg: "" });
  };

  increaseTableNumber = event => {
    event.preventDefault();
    let { numberOfTables, tablePrice, transactions } = this.state;
    let limit = 5;
    transactions.forEach(transaction => {
      if (transaction.status !== "rejected") limit -= transaction.total_table;
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
        created_at,
        total_table
      } = transactionsList;
      newTransactions.push({
        mode: "Online",
        reference,
        amount,
        status: "accepted",
        created_at,
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

  get offlineFormIncomplete() {
    return (
      this.state.offlinePaymentReference === "" ||
      this.fileInput.current.files.length <= 0
    );
  }

  handleOfflinePayment = async event => {
    event.preventDefault();
    if (this.offlineFormIncomplete) {
      const errorMsg = { general: "Please complete your transaction details." };
      this.setState({ errorMsg });
      return;
    }
    try {
      this.setState({ isLoading: true });
      const fileArray = this.fileInput.current.files;
      const {
        offlinePaymentReference,
        totalPrice,
        tablePrice,
        transactions
      } = this.state;
      const { photo_url, msg } = await TableAction.payOffline({
        evidence: fileArray[0],
        reference: offlinePaymentReference,
        amount: totalPrice
      });
      transactions.push({
        mode: "Bank",
        amount: totalPrice,
        created_at: createTimeStamp(),
        total_table: Math.floor(totalPrice / tablePrice),
        reference: offlinePaymentReference,
        status: "pending",
        photo_url
      });
      this.setState({ offlinePaymentReference: "", transactions, show: false });
      successAlert(msg);
      // this.fileInput.current.reset(); // Todo: Clear upload list; This doesn't work. Fix it.
    } catch (err) {
      this.setState({ errorMsg: err });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleOnlinePaymentWithPaystack = async response => {
    const { trxref } = response;
    const { numberOfTables, totalPrice } = this.state;
    try {
      await TableAction.payOnline({
        amount: totalPrice,
        totalTable: numberOfTables,
        paystackRef: trxref
      });
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
      tablePrice,
      show,
      showHelpModal,
      columns,
      numberOfTables,
      isFetching,
      isLoading,
      errorFetching,
      offlinePaymentReference,
      transactionDetail,
      transactionIndex,
      showTransactionDetailModal
    } = this.state;
    const {
      userInfo: { email, email_verified }
    } = UserStorage;
    let limit = 5;
    transactions.forEach(transaction => {
      if (transaction.status !== "rejected") limit -= transaction.total_table;
    });

    return (
      <Col xs="12" md="12">
        <Card className="material-card">
          <Card.Header>
            <h5>
              Payments &nbsp;
              <FontAwesomeIcon
                icon="question-circle"
                title="Know more about groups"
                style={{
                  cursor: "pointer"
                }}
                onClick={() => this.toggleModal("showHelpModal")}
              />
            </h5>
            {email_verified ? (
              <React.Fragment>
                {limit > 0 ? (
                  <Button
                    onClick={this.handleOpen}
                    className="make-payment-button"
                    disabled={errorFetching || !this.context.online}
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
                      {columns.map((title, index) => (
                        <th key={index}>{title.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {this.DisplayPayments({
                      isFetching,
                      errorFetching,
                      transactions,
                      columns
                    })}
                  </tbody>
                </Table>
                {limit > 0 ? (
                  <Button
                    onClick={this.handleOpen}
                    className="make-payment-button mobile"
                    disabled={errorFetching || !this.context.online}
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
                    Number of Chairs <span>{numberOfTables * 12}</span>
                  </p>
                </div>

                {this.props.paymentType === "online" ? (
                  <div>
                    <PaystackButton
                      text="Pay"
                      tag="button"
                      disabled={isLoading || !this.context.online}
                      email={email}
                      amount={nairaToKobo(numberOfTables * tablePrice)} // Paystack works with kobo
                      close={this.paystackClose}
                      class="btn btn-primary btn-center payment-button"
                      callback={this.handleOnlinePaymentWithPaystack}
                      reference={generateRandomString()}
                      paystackkey={PAYSTACK_PUBLIC_KEY}
                    />
                  </div>
                ) : (
                  <div>
                    <div className="payment-breakdown-container">
                      <Form.Group>
                        <Form.Label>Enter your teller reference number</Form.Label>
                        <Form.Control
                          type="text"
                          value={offlinePaymentReference}
                          name="offlinePaymentReference"
                          onChange={this.handleChange}
                          placeholder="Reference Number"
                        />
                      </Form.Group>
                      <p style={{ color: "red" }}>{this.state.errorMsg.reference}</p>

                      <Form.Group>
                        <Form.Label>Upload a picture of your payment teller</Form.Label>
                        <Form.Control
                          type="file"
                          ref={this.fileInput}
                          accept="images/*"
                        />
                      </Form.Group>
                      <p style={{ color: "red" }}>{this.state.errorMsg.evidence}</p>
                      <p style={{ color: "red" }}>{this.state.errorMsg.general}</p>
                    </div>
                    <Button
                      className="btn btn-primary payment-button"
                      onClick={this.handleOfflinePayment}
                      disabled={isLoading || !this.context.online}
                    >
                      {isLoading ? <BtnLoadingSpinner /> : "Pay"}
                    </Button>
                  </div>
                )}
              </Form>
            </Modal.Body>
          </Modal>
        ) : null}
        <PaymentHelpModal
          showHelpModal={showHelpModal}
          toggleModal={this.toggleModal}
        />
        <TransactionDetailModal
          transactionDetail={transactionDetail}
          showTransactionDetailModal={showTransactionDetailModal}
          toggleModal={this.toggleTransactionDetailModal}
          transactionIndex={transactionIndex}
          readOnly
        />
      </Col>
    );
  }
}

export default Payments;
