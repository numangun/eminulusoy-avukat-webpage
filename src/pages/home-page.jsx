import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../components/home/slider";
import Welcome from "../components/about/welcome";
import Spacer from "../components/common/spacer";
import FeaturedCourses from "../components/home/featured-courses";
import UpcomingEvents from "../components/home/upcoming-events";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Avukat Emin Ulusoy - Ulusoy Hukuk Bürosu</title>
        <meta
          name="description"
          content="İstanbul'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri sunan Emin Ulusoy Hukuk Bürosu. İş, aile, ceza, icra ve gayrimenkul hukuku alanlarında uzman avukat."
        />
        <meta
          name="keywords"
          content="avukat, emin ulusoy, istanbul avukat, istanbul ulusoy hukuk bürosu, hukuk bürosu, ulusoy hukuk bürosu, hukuki danışmanlık, iş hukuku, aile hukuku, ceza hukuku, icra hukuku, gayrimenkul hukuku, avukat emin ulusoy, avukat emin ulusoy hukuk bürosu, avukat emin ulusoy hukuk bürosu, avukat emin ulusoy hukuki danışmanlık, avukat emin ulusoy iş hukuku, avukat emin ulusoy aile hukuku, avukat emin ulusoy ceza hukuku, avukat emin ulusoy icra hukuku, avukat emin ulusoy gayrimenkul hukuku"
        />
        <meta
          property="og:title"
          content="Avukat Emin Ulusoy - Ulusoy Hukuk Bürosu"
        />
        <meta
          property="og:description"
          content="İstanbul'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri sunan Ulusoy Hukuk Bürosu."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://eminulusoy.av.tr/" />
        <meta property="og:site_name" content="Avukat Emin Ulusoy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Avukat Emin Ulusoy - Ulusoy Hukuk Bürosu"
        />
        <meta
          name="twitter:description"
          content="İstanbul'da profesyonel hukuki danışmanlık ve avukatlık hizmetleri sunan Ulusoy Ulusoy Hukuk Bürosu."
        />
        <link rel="canonical" href="https://eminulusoy.av.tr/" />
      </Helmet>
      <Slider />
      <Spacer />
      <Welcome />
      <Spacer />
      <UpcomingEvents />
      <Spacer />
      <FeaturedCourses />
    </>
  );
};

export default HomePage;
