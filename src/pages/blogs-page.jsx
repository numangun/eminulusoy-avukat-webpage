import React from "react";
import { Helmet } from "react-helmet-async";
import UserBlogList from "../components/blogs/user-blog-list";
import Spacer from "../components/common/spacer";
import PageHeader from "../components/common/page-header";

const BlogsPage = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Avukat Emin Ulusoy | Hukuki Yazılar ve Makaleler</title>
        <meta
          name="description"
          content="Avukat Emin Ulusoy'un hukuki konularda yazıları, makaleleri ve güncel hukuki gelişmelere dair değerlendirmeleri. İş hukuku, aile hukuku, ceza hukuku ve gayrimenkul hukuku alanlarında bilgilendirici içerikler."
        />
        <meta
          name="keywords"
          content="hukuk blogu, avukat blog, hukuki makaleler, iş hukuku yazıları, aile hukuku yazıları, emin ulusoy yazıları, hukuki gelişmeler"
        />
        <meta
          property="og:title"
          content="Blog - Avukat Emin Ulusoy | Hukuki Yazılar"
        />
        <meta
          property="og:description"
          content="Avukat Emin Ulusoy'un hukuki konularda yazıları, makaleleri ve güncel hukuki gelişmelere dair değerlendirmeleri."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.eminulusoy.com/blog" />
        <link rel="canonical" href="https://www.eminulusoy.com/blog" />
      </Helmet>
      <PageHeader title="Blog" />
      <Spacer />
      <UserBlogList />
      <Spacer />
    </>
  );
};

export default BlogsPage;
