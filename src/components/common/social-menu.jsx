import React from "react";
import { Nav } from "react-bootstrap";
import { config } from "../../helpers/config";

const SocialMenu = (props) => {
  return (
    <Nav {...props}>
      <Nav.Link href={config.contact.socialMedia.resmi_gazete} target="_blank">
        Resmi Gazete
      </Nav.Link>
      <Nav.Link
        href={config.contact.socialMedia.mevzuat_bilgi_sistemi}
        target="_blank"
      >
        Mevzuat Bilgi Sistemi
      </Nav.Link>
      <Nav.Link
        href={config.contact.socialMedia.adalet_bakanligi}
        target="_blank"
      >
        T.C. Adalet Bakanlığı
      </Nav.Link>
      <Nav.Link
        href={config.contact.socialMedia.anayasa_mahkemesi}
        target="_blank"
      >
        Anayasa Mahkemesi
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.yargitay} target="_blank">
        Yargıtay
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.danistay} target="_blank">
        Danıştay
      </Nav.Link>
      <Nav.Link href={config.contact.socialMedia.tbb} target="_blank">
        Türkiye Barolar Birliği
      </Nav.Link>
      <Nav.Link
        href={config.contact.socialMedia.istanbul_barosu}
        target="_blank"
      >
        İstanbul Barosu
      </Nav.Link>
    </Nav>
  );
};

export default SocialMenu;
