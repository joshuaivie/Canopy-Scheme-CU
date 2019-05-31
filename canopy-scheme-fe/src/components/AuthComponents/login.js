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
    this.setState({ isLoading: true, error: false });
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
      const {messages} = responseErrorObj(e);
      let errorMsg = "";
      if (Array.isArray(messages)) {
        messages.map(error => {
          errorMsg += Object.values(error)[0];
          return null;
        });
      } else {
        errorMsg = messages.msg;
      }
      this.setState({ isLoading: false, errorMsg: errorMsg, error: true });
    }
  }

  render() {
    const { email, password, isLoading, error, errorMsg } = this.state;
    const { switchForm } = this.props;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
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
          {error ? <p className="form-error-msg">{errorMsg}</p> : null}
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            className="btn-center"
          >
            Login
          </Button>
          <p style={{ textAlign: "center" }}>
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
