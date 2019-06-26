import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ShowHelpModal({ toggleModal, showHelpModal }) {
  return (
    <Modal show={showHelpModal} onHide={() => toggleModal("showHelpModal")}>
      <Modal.Header closeButton>
        <Modal.Title>
          What is Group all about{" "}
          <span role="img" aria-label="emoji">
            💁
          </span>
          ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="group-help-modal">
          <p className="py-2">
            Wouldn't you just love it if you could sit with your best friends and thier
            families. This can be arranged in just 3 easy steps:
          </p>
          <ol className="ol">
            <li className="py-2">
              Create your group, make sure you give it a fly name
            </li>
            <li className="py-2">
              Invite your friends using their matric number and valid email address. A
              group invite link is sent to thier email
            </li>
            <li className="py-2">
              After your friends accept your invites, we'll set up a nice spot for you
              guys
            </li>
          </ol>
          <p>
            <span style={{ fontWeight: "bold" }}>Note:</span> You can only invites
            friends who have paid for at least 1 table
          </p>
          <p>
            if you want more than 5 people in your group, make a special request by
            sending a mail to:{" "}
            <a href="mailto:supportcpc@covenantuniversity.edu.ng?Subject=Canopy%20Scheme%20Special%20Group%20Request">
              supportcpc@covenantuniversity.edu.ng
            </a>
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
