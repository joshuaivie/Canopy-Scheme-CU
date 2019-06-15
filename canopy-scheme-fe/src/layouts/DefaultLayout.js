import React from "react";
import { Route } from "react-router-dom";
import { networkAvailability, NetworkAvailabilityContext } from "utils/http";

class DefaultLayout extends React.Component {
  state = {
    showAuthModal: false,
    online: true
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
    const { showAuthModal, online } = this.state;
    const { component: Component, history, ...rest } = this.props;
    return (
      <NetworkAvailabilityContext.Provider
        value={{
          online
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
