import React from "react";
import ContactMenu from "../common/contact-menu";
import "./get-in-touch.scss";

const GetInTouch = () => {
  return (
    <div className="get-in-touch">
      <h2>Bize Ulaşın</h2>

      <ContactMenu className="flex-column" />
    </div>
  );
};

export default GetInTouch;
