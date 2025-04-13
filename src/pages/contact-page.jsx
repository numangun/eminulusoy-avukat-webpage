import React from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";
import Contact from "../components/contact";

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>
          İletişim - Avukat Emin Ulusoy | İstanbul Hukuk Bürosu İletişim
          Bilgileri
        </title>
        <meta
          name="description"
          content="Avukat Emin Ulusoy Hukuk Bürosu ile iletişime geçin. İstanbul'daki ofis adresimiz, telefon numaramız ve e-posta adresimiz. Hukuki danışmanlık için randevu alın."
        />
        <meta
          name="keywords"
          content="avukat iletişim, emin ulusoy iletişim, istanbul avukat telefon, hukuk bürosu adres, hukuki danışmanlık randevu"
        />
        <meta
          property="og:title"
          content="İletişim - Avukat Emin Ulusoy | İstanbul"
        />
        <meta
          property="og:description"
          content="Avukat Emin Ulusoy Hukuk Bürosu ile iletişime geçin. İstanbul'daki ofis adresimiz, telefon numaramız ve e-posta adresimiz."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.eminulusoy.com/iletisim" />
        <link rel="canonical" href="https://www.eminulusoy.com/iletisim" />
      </Helmet>
      <PageHeader title="BİZİMLE İLETİŞİME GEÇİN" />
      <Spacer />
      <Contact />
    </>
  );
};

export default ContactPage;
