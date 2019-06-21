import React from "react";
import { Modal, Button, Form, Col, Row, Badge } from "react-bootstrap";
import { AdminAction } from "actions";
import ModalImage from "react-modal-image";
import { successAlert } from "utils/notification";
import { BtnLoadingSpinner } from "components/spinners";
import statuses from "data/statuses.json";

const commaNumber = require("comma-number");

class TransactionDetailModal extends React.Component {
  state = {
    adminMessage: "",
    transactionStatus: "pending",
    isLoading: false,
    errorMsg: {}
  };

  componentDidMount() {
    this.setState({ transactionStatus: this.props.transactionDetail.status });
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.showTransactionDetailModal === true &&
      prevProps.showTransactionDetailModal === false
    ) {
      this.setState({
        transactionStatus: this.props.transactionDetail.status,
        adminMessage: this.props.transactionDetail.admin_message,
        errorMsg: {}
      });
    }
  }

  async updateOfflineTransaction() {
    const { transactionStatus, adminMessage, errorMsg } = this.state;
    if (transactionStatus === "rejected" && adminMessage === "") {
      errorMsg.admin_message = "Please enter a reason for rejecting.";
      this.setState({ errorMsg });
    } else {
      this.setState({ isLoading: true, errorMsg: "" });
      const {
        transactionDetail: { reference }
      } = this.props;
      try {
        const { msg } = await AdminAction.updateOfflineTransaction({
          reference,
          transactionStatus,
          adminMessage
        });
        successAlert(msg);
        const {
          transactionIndex,
          updateOfflineTransactionOnTable,
          toggleModal
        } = this.props;
        updateOfflineTransactionOnTable(transactionIndex, transactionStatus);
        toggleModal();
      } catch (err) {
        this.setState({ errorMsg: err });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      showTransactionDetailModal,
      toggleModal,
      transactionDetail,
      readOnly
    } = this.props;
    const { adminMessage, transactionStatus, isLoading, errorMsg } = this.state;
    if (!showTransactionDetailModal) {
      return <div />;
    } else {
      return (
        <Modal show={showTransactionDetailModal} onHide={() => toggleModal()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {readOnly ? (
                <React.Fragment>
                  Transaction on{" "}
                  {new Date(transactionDetail.created_at).toLocaleString()}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Transaction by{" "}
                  {`${transactionDetail.user.firstname} ${
                    transactionDetail.user.lastname
                  }`}
                </React.Fragment>
              )}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs="12" md="6">
                {!readOnly && (
                  <React.Fragment>
                    <p className="gray-text">Name</p>
                    <h5>
                      {`${transactionDetail.user.firstname} ${
                        transactionDetail.user.lastname
                      }`}
                    </h5>
                    <hr />
                    <p className="gray-text">Email</p>
                    <h5>{transactionDetail.user.email}</h5>
                    <hr />
                    <p className="gray-text">Matric no</p>
                    <h5>{transactionDetail.user.matric_no}</h5>
                    <hr />
                  </React.Fragment>
                )}
                <p className="gray-text">Photo Evidence</p>
                <ModalImage
                  small={transactionDetail.photo_url}
                  large={transactionDetail.photo_url}
                  hideZoom
                  alt={`${readOnly ? "Photo" : transactionDetail.user.firstname} ${
                    readOnly ? "Evidence" : transactionDetail.user.lastname
                  }`}
                />
                <p
                  className="desktop-only"
                  style={{
                    fontSize: 10
                  }}
                >
                  Click on image to preview{" "}
                </p>
                <br className="mobile-only" />
              </Col>
              <Col xs="12" md="6">
                <p className="gray-text">Reference</p>
                <h5>{transactionDetail.reference}</h5>
                <hr />
                <p className="gray-text">Amount</p>
                <h5>₦{commaNumber(parseInt(transactionDetail.amount))}</h5>
                <hr />
                {readOnly && (
                  <React.Fragment>
                    <p className="gray-text">Tables</p>
                    <h5>{transactionDetail.total_table}</h5>
                    <hr />
                    <p className="gray-text">Payment Mode</p>
                    <h5>{transactionDetail.mode}</h5>
                    <hr />
                  </React.Fragment>
                )}
                <p className="gray-text">Status</p>
                {readOnly ? (
                  <Badge variant={statuses[transactionDetail.status]}>
                    {transactionDetail.status}
                  </Badge>
                ) : (
                  <React.Fragment>
                    <Form.Control
                      as="select"
                      name="transactionStatus"
                      value={transactionStatus}
                      onChange={this.handleChange}
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accept</option>
                      <option value="rejected">Reject</option>
                    </Form.Control>
                    {errorMsg.status !== "" && (
                      <p className="form-error-msg">{errorMsg.status}</p>
                    )}
                    {transactionStatus === "accepted" && (
                      <p>
                        The number of tables will be calculated with the unit price and
                        the amount the user paid. This user will now be eligible for
                        allocation
                      </p>
                    )}
                    {transactionStatus === "rejected" && (
                      <Form.Group>
                        <Form.Label>Reason for rejection</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="e.g photo evidence not clear enough or amount entered does not match one in photo"
                          row="4"
                          name="adminMessage"
                          value={adminMessage}
                          onChange={this.handleChange}
                          required
                        />
                        {errorMsg.admin_message !== "" && (
                          <p className="form-error-msg">{errorMsg.admin_message}</p>
                        )}
                        <Form.Text className="text-muted">
                          Please make sure the user can understand the reason.
                        </Form.Text>
                      </Form.Group>
                    )}
                  </React.Fragment>
                )}
                {readOnly && transactionDetail.admin_message && (
                  <React.Fragment>
                    <hr />
                    <p className="gray-text">Admin Message</p>
                    <h5>{transactionDetail.admin_message}</h5>
                  </React.Fragment>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="light" onClick={() => toggleModal()}>
              Close
            </Button>
            {!readOnly && (
              <Button
                type="submit"
                variant="primary"
                disabled={transactionStatus === "pending" || isLoading}
                onClick={() => this.updateOfflineTransaction()}
              >
                {isLoading ? <BtnLoadingSpinner /> : "Update"}
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
export default TransactionDetailModal;
