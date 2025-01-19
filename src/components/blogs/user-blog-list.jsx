import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../store/slices/blog-slice";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./user-blog-list.scss"; // CSS dosyasını import edin

const UserBlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (!blogs || blogs.length === 0) {
    return <div>Daha sonra buraya blog yazılarımız eklenecektir.</div>;
  }

  return (
    <Row>
      {blogs.map((blog) => (
        <Col md={4} key={blog._id}>
          <Card className="blog-card">
            <div className="date-overlay">
              {new Date(blog.date).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            {blog.image && (
              <Card.Img
                variant="top"
                src={`http://localhost:3001${blog.image}`}
              />
            )}
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text>{blog.summary}</Card.Text>
              <Link to={`/blog/${blog.slug}`}>Read More</Link>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default UserBlogList;
