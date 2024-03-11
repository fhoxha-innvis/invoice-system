import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users } from "@heroicons/react/solid";
import Layout from "../components/layout/Layout";
import Starter from "../components/homepage/Starter";

const IndexPage = () => {
  return (
    <Layout>
      <Starter />
    </Layout>
  );
};

export default IndexPage;
