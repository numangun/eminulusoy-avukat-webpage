import React from "react";
import { Helmet } from "react-helmet-async";
import Welcome from "../components/about/welcome";
import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Hakkımızda - Avukat Emin Ulusoy İstanbul Hukuk Bürosu</title>
        <meta
          name="description"
          content="Avukat Emin Ulusoy hakkında bilgi. İstanbul'da bulunan hukuk büromuz ve profesyonel ekibimizle müvekkillerimize en iyi hukuki danışmanlık ve temsil hizmetlerini sunuyoruz."
        />
        <meta
          name="keywords"
          content="avukat emin ulusoy, istanbul avukat, hukuk bürosu, avukat özgeçmiş, tecrübeli avukat, hukuk danışmanlığı"
        />
        <meta
          property="og:title"
          content="Hakkımızda - Avukat Emin Ulusoy İstanbul"
        />
        <meta
          property="og:description"
          content="Avukat Emin Ulusoy hakkında bilgi. İstanbul'da bulunan hukuk büromuz ve profesyonel ekibimizle müvekkillerimize en iyi hukuki danışmanlık hizmetlerini sunuyoruz."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.eminulusoy.com/hakkimizda"
        />
        <link rel="canonical" href="https://www.eminulusoy.com/hakkimizda" />
      </Helmet>
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
