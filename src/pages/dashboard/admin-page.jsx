import React from "react";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import NewBlogForm from "../../components/dashboard/blog/new-blog-form";
import AdminBlogList from "../../components/blogs/admin-blog-list";
import LogoutButton from "../../components/common/logout-button";

const AdminPage = () => {
  return (
    <>
      <PageHeader title="Admin" />
      <LogoutButton />
      <Spacer />

      <NewBlogForm />
      <Spacer />

      <AdminBlogList />
      <Spacer />
    </>
  );
};

export default AdminPage;
