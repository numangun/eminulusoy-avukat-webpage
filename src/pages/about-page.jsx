import React from "react";
import Welcome from "../components/about/welcome";
import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";

const AboutPage = () => {
  return (
    <>
      <PageHeader title="Hakkımızda" />
      <Spacer />
      <Welcome />
      <Spacer />
      {/* <Instructors /> */}
      <Spacer />
    </>
  );
};

export default AboutPage;
