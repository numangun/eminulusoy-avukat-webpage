import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "./blog-detail-page.scss"; // CSS dosyasını import edin

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/blogs")
      .then((response) => {
        const blogs = response.data;
        const foundBlog = blogs.find((b) => b.slug === slug);
        setBlog(foundBlog);
      })
      .catch((error) => {
        console.error("There was an error fetching the blog!", error);
      });
  }, [slug]);

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
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
              <Card.Text>{blog.detail}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetailPage;
