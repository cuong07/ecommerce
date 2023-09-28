import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../../Layout';
import NotFound from './NotFound';

function Index(props) {
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
}

Index.propTypes = {};

export default Index;
