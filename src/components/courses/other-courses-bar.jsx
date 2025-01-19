import React from "react";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import courses from "../../helpers/data/courses.json";
import Spacer from "../common/spacer";
import "./other-courses-bar.scss";

const OtherCoursesBar = ({ currentSlug }) => {
  return (
    <div className="other-courses-bar">
      <Spacer />
      <h2>Diğer Çalışma Alanlarımız</h2>
      <ListGroup>
        {courses
          .filter((course) => course.slug !== currentSlug)
          .map((course) => (
            <ListGroup.Item key={course.slug}>
              <Link to={`/calisma-alanlarimiz/${course.slug}`}>
                {course.title}
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default OtherCoursesBar;
