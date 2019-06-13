import React from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { AdminAction } from "actions";
import ModalImage from "react-modal-image";
import { BtnLoadingSpinner } from "components/spinners";
const commaNumber = require("comma-number");

class TransactionDetailModal extends React.Component {
  state = {
    adminMessage: "",
    transactionStatus: "pending",
    isLoading: false,
    errorMsg: ""
  };
  componentDidMount() {
    this.setState({ transactionStatus: this.props.transactionDetail.status });
  }

  async updateOfflineTransaction() {
    const { transactionStatus, adminMessage } = this.state;
    if (transactionStatus === "rejected" && adminMessage === "") {
      this.setState({ errorMsg: "Please enter a reason for rejecting." });
    } else {
      this.setState({ isLoading: true, errorMsg: "" });
      const {
        transactionDetail: { reference }
      } = this.props;
      try {
        await AdminAction.updateOfflineTransaction({
          reference,
          transactionStatus,
          adminMessage
        });
        const { transactionIndex, updateOfflineTransaction, toggleModal } = this.props;
        updateOfflineTransaction(transactionIndex, transactionStatus);
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
    const { showTransactionDetailModal, toggleModal, transactionDetail } = this.props;
    const { adminMessage, transactionStatus, isLoading, errorMsg } = this.state;
    const transactionImgAlt = `Payment by ${transactionDetail.user.firstname} ${
      transactionDetail.user.lastname
    }`;
    if (!showTransactionDetailModal) {
      return <div />;
    } else {
      return (
        <Modal show={showTransactionDetailModal} onHide={() => toggleModal()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Transaction by{" "}
              {`${transactionDetail.user.firstname} ${transactionDetail.user.lastname}`}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs="12" md="6">
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
                <p className="gray-text">Photo Evidence</p>
                <ModalImage
                  small={transactionDetail.photo_url}
                  large={transactionDetail.photo_url}
                  hideZoom
                  alt={transactionImgAlt}
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
                <p className="gray-text">Status</p>
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
                {transactionStatus === "accepted" && (
                  <p>
                    The number of tables will be calculated with the unit price and the
                    amount the user paid. This user will now be eligible for allocation
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
                    {errorMsg !== "" && <p className="form-error-msg">{errorMsg}</p>}
                    <Form.Text className="text-muted">
                      Please make sure the user can understand the reason.
                    </Form.Text>
                  </Form.Group>
                )}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="light" onClick={() => toggleModal()}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={transactionStatus === "pending" || isLoading}
              onClick={() => this.updateOfflineTransaction()}
            >
              {isLoading ? <BtnLoadingSpinner /> : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
export default TransactionDetailModal;
