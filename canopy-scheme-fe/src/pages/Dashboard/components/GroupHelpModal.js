import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ShowHelpModal({ toggleModal, showHelpModal }) {
  return (
    <Modal show={showHelpModal} onHide={() => toggleModal("showHelpModal")}>
      <Modal.Header closeButton>
        <Modal.Title>What is Group all about 💁 ?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="group-help-modal">
          <p>Wouldn't you just love it if you could sit with your best friends</p>
          <p>
            This can be arranged in just <span>3</span> easy steps
          </p>
          <ol className="ol">
            <li>Create your group, make sure you give it a fly name</li>
            <li>
              Invite your friends using their matric number and a valid email address
            </li>
            <li>
              After your friends accept your invites, we'll set up a nice spot for you
              guys
            </li>
          </ol>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="group-help-modal-button"
          type="submit"
          variant="light"
          onClick={() => toggleModal("showHelpModal")}
        >
          OK, i've got it
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
