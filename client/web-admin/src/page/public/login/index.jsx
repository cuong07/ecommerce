import React from "react";
import Layout from "../../Layout";
import Login from "./Login";

const index = () => {
  return (
    <Layout hiddenHeader={true} hiddenFooter={true} hiddenNavigate={true}>
      <Login />
    </Layout>
  );
};

export default index;
