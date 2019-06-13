import React from "react";
import { Container, Form, Button, Col, InputGroup } from "react-bootstrap";
import { AuthAction } from "actions";
import * as ROUTES from "routes";
import { validateMatricNo } from "utils/validateMatric";
import { successAlert } from "utils/notification";
import { BtnLoadingSpinner } from "components/spinners";
import { NetworkAvailabilityContext } from "utils/http";

class Register extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    matricNo: "",
    telephoneNo: "",
    passwordShow: "password",
    errorMsg: {},
    isLoading: false
  };
  static contextType = NetworkAvailabilityContext;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true, errorMsg: {} });
    const matricVal = validateMatricNo(this.state.matricNo);
    if (matricVal.error) {
      this.setState({ errorMsg: { matric_no: matricVal.msg }, isLoading: false });
    } else {
      this.register();
    }
  };

  toggleShowPassword = () => {
    let { passwordShow } = this.state;
    if (passwordShow === "password") {
      passwordShow = "text";
    } else {
      passwordShow = "password";
    }
    this.setState({ passwordShow });
  };

  async register() {
    try {
      const msg = await AuthAction.register({ ...this.state });
      successAlert(msg);
      this.props.history.push(ROUTES.APP);
    } catch (errorMsg) {
      this.setState({ isLoading: false, errorMsg });
    }
  }

  render() {
    const {
      email,
      matricNo,
      password,
      firstname,
      lastname,
      passwordShow,
      telephoneNo,
      errorMsg,
      isLoading
    } = this.state;
    const { switchForm } = this.props;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Row>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your firstname"
                  name="firstname"
                  value={firstname}
                  onChange={this.handleChange}
                  required
                />
              </Form.Group>
              {errorMsg.firstname ? (
                <p className="form-error-msg">{errorMsg.firstname}</p>
              ) : null}
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your lastname"
                  name="lastname"
                  value={lastname}
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
            <Col xs={12} md={6}>
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
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Matric number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g 15CF02600"
                  name="matricNo"
                  value={matricNo}
                  onChange={this.handleChange}
                  required
                />
                <Form.Text className="text-muted">Must be in final year</Form.Text>
                {errorMsg.matric_no ? (
                  <p className="form-error-msg">{errorMsg.matric_no}</p>
                ) : null}
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter a valid email"
              name="email"
              value={email}
              onChange={this.handleChange}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            {errorMsg.email ? <p className="form-error-msg">{errorMsg.email}</p> : null}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Password"
                aria-label="Password"
                name="password"
                type={passwordShow}
                value={password}
                onChange={this.handleChange}
                required
              />
              <InputGroup.Append>
                <InputGroup.Text
                  id="basic-addon2"
                  onClick={() => this.toggleShowPassword()}
                  style={{ cursor: "pointer" }}
                >
                  {passwordShow === "password" ? "Show" : "Hide"}
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            {errorMsg.password ? (
              <p className="form-error-msg">{errorMsg.password}</p>
            ) : null}
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || !this.context.online}
            className="btn-center btn-full-width"
          >
            {isLoading ? <BtnLoadingSpinner /> : "Register"}
          </Button>
          <br />
          <p className="text-center">
            Have an account?{" "}
            <span
              className="primary-text"
              onClick={() => {
                switchForm("login");
              }}
              style={{
                cursor: "pointer"
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
