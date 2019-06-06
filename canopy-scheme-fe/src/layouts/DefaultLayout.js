import React from "react";
import { Route } from "react-router-dom";

class DefaultLayout extends React.Component {
  state = {
    showAuthModal: false
  };
  toggleModal = (val = null) => {
    if (val != null) {
      this.setState({ showAuthModal: val });
      return;
    }
    const { showAuthModal } = this.state;
    this.setState({ showAuthModal: !showAuthModal });
  };
  render() {
    const { showAuthModal } = this.state;
    const { component: Component, history, ...rest } = this.props;
    return (
      <React.Fragment>
        <Route
          {...rest}
          render={matchProps => (
            <Component
              toggleModal={this.toggleModal}
              showAuthModal={showAuthModal}
              history={history}
              {...matchProps}
            />
          )}
        />
      </React.Fragment>
    );
  }
}
export default DefaultLayout;
