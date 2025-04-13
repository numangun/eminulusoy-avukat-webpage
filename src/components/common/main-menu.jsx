import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { config } from "../../helpers/config";

const MainMenu = (props) => {
  return (
    <Nav {...props}>
      <Nav.Link as={Link} to="/">
        {/* <AiOutlineHome /> */} ANASAYFA
      </Nav.Link>
      <Nav.Link as={Link} to="/hakkimizda">
        {/* <AiOutlineInfoCircle /> */} HAKKIMIZDA
      </Nav.Link>
      <Nav.Link as={Link} to="/calisma-alanlarimiz">
        {/* <AiFillForward /> */} ÇALIŞMA ALANLARIMIZ
      </Nav.Link>
      <Nav.Link as={Link} to="/blog">
        {/* <AiOutlineCalendar /> */} BLOG
      </Nav.Link>

      <Nav.Link as={Link} to="/iletisim">
        {/* <AiOutlineAliwangwang /> */} İLETİŞİM
      </Nav.Link>
    </Nav>
  );
};

export default MainMenu;
