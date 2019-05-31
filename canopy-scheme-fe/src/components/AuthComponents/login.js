import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { post, responseErrorObj } from "../../utils/fetch";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
      error: false,
      errorMsg: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    this.setState({ isLoading: true });
    this.login();
    event.preventDefault();
  };

  async login() {
    try {
      const { email, password } = this.state;
      const res = await post("login", { email, password });
      localStorage.setItem("authToken", res.data.token);
      window.location.href = "/app";
    } catch (e) {
      const err = responseErrorObj(e);
      this.setState({ isLoading: false, errorMsg: err.message.msg, error: true });
    }
  }

  render() {
    const { email, password, isLoading, error, errorMsg } = this.state;
    const { switchForm } = this.props;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {error ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            style={{ margin: "auto", display: "block", width: "100px" }}
          >
            Login
          </Button>
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                switchForm("register");
              }}
              style={{
                textDecoration: "underline",
                fontStyle: "italic",
                cursor: "grabbing"
              }}
            >
              Register
            </span>
          </p>
        </Form>
      </Container>
    );
  }
}

export default Login;
