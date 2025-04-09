import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaBlog, FaUsers, FaCog } from "react-icons/fa";
import LogoutButton from "../../components/common/logout-button";

const AdminPage = () => {
  const navigate = useNavigate();

  const handleBlogManagementClick = () => {
    navigate("/admin/blog-yonetimi");
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Paneli</h2>
        <LogoutButton />
      </div>

      <Row className="g-4">
        <Col md={4}>
          <Card
            className="h-100 shadow-sm hover-card cursor-pointer"
            onClick={handleBlogManagementClick}
          >
            <Card.Body className="text-center">
              <FaBlog size={48} className="mb-3 text-primary" />
              <h4>Blog Yönetimi</h4>
              <p className="text-muted">
                Blog yazılarını ekleyin, düzenleyin ve yönetin
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="text-center">
              <FaUsers size={48} className="mb-3 text-primary" />
              <h4>Kullanıcı Yönetimi</h4>
              <p className="text-muted">
                Kullanıcıları yönetin ve yetkilendirin
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="h-100 shadow-sm hover-card">
            <Card.Body className="text-center">
              <FaCog size={48} className="mb-3 text-primary" />
              <h4>Ayarlar</h4>
              <p className="text-muted">Site ayarlarını yapılandırın</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
