import React from "react";
import {
  Button,
  Card,
  Container,
  Table,
  Pagination,
  Badge,
  Form
} from "react-bootstrap";
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
    isFetching: true,
    errorFetching: false,
    filter: "all"
  };
  componentDidMount() {
    if (!UserStorage.userInfo) this.getOfflineTransactions(1);
  }

  getOfflineTransactions = async (page, statusType = this.state.filter) => {
    this.setState({ isFetching: true, errorFetching: false });
    try {
      const { paginated_data } = await AdminAction.getOfflineTransactions({
        page,
        statusType
      });
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
  };

  seFilter = event => {
    this.setState({ filter: event.target.value, page: 1 }, () =>
      this.getOfflineTransactions(1)
    );
  };

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

  renderContent = () => {
    const {
      transactions,
      page,
      perPage,
      lastPage,
      isFetching,
      errorFetching
    } = this.state;

    if (isFetching) {
      return <LoadingSpinner />;
    } else if (errorFetching && !isFetching) {
      return (
        <RetryBtn retryEvent={this.getOfflineTransactions} retryEventParams={page} />
      );
    } else if (!errorFetching && !isFetching) {
      if (transactions.length < 1) {
        return (
          <div className="text-center">
            <p>No tansactions available</p>
          </div>
        );
      }
      const body = transactions.map((row, index) => (
        <tr key={`row_${index}`}>
          <td>{perPage * (page - 1) + index + 1}</td>
          <td>{`${row.user.firstname} ${row.user.lastname}`}</td>
          <td>{row.reference}</td>
          <td>₦{commaNumber(parseInt(row.amount))}</td>
          <td>
            <Badge variant={statuses[row.status]}>{row.status}</Badge>
          </td>
          <td>
            <Button onClick={() => this.toggleModal(index)} variant="light">
              <FontAwesomeIcon icon="edit" /> Edit
            </Button>
          </td>
        </tr>
      ));
      return (
        <React.Fragment>
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
          <div>
            <Pagination>
              <Pagination.First
                onClick={() => this.getOfflineTransactions(1)}
                disabled={page <= 1}
              />
              <Pagination.Prev
                onClick={() => this.getOfflineTransactions(page - 1)}
                disabled={page <= 1}
              />
              <Pagination.Item active>{page}</Pagination.Item>
              {/* {page + 1 < lastPage && (
                    <React.Fragment>
                      <Pagination.Ellipsis />
                      <Pagination.Item>{lastPage}</Pagination.Item>
                    </React.Fragment>
                  )} */}
              <Pagination.Next
                onClick={() => this.getOfflineTransactions(page + 1)}
                disabled={page >= lastPage}
              />
              <Pagination.Last
                onClick={() => this.getOfflineTransactions(lastPage)}
                disabled={page >= lastPage}
              />
            </Pagination>
          </div>
        </React.Fragment>
      );
    }
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
      perPage,
      lastPage,
      total,
      transactionDetail,
      transactionIndex,
      showTransactionDetailModal
    } = this.state;
    const { history } = this.props;
    return (
      <div className="dashboard admin">
        <div className="dashboard-header admin">
          <h4 className="welcome-text primary-text">Canopy Scheme Admin</h4>
          <Avatar history={history} isAdmin />
        </div>
        <Container>
          <Card className="material-card">
            <Card.Header
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <h5>Payment Uploads</h5>
              <Form.Group>
                <Form.Label className="primary-text">Filter</Form.Label>
                <Form.Control
                  as="select"
                  style={{
                    width: 150,
                    textAlign: "center"
                  }}
                  name="transactionStatus"
                  onChange={this.seFilter}
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Form.Group>
            </Card.Header>

            <Card.Body>{this.renderContent()}</Card.Body>
            <Card.Footer>
              {transactions.length > 0 ? (
                <p>{`${perPage * (lastPage && page === 1 ? 0 : lastPage) + 1} - ${
                  perPage * page > total ? total : perPage * page
                } of ${total}`}</p>
              ) : (
                <p>No result</p>
              )}
            </Card.Footer>
          </Card>
        </Container>
        <TransactionDetailModal
          transactionDetail={transactionDetail}
          showTransactionDetailModal={showTransactionDetailModal}
          toggleModal={this.toggleModal}
          updateOfflineTransactionOnTable={this.updateOfflineTransactionOnTable}
          transactionIndex={transactionIndex}
        />
      </div>
    );
  }
}

export default AdminDashboard;
