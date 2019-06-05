import React from "react";
import { Button } from "react-bootstrap";
import tentSvg from "assets/svg/tent.svg";
import familySvg from "assets/svg/family.svg";
import cardSvg from "assets/svg/debit-card.svg";
import Contact from "./Contact";

export default ({ toggleModal }) => (
  <div id="landing-page">
    <div className="section" id="intro">
      <div className="left">
        <h1 className="primary-text">Canopy Scheme</h1>
        <p>
          Make every moment of your convocation worth it by having order, organization
          and divor around as your spend your day with family and loved ones. Book a
          spot today!
        </p>
        <Button onClick={() => toggleModal()}>Make a reservation</Button>
      </div>
      <div className="right">
        <img src={tentSvg} alt="" className="float" />
      </div>
    </div>
    <div className="section" id="payment">
      <div className="left">
        <h1>Easy Payment</h1>
        <p>Pay conviniently with your card or with bank transfers.</p>
        <Button onClick={() => toggleModal()}>Make a reservation</Button>
      </div>
      <div className="right">
        <img src={cardSvg} alt="" className="float" />
      </div>
    </div>
    <div className="section" id="groups">
      <div className="left">
        <h1>Groups</h1>
        Got graduating friends you want close by you?
        <ol className="ol text-left">
          <li>Create a group link invite your friends</li>
          <li>Your group would be allocated around one another</li>
          <li>Maximum group size is 5</li>
        </ol>
        <Button onClick={() => toggleModal()}>Create a group</Button>
      </div>
      <div className="right">
        <img src={familySvg} alt="" className="float" />
      </div>
    </div>
    <Contact />
  </div>
);
