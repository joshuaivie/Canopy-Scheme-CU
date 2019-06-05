import React from "react";
import { Button } from "react-bootstrap";
import tentSvg from "assets/svg/tent.svg";
import familySvg from "assets/svg/family.svg";
import dinningTableSvg from "assets/svg/dinning-table.svg";
import Contact from "./Contact";

export default ({ toggleModal }) => (
  <div id="landing-page">
    <div className="section">
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
        <img src={tentSvg} alt="" />
      </div>
    </div>
    <div className="section">
      <div className="left">
        <h1>Pricing</h1>
        <p>
          Different packages to match different needs. Find what suits your requirements
          here.
        </p>
        <Button onClick={() => toggleModal()}>Make a reservation</Button>
      </div>
      <div className="right">
        <img src={dinningTableSvg} alt="" />
      </div>
    </div>
    <div className="section">
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
        <img src={familySvg} alt="" />
      </div>
    </div>
    <Contact />
  </div>
);
