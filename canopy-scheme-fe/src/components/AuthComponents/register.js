import React from 'react';
import { Button } from 'react-bootstrap';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Register extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    matriculationNumber: '',

    isLoading: false,
    isValidated: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated';
    this.setState({ isLoading: true });
    this.register();
  };

  handlePasswordToggle = () => {
    var input = document.getElementById('password');
    var eyeIcon = document.getElementById('eyeIcon');
    if (input.type === 'password') {
      input.type = 'text';
      eyeIcon.classList.remove('fa-eye-slash');
      eyeIcon.classList.add('fa-eye');
    } else {
      input.type = 'password';
      eyeIcon.classList.remove('fa-eye');
      eyeIcon.classList.add('fa-eye-slash');
    }
  };

  async register() {
    try {
      const { emailAddress, password, matriculationNumber, firstName, lastName } = this.state;
      console.log(
        `This is ${emailAddress}, ${password}, ${matriculationNumber}, ${firstName}, ${lastName}`,
      );
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      emailAddress,
      matriculationNumber,
      password,
      firstName,
      lastName,
      isLoading,
    } = this.state;
    if (isLoading) {
      return <div>Loading...</div>;
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
                      <strong>Register</strong>
                    </h3>
                  </div>
                  <MDBInput
                    label="First Name"
                    type="text"
                    name="firstName"
                    onChange={this.handleChange}
                    value={firstName}
                    required
                  />
                  <MDBInput
                    label="Last Name"
                    type="text"
                    name="lastName"
                    onChange={this.handleChange}
                    value={lastName}
                    required
                  />
                  <MDBInput
                    label="Matriculation Number"
                    type="text"
                    name="matriculationNumber"
                    onChange={this.handleChange}
                    value={matriculationNumber}
                    required
                  />
                  <MDBInput
                    label="Email Address"
                    type="email"
                    name="emailAddress"
                    onChange={this.handleChange}
                    value={emailAddress}
                    required
                  />
                  <MDBInput
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                  />
                  <FontAwesomeIcon
                    id="eyeIcon"
                    icon="eye"
                    className="password-toggle-icon"
                    onClick={this.handlePasswordToggle}
                  />
                  <Button>Login</Button>{' '}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </form>
      </MDBContainer>
    );
  }
}

export default Register;
