import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, deleteBlog } from "../../store/slices/blog-slice";
import { Table, Button } from "react-bootstrap";

const AdminBlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id));
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((blog) => (
          <tr key={blog._id}>
            <td>{blog.title}</td>
            <td>{blog.content}</td>
            <td>
              {blog.image && (
                <img src={blog.image} alt={blog.title} width="100" />
              )}
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

export default AdminBlogList;
