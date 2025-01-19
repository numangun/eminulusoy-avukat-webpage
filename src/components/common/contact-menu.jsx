import React from "react";
import { Nav } from "react-bootstrap";
import { config } from "../../helpers/config";
import { FaPhone, FaEnvelope, FaLocationArrow } from "react-icons/fa";
import "./contact-menu.scss";

const ContactMenu = (props) => {
  return (
    <Nav {...props}>
      <Nav.Link href={`tel:${config.contact.phone1}`}>
        <FaPhone /> {config.contact.phone1}
      </Nav.Link>
      <Nav.Link as="span" className="nav-link">
        <FaEnvelope /> {config.contact.email}
      </Nav.Link>
      <Nav.Link href={config.contact.mapURL} target="_blank">
        <FaLocationArrow /> {config.contact.address}
      </Nav.Link>
    </Nav>
  );
};

export default ContactMenu;
