import React from "react";
import Layout from "layouts";
import ReactFullpage from "@fullpage/react-fullpage";
import * as Routes from "routes";
import Sliders from "pages/Home/components/Sliders";
import { isLoggedIn } from "utils/auth";

class Home extends React.Component {
  componentDidMount() {
    const {
      history: { push }
    } = this.props;
    if (!localStorage.getItem("oldUser")) {
      push(Routes.ONBOARDING);
    } else if (isLoggedIn()) {
      push(Routes.APP);
    }
  }

  render() {
    const { toggleModal, history, showAuthModal } = this.props;
    return (
      <React.Fragment>
        <Layout
          toggleModal={toggleModal}
          history={history}
          showAuthModal={showAuthModal}
        >
          <ReactFullpage
            navigation
            scrollBar
            render={({ state, fullpageApi }) => {
              return (
                <ReactFullpage.Wrapper>
                  <Sliders toggleModal={toggleModal} />
                </ReactFullpage.Wrapper>
              );
            }}
          />
        </Layout>
      </React.Fragment>
    );
  }
}

export default Home;
