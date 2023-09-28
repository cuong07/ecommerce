import React from "react";
import PropTypes from "prop-types";
import Layout from "../../../Layout";
import CreateProduct from "./CreateProduct";

const Index = (props) => {
  return (
    <Layout>
      <CreateProduct />
    </Layout>
  );
};

Index.propTypes = {};

export default Index;
