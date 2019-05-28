import React from "react";
import Layout from "../layouts";
import ReactFullpage from "@fullpage/react-fullpage";

import * as Routes from "../routes";

import Sliders from "../components/HomeComponents/sliders";
import Contact from "../components/HomeComponents/contact";

class Home extends React.Component {
    componentDidMount() {
        const {
            history: { push }
        } = this.props;
        if (!localStorage.getItem("oldUser")) {
            push(Routes.ONBOARDING);
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
                                <Contact />
                            </ReactFullpage.Wrapper>
                        );
                    }}
                />
            </Layout>
        );
    }
}

export default Home;
