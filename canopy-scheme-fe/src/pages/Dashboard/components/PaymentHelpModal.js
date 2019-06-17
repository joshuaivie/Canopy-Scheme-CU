/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ShowHelpModal({ toggleModal, showHelpModal }) {
  return (
    <Modal show={showHelpModal} onHide={() => toggleModal("showHelpModal")}>
      <Modal.Header closeButton>
        <Modal.Title>
          How can I reserve a table
          <span role="img" aria-label="emoji">
            💁
          </span>
          ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="group-help-modal">
          <ol className="ol">
            <li className="py-2">
              Pay the required amount into &nbsp;
              <span style={{ fontWeight: "bold" }}>
                (UBA) CUSC Canopy Scheme 2088303800
              </span>
              .
            </li>
            <li className="py-2">
              Enter the payment <b>reference number</b> along with a picture evidence{" "}
              <b>(screenshot or photograph)</b>.
            </li>
            <li className="py-2">
              Upon submission you'll receive a mail from us showing your reservation
              status.
            </li>
          </ol>
          <p>
            <strong>P.S</strong> - you can make the payment at the bank, through your
            mobile banking app or through USSD.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="group-help-modal-button"
          type="submit"
          variant="light"
          onClick={() => toggleModal("showHelpModal")}
        >
          OK, I've got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
