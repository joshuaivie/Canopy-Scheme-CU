import React from "react";
import { Form, Button, Container } from "react-bootstrap";
import { post } from "../../utils/fetch";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false
        };
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.login();
    };

    async login() {
        try {
            const { email, password } = this.state;
            console.log(email, password);
            const res = await post("login", { email, password });
            localStorage.setItem("authToken", res.data.token);
            let { history } = this.props;
            window.setTimeout(function() {
                history.push("/app");
            }, 2000);
        } catch (err) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { email, password, isLoading } = this.state;
        const { switchForm } = this.props;
        if (isLoading) {
            return;
        }
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <div className="text-center">
                        <h4 className="dark-grey-text">
                            <strong>Login to your account</strong>
                        </h4>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
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
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <br />
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
