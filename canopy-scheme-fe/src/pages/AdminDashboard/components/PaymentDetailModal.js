import React from "react";
import { Modal, Button, Form, Image, Col, Row } from "react-bootstrap";
import BtnLoadingSpinner from "components/BtnLoadingSpinner";
import ModalImage from "react-modal-image";
import { AdminAction } from "actions";
const commaNumber = require("comma-number");

class PaymentDetailModal extends React.Component {
  state = {
    adminMsg: "",
    paymentStatus: "pending",
    isLoading: false,
    errorMsg: ""
  };

  async updatePaymentStatus() {
    const { paymentStatus, adminMsg } = this.state;
    console.log(paymentStatus, adminMsg);
    if (paymentStatus === "rejected" && adminMsg === "") {
      this.setState({ errorMsg: "Please enter a reason for rejecting." });
    } else {
      this.setState({ isLoading: true, errorMsg: "" });
      const {
        paymentDetail: { reference }
      } = this.props;
      try {
        await AdminAction.updatePaymentStatus({ reference, paymentStatus, adminMsg });
        const { paymentIndex, updatePaymentStatusOnTable, toggleModal } = this.props;
        updatePaymentStatusOnTable(paymentIndex, paymentStatus);
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
    const { showPaymentDetailModal, toggleModal, paymentDetail } = this.props;
    const { adminMsg, paymentStatus, isLoading, errorMsg } = this.state;
    const paymentImgAlt = `Payment by ${paymentDetail.name}`;
    if (!showPaymentDetailModal) {
      return <div />;
    } else {
      return (
        <Modal show={showPaymentDetailModal} onHide={() => toggleModal()} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Payment by {paymentDetail.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Name: {paymentDetail.name} <br />
            Email: {paymentDetail.email}
            <br />
            Matric no: {paymentDetail.matric_no}
            <br />
            <Row>
              <Col xs="12" md="6">
                <ModalImage
                  small={"http://localhost:3000/static/media/portrait.000948a7.png"}
                  large={"http://localhost:3000/static/media/portrait.000948a7.png"}
                  hideZoom
                  alt={paymentImgAlt}
                />
                <p>Photo evidence</p>
              </Col>
              <Col xs="12" md="6">
                Details entered by user <br />
                Reference: {paymentDetail.reference}
                <br />
                Amount: ₦{commaNumber(parseInt(paymentDetail.amount))}
                <br />
                <Form.Control
                  as="select"
                  name="paymentStatus"
                  value={paymentStatus}
                  onChange={this.handleChange}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accept</option>
                  <option value="rejected">Reject</option>
                </Form.Control>
                {paymentStatus === "accepted" && (
                  <p>
                    The number of tables will be calculated with the unit price and the
                    amount the user paid. This user will now be eligible for allocation
                  </p>
                )}
                {paymentStatus === "rejected" && (
                  <Form.Group>
                    <Form.Label>Reason for rejection</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="e.g photo evidence not clear enough or amount entered does not match one in photo"
                      row="4"
                      name="adminMsg"
                      value={adminMsg}
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
              disabled={paymentStatus === "pending" || isLoading}
              onClick={() => this.updatePaymentStatus()}
            >
              {isLoading ? <BtnLoadingSpinner /> : "Update"}
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
export default PaymentDetailModal;
