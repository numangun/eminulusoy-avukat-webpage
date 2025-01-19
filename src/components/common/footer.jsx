import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { config } from "../../helpers/config";
import MainMenu from "./main-menu";
import "./footer.scss";
import SocialMenu from "./social-menu";
import ContactMenu from "./contact-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faTwitter } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="g-5">
          <Col lg={3}>
            <Link to="/">
              <Image
                src="/images/logo/logo.png"
                alt={config.project.name}
                className="logo"
              />
            </Link>
            <p>{config.project.description}</p>
            <div className="social-icons">
              <a
                href="https://wa.me/905533646133"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faWhatsapp} size="2x" />
              </a>
              <a
                href="https://x.com/aveminulusoy"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </div>
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h3>Hızlı Linkler</h3>
            <MainMenu className="flex-column" />
          </Col>
          <Col sm={6} md={4} lg={3}>
            <h3>Faydalı Linkler</h3>
            <SocialMenu className="flex-column" />
          </Col>
          <Col md={4} lg={3}>
            <h3>Bizimle İletişime Geçin</h3>
            <ContactMenu className="flex-column" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
