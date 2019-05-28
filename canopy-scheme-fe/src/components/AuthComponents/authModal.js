import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginComponent from './login';
import RegisterComponent from './register';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AuthModal extends React.Component {
  state = {
    form: 'Login',
  };

  componentDidMount() {
    const { form } = this.props;
    this.setState({ form });
  }

  switchForm = () => {
    const { form } = this.state;
    this.setState({ form: form === 'Login' ? 'Register' : 'Login' });
  };

  render() {
    const { show, toggleModal } = this.props;
    const { form } = this.state;
    return (
      <Modal size="lg" show={show} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {form}{' '}
            <span className="float-right">
              {' '}
              <Button
                className="btn-link"
                onClick={this.switchForm}
                style={{ cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon="chevron-left" />
                <FontAwesomeIcon icon="chevron-right" />
              </Button>
              {form === 'Login' ? 'Register' : 'Login'}
            </span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {form === 'Login' && <LoginComponent />}
          {form === 'Register' && <RegisterComponent />}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AuthModal;
