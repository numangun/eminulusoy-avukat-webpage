import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Spacer from "../common/spacer";
import "./course-detail.scss"; // SCSS dosyasını import edin

const CourseDetail = ({ course, formattedDesc }) => {
  return (
    <div className="course-detail">
      <Spacer />
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="text-center">{course.title}</h1>
            <div className="text-center">
              <img
                src={`/images/courses/${course.image}`}
                alt={course.title}
                className="course-image"
              />
            </div>
            <div
              className="course-description"
              dangerouslySetInnerHTML={{ __html: formattedDesc }}
            ></div>
          </Col>
        </Row>
      </Container>
      <Spacer />
    </div>
  );
};

export default CourseDetail;
