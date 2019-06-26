import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const FACE_EMOJIS = ["😍", "😏"];

export default function GroupMemberPlaceholder({ enabled, toggleModal }) {
  if (enabled) {
    return (
      <Button
        size="lg"
        className="invite-button"
        onClick={() => toggleModal("showInviteUserModal")}
      >
        <FontAwesomeIcon icon="plus" />
      </Button>
    );
  }
  return (
    <Button size="lg" className="invite-button" disabled>
      <span>{FACE_EMOJIS[Math.floor(Math.random() * FACE_EMOJIS.length)]}</span>
    </Button>
  );
}
