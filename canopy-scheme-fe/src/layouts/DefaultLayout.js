import React from "react";
import { Route } from "react-router-dom";
import { networkAvailability, NetworkAvailabilityContext } from "utils/http";

class DefaultLayout extends React.Component {
  state = {
    showAuthModal: false,
    offline: false
  };

  componentDidMount() {
    networkAvailability(this);
  }

  toggleModal = (val = null) => {
    if (val != null) {
      this.setState({ showAuthModal: val });
      return;
    }
    const { showAuthModal } = this.state;
    this.setState({ showAuthModal: !showAuthModal });
  };
  render() {
    const { showAuthModal, offline } = this.state;
    const { component: Component, history, ...rest } = this.props;
    return (
      <NetworkAvailabilityContext.Provider
        value={{
          offline
        }}
      >
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
      </NetworkAvailabilityContext.Provider>
    );
  }
}
export default DefaultLayout;
