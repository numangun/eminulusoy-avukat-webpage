import React from "react";
import "./welcome.scss";
import { Col, Container, Image, Row } from "react-bootstrap";

const Welcome = () => {
  return (
    <div className="welcome">
      <Container>
        <Row className="g-5 align-items-center">
          <Col md={6}>
            <Image src="/images/about/welcome.jpg" className="img-fluid" />
          </Col>
          <Col md={6}>
            <h2>Hakkımızda</h2>
            <p>
              Av. Emin Ulusoy 2019 yılında İstanbul Üniversitesi Hukuk
              Fakültesi’nden Yüksek Onur öğrencisi olarak mezun olmuş, İstanbul
              Barosu nezdinde yasal stajını tamamlamıştır. Av. Emin Ulusoy 2020
              yılından beri İstanbul merkezli olarak Türkiye genelinde avukatlık
              ve hukuki danışmanlık hizmeti vermektedir. Av. Emin Ulusoy,
              uygulamaya yönelik güncel tecrübesi ve bilgi birikimi ile
              müvekkilleri aleyhine ortaya çıkabilecek ve onlara zarar
              verebilecek hukuki risklerin azaltılmasına yönelik hukuki
              danışmanlık hizmeti verdiği gibi hukuki uyuşmazlık ortaya
              çıktıktan sonra müvekkilleri lehine en faydalı sonucu en hızlı
              şekilde almak için avukatlık hizmeti sunmaktadır.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Welcome;
