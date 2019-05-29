import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { post } from "../../utils/fetch";

class Register extends React.Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        matriculationNumber: "",
        telephoneNo: "",
        isLoading: false
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoading: true });
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
            const res = await post("register", {
                email,
                matric_no: matriculationNumber,
                password,
                firstname: firstName,
                lastname: lastName,
                telephone_no: telephoneNo
            });

            localStorage.setItem("authToken", res.data.token);
            let { history } = this.props;
            window.setTimeout(function() {
                history.push("/app");
            }, 2000);
        } catch (err) {
            console.error(err);
        } finally {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const {
            email,
            matriculationNumber,
            password,
            firstName,
            lastName,
            phoneNo,
            isLoading
        } = this.state;
        const { switchForm } = this.props;
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
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
                    <Form.Group controlId="formBasicEmail">
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
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Matriculation number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g 15CF02600"
                            name="matriculationNumber"
                            value={matriculationNumber}
                            onChange={this.handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="e.g +2348000000000"
                            name="phoneNo"
                            value={phoneNo}
                            onChange={this.handleChange}
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll need it for contacting you
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
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
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                    <p>
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
