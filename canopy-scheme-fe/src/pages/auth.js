import React from 'react';
import Layout from '../layouts';

import Login from '../components/AuthComponents/login';
import Register from '../components/AuthComponents/register';

export default () => (
  <Layout>
    <Login />
    <Register />
  </Layout>
);
