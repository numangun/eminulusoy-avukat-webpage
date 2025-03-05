import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import courses from "../../helpers/data/courses.json";
import CourseCard from "../courses/course-card";
import { Link } from "react-router-dom";
import "./featured-courses.scss";

const featuredCourses = courses.slice(
  0,
  8
); /* courses.filter((item) => item.featured); */

const FeaturedCourses = () => {
  return (
    <div className="featured-courses">
      <h2>Çalışma Alanlarımız</h2>

      <Container>
        <Row className="g-5" xs={1} sm={2} md={3} lg={4}>
          {featuredCourses.map((item) => (
            <Col key={item.id}>
              <CourseCard {...item} />
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4">
          <Link to="/calisma-alanlarimiz">
            <Button variant="primary">Tümünü Gör</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default FeaturedCourses;
