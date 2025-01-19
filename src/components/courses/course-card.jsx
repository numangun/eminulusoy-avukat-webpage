import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./course-card.scss";

const CourseCard = ({ slug, image, title }) => {
  return (
    <Card className="course-card">
      <Link to={`/calisma-alanlarimiz/${slug}`}>
        <Card.Body>
          <div className="image">
            <Card.Img src={`/images/courses/${image}`} />
          </div>

          <Card.Title>{title}</Card.Title>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default CourseCard;
