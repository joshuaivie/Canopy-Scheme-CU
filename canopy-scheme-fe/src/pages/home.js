import React from "react";
import Layout from "../layouts";
import ReactFullpage from "@fullpage/react-fullpage";
import * as Routes from "../routes";
import Sliders from "../components/HomeComponents/Sliders";
import AuthModal from "../components/AuthComponents/AuthModal";
import { isLoggedIn } from "../utils/auth";

class Home extends React.Component {
  state = {
    showAuthModal: false
  };
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

  toggleModal = () => {
    const { showAuthModal } = this.state;
    this.setState({ showAuthModal: !showAuthModal });
  };

  render() {
    const { showAuthModal } = this.state;
    return (
      <React.Fragment>
        <Layout toggleModal={this.toggleModal}>
          <ReactFullpage
            navigation
            render={({ state, fullpageApi }) => {
              return (
                <ReactFullpage.Wrapper>
                  <Sliders toggleModal={this.toggleModal}/>
                </ReactFullpage.Wrapper>
              );
            }}
          />
        </Layout>
        <AuthModal show={showAuthModal} toggleModal={this.toggleModal} />
      </React.Fragment>
    );
  }
}

export default Home;
