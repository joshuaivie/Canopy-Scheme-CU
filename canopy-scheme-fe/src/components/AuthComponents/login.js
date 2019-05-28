import React from 'react';
import { Button } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      password: '',
      isLoading: false,
      isValidated: false,
    };
  }

  handlePasswordToggle = () => {
    const input = document.querySelector('#password');
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';
    this.setState({ isValidated: true });
    this.login();
  };

  async login() {
    try {
      const { emailAddress, password } = this.state;
      console.log(emailAddress, password);
      //TODO: await function from endpoint
    } catch (err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { emailAddress, password, isLoading } = this.state;
    if (isLoading) {
      return;
    }
    return (
      <MDBContainer>
        <form className="needs-validation" onSubmit={this.handleSubmit} noValidate>
          <MDBRow>
            <MDBCol md="8">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Sign in</strong>
                    </h3>
                  </div>
                  <MDBInput
                    label="Email Address"
                    type="email"
                    name="emailAddress"
                    onChange={this.handleChange}
                    value={emailAddress}
                    required
                  />
                  <MDBInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  <Button>Login</Button>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default Login;
