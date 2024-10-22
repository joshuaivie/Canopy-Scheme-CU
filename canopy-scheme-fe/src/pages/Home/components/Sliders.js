import React from "react";
import { Button } from "react-bootstrap";
import tentSvg from "assets/svg/tent.svg";
import familySvg from "assets/svg/family.svg";
import messageSvg from "assets/svg/message.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="section" id="groups">
      <div className="left">
        <h1>Groups</h1>
        Got graduating friends you want close by you?
        <ol className="ol text-left">
          <li>Create a group and invite your friends</li>
          <li>Your group would be allocated around your friends</li>
          <li>Maximum group size is 5</li>
          <li>Special requests can be made for specific needs</li>
        </ol>
        <Button onClick={() => toggleModal()}>Create a group</Button>
      </div>
      <div className="right">
        <img src={familySvg} alt="" className="float" />
      </div>
    </div>
    <div className="section" id="contact">
      <div className="left">
        <h1>Have questions?</h1>
        <p>
          Call us on &nbsp;
          <FontAwesomeIcon className="primary-text" icon="phone" />
          &nbsp;
          <a href="tel:09016179196">0901-617-9196</a>
        </p>
        <p>
          Or send an email to &nbsp;
          <FontAwesomeIcon className="primary-text" icon="envelope" />
          &nbsp;
          <a href="mailto:cpc@covenantuniversity.edu.ng?Subject=Canopy%20Scheme%20Inquiry">
            cpc@covenantuniversity.edu.ng
          </a>
        </p>
        <p>
          Would you like to have a chat with us, kindly click the message icon&nbsp;
          <FontAwesomeIcon className="primary-text" icon="comment-alt" />
          &nbsp; at the bottom right of your sceen.
        </p>
      </div>
      <div className="right">
        <img src={messageSvg} alt="" className="float" />
      </div>
    </div>
  </div>
);
