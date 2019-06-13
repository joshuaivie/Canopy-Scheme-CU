import React from "react";
import { Button, Card, Container, Table, Pagination } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { AdminAction } from "actions";
import TransactionDetailModal from "./components/TransactionDetailModal";
import Avatar from "pages/Dashboard/components/Avatar";
import { UserStorage } from "storage";
import * as ROUTES from "routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import statuses from "data/statuses.json";
import { LoadingSpinner, RetryBtn } from "components/spinners";
const commaNumber = require("comma-number");

class AdminDashboard extends React.Component {
  state = {
    transactions: [],
    total: "",
    perPage: "",
    lastPage: "",
    page: 1,
    showTransactionDetailModal: false,
    transactionDetail: {},
    transactionIndex: null,
    isFetching: false,
    errorFetching: false
  };
  componentDidMount() {
    if (!UserStorage.userInfo) this.getOfflineTransactions(1);
  }

  async getOfflineTransactions(page) {
    this.setState({ isFetching: true, errorFetching: false });
    try {
      const { paginated_data } = await AdminAction.getOfflineTransactions({ page });
      const { data: transactions, perPage, total, lastPage } = paginated_data;
      this.setState({
        transactions,
        total,
        perPage,
        lastPage,
        page
      });
    } catch (err) {
      this.setState({ errorFetching: true });
    } finally {
      this.setState({ isFetching: false });
    }
  }

  toggleModal = (transactionIndex = null) => {
    if (transactionIndex !== null) {
      const { transactions } = this.state;
      this.setState({
        transactionDetail: transactions[transactionIndex],
        transactionIndex
      });
    }
    const { showTransactionDetailModal } = this.state;
    this.setState({ showTransactionDetailModal: !showTransactionDetailModal });
  };

  updateOfflineTransactionOnTable = (index, status) => {
    let { transactions } = this.state;
    transactions[index]["status"] = status;
    this.setState({ transactions });
  };

  render() {
    const { userInfo } = UserStorage;
    if (userInfo) {
      return (
        <Redirect
          to={{
            pathname: ROUTES.APP,
            state: { from: this.props.location, isRedirect: true }
          }}
        />
      );
    }
    const {
      transactions,
      page,
      // perPage,
      lastPage,
      // total,
      isFetching,
      errorFetching,
      transactionDetail,
      transactionIndex,
      showTransactionDetailModal
    } = this.state;
    const { history } = this.props;
    let body = null;
    if (isFetching) {
      body = (
        <tr>
          <td colSpan="5">
            <LoadingSpinner />
          </td>
        </tr>
      );
    } else if (errorFetching && !isFetching) {
      body = (
        <tr>
          <td colSpan="5">
            <RetryBtn
              retryEvent={this.getOfflineTransactions}
              retryEventParams={page}
            />
          </td>
        </tr>
      );
    } else if (!errorFetching && !isFetching) {
      body = transactions.map((row, index) => (
        <tr key={`row_${index}`}>
          <td>{index + 1}</td>
          <td>{`${row.user.firstname} ${row.user.lastname}`}</td>
          <td>{row.reference}</td>
          <td>₦{commaNumber(parseInt(row.amount))}</td>
          <td
            style={{
              color: statuses[row.status.toLowerCase()]
            }}
          >
            {row.status}
          </td>
          <td>
            <Button onClick={() => this.toggleModal(index)} variant="light">
              <FontAwesomeIcon icon="edit" /> Edit
            </Button>
          </td>
        </tr>
      ));
    }
    return (
      <div className="dashboard">
        <div className="dashboard-header">
          <h4 className="welcome-text primary-text">Canopy Scheme Admin</h4>
          <Avatar history={history} isAdmin />
        </div>
        <Container>
          <Card className="material-card">
            <Card.Header>
              <h5>Payment Uploads</h5>
            </Card.Header>

            <Card.Body>
              <Table borderless hover responsive>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Reference</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>{body}</tbody>
              </Table>
              <div style={{ textAlign: "left" }}>
                <Pagination>
                  <Pagination.First
                    onClick={() => this.getOfflineTransactions(1)}
                    disabled={page <= 1}
                  />
                  <Pagination.Prev
                    onClick={() => this.getOfflineTransactions(page - 1)}
                    disabled={page <= 1}
                  />
                  {/* <Pagination.Item>{1}</Pagination.Item> */}
                  {/* <Pagination.Ellipsis /> */}

                  <Pagination.Item active>{page}</Pagination.Item>
                  {/* <Pagination.Item>{13}</Pagination.Item> */}

                  {/* <Pagination.Ellipsis />
                  <Pagination.Item>{20}</Pagination.Item> */}

                  <Pagination.Next
                    onClick={() => this.getOfflineTransactions(page + 1)}
                    disabled={page => lastPage}
                  />
                  <Pagination.Last
                    onClick={() => this.getOfflineTransactions(lastPage)}
                    disabled={page => lastPage}
                  />
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Container>
        <TransactionDetailModal
          transactionDetail={transactionDetail}
          showTransactionDetailModal={showTransactionDetailModal}
          toggleModal={this.toggleModal}
          updateOfflineTransaction={this.updateOfflineTransaction}
          transactionIndex={transactionIndex}
        />
      </div>
    );
  }
}

export default AdminDashboard;
