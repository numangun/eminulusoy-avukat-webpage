import React from "react";
import { Carousel, Image } from "react-bootstrap";
import slides from "../../helpers/data/slider.json";
import "./slider.scss";

const Slider = () => {
  const slide = slides[0]; // İlk ve tek fotoğrafı al

  return (
    <Carousel fade className="slider">
      <Carousel.Item>
        <Image
          src={`/images/slider/${slide.image}`}
          alt={slide.title}
          className="d-block w-100"
        />
        <Carousel.Caption>
          <h3>{slide.title}</h3>
          <p>{slide.desc}</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
