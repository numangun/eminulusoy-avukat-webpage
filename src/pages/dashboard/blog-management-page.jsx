import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllBlogs,
  deleteBlog,
  updateBlog,
} from "../../store/slices/blog-slice";
import { Table, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogManagementPage = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const handleToggleActive = (id, isActive) => {
    const updatedBlog = blogs.find((blog) => blog._id === id);
    if (updatedBlog) {
      dispatch(
        updateBlog({ id, blog: { ...updatedBlog, isActive: !isActive } })
      );
    }
  };

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Başlık</th>
          <th>Özet</th>
          <th>Görsel</th>
          <th>Aktif</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog._id}>
            <td>{blog.title}</td>
            <td>{blog.summary}</td>
            <td>
              {blog.image && (
                <img
                  src={`http://localhost:3001${blog.image}`}
                  alt={blog.title}
                  width="100"
                />
              )}
            </td>
            <td>
              <Form.Check
                type="switch"
                id={`active-switch-${blog._id}`}
                checked={blog.isActive}
                onChange={() => handleToggleActive(blog._id, blog.isActive)}
              />
            </td>
            <td>
              <Link to={`/admin/blog-ekle/${blog._id}`}>
                <Button variant="warning">Düzenle</Button>
              </Link>
              <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                Sil
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogManagementPage;
