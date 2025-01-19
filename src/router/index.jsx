import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import HomePage from "../pages/home-page";
import CoursesPage from "../pages/courses-page";
import CourseDetailPage from "../pages/course-detail-page";
import BlogsPage from "../pages/blogs-page";
import BlogDetailPage from "../pages/blog-detail-page";
import AboutPage from "../pages/about-page";
import ContactPage from "../pages/contact-page";
import LoginPage from "../pages/login-page";
import AdminPage from "../pages/dashboard/admin-page";
import BlogManagementPage from "../pages/dashboard/blog-management-page";
import AddBlog from "../components/blogs/add-blog";
import PrivateRoute from "./private-route";
import Error403Page from "../pages/errors/error403-page";
import Error404Page from "../pages/errors/error404-page";
import NewBlogForm from "../components/dashboard/blog/new-blog-form";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "hakkimizda",
        element: <AboutPage />,
      },
      {
        path: "calisma-alanlarimiz",
        element: <CoursesPage />,
      },
      {
        path: "calisma-alanlarimiz/:slug",
        element: <CourseDetailPage />,
      },
      {
        path: "blog",
        element: <BlogsPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetailPage />,
      },
      {
        path: "iletisim",
        element: <ContactPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "admin",
        element: (
          <PrivateRoute roles={["admin"]}>
            <AdminPage />
          </PrivateRoute>
        ),
        children: [
          {
            path: "blog-yonetimi",
            element: (
              <PrivateRoute roles={["admin"]}>
                <BlogManagementPage />
              </PrivateRoute>
            ),
          },
          {
            path: "blog-ekle",
            element: (
              <PrivateRoute roles={["admin"]}>
                <NewBlogForm />
              </PrivateRoute>
            ),
          },
          {
            path: "blog-ekle/:id",
            element: (
              <PrivateRoute roles={["admin"]}>
                <NewBlogForm />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "dashboard/blog-management",
        element: (
          <PrivateRoute roles={["admin"]}>
            <BlogManagementPage />
          </PrivateRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <Error403Page />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
