import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";

export default () => (
	<div className="section">
		<Row>
			<Col xs="12" md="6" className="left">
				<h1>Contact Us</h1>
				<p>
					We're here for you. Let us know any feedback or extra
					support you would need and we'll be happy to help.{" "}
				</p>
			</Col>
			<Col xs="12" md="6" className="right text-left">
				<Form>
					<Form.Group controlId="exampleForm.ControlInput1">
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type="email"
							placeholder="name@example.com"
						/>
					</Form.Group>
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Label>Message</Form.Label>
						<Form.Control as="textarea" rows="3" />
					</Form.Group>
					<Button>Send</Button>
				</Form>{" "}
			</Col>
		</Row>
	</div>
);