import React from 'react';
import Layout from '../layouts';
import ReactFullpage from '@fullpage/react-fullpage';

import Sliders from '../components/HomeComponents/sliders'
import Contact from '../components/HomeComponents/contact'

export default () => (
      <Layout>
        <ReactFullpage
          navigation
          render={({ state, fullpageApi }) => {
            return (
              <ReactFullpage.Wrapper>
                <Sliders />
                <Contact/>
              </ReactFullpage.Wrapper>
            );
          }}
        />
      </Layout>
    );