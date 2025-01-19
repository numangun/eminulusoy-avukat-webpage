import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllBlogs,
  deleteBlog,
  toggleBlogStatus,
} from "../../store/slices/blog-slice";
import { Table, Button, Form } from "react-bootstrap";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllBlogs()); // Admin için tüm blogları getir
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
  };

  const handleToggleActive = (id, isActive) => {
    dispatch(toggleBlogStatus({ id, isActive: !isActive }));
  };

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Image</th>
          <th>Active</th>
          <th>Actions</th>
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
              <Button variant="danger" onClick={() => handleDelete(blog._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BlogList;
