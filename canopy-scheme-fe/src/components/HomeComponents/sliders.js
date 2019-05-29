import React from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import tentSvg from "../../assets/svg/tent.svg";
import familySvg from "../../assets/svg/family.svg";
import dinningTableSvg from "../../assets/svg/dinning-table.svg";

export default () => (
	<React.Fragment>
		<div className="section">
			<Row>
				<Col xs="12" md="6" className="left">
					<h1
						style={{
							fontSize: 60
						}}
					>
						Canopy Scheme
					</h1>
					<p>
						Make every moment of your convocation worth it by having
						order, organization and color around as your spend your
						day with family and loved ones. Book a spot today!.{" "}
					</p>
					<Link to="/app">
						<Button>Make a reservation</Button>
					</Link>
				</Col>
				<Col xs="12" md="6" className="right">
					<img src={tentSvg} width="500" alt="" />
				</Col>
			</Row>
		</div>
		<div className="section">
			<Row>
				<Col xs="12" md="6" className="left">
					<h1>Pricing</h1>
					<p>
						Different packages to match different needs. Find what
						suits your requirements here.{" "}
					</p>
					<Link to="/app">
						<Button>Make a reservation</Button>
					</Link>
				</Col>
				<Col xs="12" md="6" className="right">
					<img src={dinningTableSvg} width="500" alt="" />
				</Col>
			</Row>
		</div>
		<div className="section">
			<Row>
				<Col xs="12" md="6" className="left">
					<h1>Groups</h1>
					Got graduating friends you want close by you?
					<ul>
						<li>Create a group link</li>
						<li>
							Invite your friends by sending the group links to
							them
						</li>
						<li>
							Your group would be allocated around one another
						</li>
						<li>Maximum group size is 5</li>
					</ul>
					<Link to="/app">
						<Button>Create a group</Button>
					</Link>
				</Col>
				<Col xs="12" md="6" className="right">
					<img src={familySvg} width="500" alt="" />
				</Col>
			</Row>
		</div>
	</React.Fragment>
);
