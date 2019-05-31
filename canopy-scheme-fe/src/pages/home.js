import React from "react";
import Layout from "../layouts";
import ReactFullpage from "@fullpage/react-fullpage";
import * as Routes from "../routes";
import Sliders from "../components/HomeComponents/Sliders";
import { isLoggedIn } from "../utils/auth";

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
    return (
      <Layout>
        <ReactFullpage
          navigation
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <Sliders />
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </Layout>
    );
  }
}

export default Home;
