import React from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { HTTP, responseErrorObj } from "../../utils/fetch";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    matriculationNumber: "",
    telephoneNo: "",
    errorMsg: {},
    isLoading: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMsg: {} });
    this.register();
  };

  // handlePasswordToggle = () => {
  // 	var input = document.getElementById("password");
  // 	var eyeIcon = document.getElementById("eyeIcon");
  // 	if (input.type === "password") {
  // 		input.type = "text";
  // 		eyeIcon.classList.remove("fa-eye-slash");
  // 		eyeIcon.classList.add("fa-eye");
  // 	} else {
  // 		input.type = "password";
  // 		eyeIcon.classList.remove("fa-eye");
  // 		eyeIcon.classList.add("fa-eye-slash");
  // 	}
  // };

  async register() {
    try {
      const {
        email,
        password,
        matriculationNumber,
        firstName,
        lastName,
        telephoneNo
      } = this.state;
      // const res = await post("register", {
      //   email,
      //   matric_no: matriculationNumber,
      //   password,
      //   firstname: firstName,
      //   lastname: lastName,
      //   telephone_no: telephoneNo
      // });
      // localStorage.setItem("authToken", res.data.token);
      window.location.href = "/app";
    } catch (e) {
      const { message } = responseErrorObj(e);
      let errorObj = {};
      message.map(error => {
        const firstKey = Object.keys(error)[0];
        errorObj[firstKey] = error[firstKey];
        return null;
      });
      this.setState({ isLoading: false, errorMsg: errorObj, error: true });
    }
  }

  render() {
    const {
      email,
      matriculationNumber,
      password,
      firstName,
      lastName,
      telephoneNo,
      error,
      errorMsg,
      isLoading
    } = this.state;
    const { switchForm } = this.props;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your firstname"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              {errorMsg.firstname ? (
                <p className="form-error-msg">{errorMsg.firstname}</p>
              ) : null}
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your lastname"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              {errorMsg.lastname ? (
                <p className="form-error-msg">{errorMsg.lastname}</p>
              ) : null}
            </Col>
          </Form.Row>

          <Form.Row>
            <Col>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                {errorMsg.email ? (
                  <p className="form-error-msg">{errorMsg.email}</p>
                ) : null}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Matric number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g 15CF02600"
                  name="matriculationNumber"
                  value={matriculationNumber}
                  onChange={this.handleChange}
                  required
                />
                {errorMsg.matric_no ? (
                  <p className="form-error-msg">{errorMsg.matric_no}</p>
                ) : null}
              </Form.Group>
            </Col>
          </Form.Row>

          <Form.Group>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g +2348000000000"
              name="telephoneNo"
              value={telephoneNo}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
              We'll need it for contacting you
            </Form.Text>
            {errorMsg.telephone_no ? (
              <p className="form-error-msg">{errorMsg.telephone_no}</p>
            ) : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
              required
            />
          </Form.Group>
          {errorMsg.password ? (
            <p className="form-error-msg">{errorMsg.password}</p>
          ) : null}
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="btn-center"
          >
            Register
          </Button>
          <p style={{ textAlign: "center" }}>
            Have an account?{" "}
            <span
              onClick={() => {
                switchForm("login");
              }}
              style={{
                textDecoration: "underline",
                fontStyle: "italic",
                cursor: "grabbing"
              }}
            >
              Login
            </span>
          </p>
        </Form>
      </Container>
    );
  }
}

export default Register;
