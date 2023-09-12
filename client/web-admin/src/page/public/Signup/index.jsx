import React from "react";
import Layout from "../../Layout";
import Signup from "./Signup";
const index = () => {
  return (
    <Layout hiddenHeader={true} hiddenFooter={true}>
      <Signup />
    </Layout>
  );
};

export default index;
