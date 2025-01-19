import React from "react";
import { Card } from "react-bootstrap";
import { FiClock, FiMapPin } from "react-icons/fi";
import "./blog-card.scss";

const BlogCard = ({ image, title, description }) => {
  return (
    <Card className="event-card">
      <Card.Body>
        <div className="image">
          <Card.Img src={`/images/events/${image}`} />
        </div>
        <Card.Subtitle>
          {/* <div>
            <Card.Title>{title}</Card.Title>
          </div> */}
          <div>
            <Card.Text>{description}</Card.Text>
          </div>
        </Card.Subtitle>

        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
