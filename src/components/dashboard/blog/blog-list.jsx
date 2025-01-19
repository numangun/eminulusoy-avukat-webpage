import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, "-");
  };

  return (
    <Container>
      <Row>
        {blogs.map((blog) => (
          <Col key={blog.id} md={4}>
            <Card>
              {blog.image && (
                <Card.Img variant="top" src={URL.createObjectURL(blog.image)} />
              )}
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content.substring(0, 100)}...</Card.Text>
                <Link to={`/blogs/${generateSlug(blog.title)}`}>Read More</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogList;
