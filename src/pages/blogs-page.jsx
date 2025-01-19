import React from "react";
import UserBlogList from "../components/blogs/user-blog-list";
import Spacer from "../components/common/spacer";
import PageHeader from "../components/common/page-header";

const BlogsPage = () => {
  return (
    <>
      <PageHeader title="Makaleler" />
      <Spacer />
      <UserBlogList />
      <Spacer />
    </>
  );
};

export default BlogsPage;
