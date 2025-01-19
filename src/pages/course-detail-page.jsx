import React from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import CourseDetail from "../components/courses/course-detail";
import OtherCoursesBar from "../components/courses/other-courses-bar";
import PageHeader from "../components/common/page-header";
import courses from "../helpers/data/courses.json";

const CourseDetailPage = () => {
  const { slug } = useParams();
  const course = courses.find((course) => course.slug === slug);

  if (!course) {
    return <div>Course not found</div>;
  }

  const formattedDesc = course.desc
    ? course.desc
        .split("\n")
        .map((line, index) => `<p key=${index}>${line}</p>`)
        .join("")
    : "";

  // Başlığı doğru şekilde formatlamak için
  const formatTitle = (title) => {
    return title.replace(/i/g, "İ").replace(/I/g, "ı").toUpperCase();
  };

  return (
    <>
      <PageHeader title={formatTitle(course.title)} />
      <Container>
        <Row>
          <Col md={8}>
            <CourseDetail course={course} formattedDesc={formattedDesc} />
          </Col>
          <Col md={4}>
            <OtherCoursesBar currentSlug={slug} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CourseDetailPage;
