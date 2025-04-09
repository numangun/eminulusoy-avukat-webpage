import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import useFormatContent from "../hooks/use-format-content";
import "./blog-detail-page.scss";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook'u her zaman çağır - koşullu olmadan, bileşenin en üst seviyesinde
  // Null koruması hook içinde ele alınacak
  const formattedContent = useFormatContent(blog?.detail);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/api/blogs")
      .then((response) => {
        const blogs = response.data;
        const foundBlog = blogs.find((b) => b.slug === slug);

        if (!foundBlog) {
          setError("Blog yazısı bulunamadı");
        } else {
          setBlog(foundBlog);
        
        // Son eklenen 7 blog yazısını al
        const recent = blogs
          .filter(b => b.slug !== slug)
          .sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at) : new Date(0);
            const dateB = b.created_at ? new Date(b.created_at) : new Date(0);
            return dateB - dateA;
          })
          .slice(0, 7);
        setRecentBlogs(recent);
        }
      })
      .catch((error) => {
        console.error("Blog çekilirken hata oluştu!", error);
        setError("Blog verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  // Tarih formatı güvenli fonksiyon
  const formatDate = (dateString) => {
    try {
      if (!dateString) return format(new Date(), "dd MMMM yyyy", { locale: tr });
      return format(new Date(dateString), "dd MMMM yyyy", { locale: tr });
    } catch (error) {
      console.error("Tarih format hatası:", error);
      return format(new Date(), "dd MMMM yyyy", { locale: tr });
    }
  };

  // Loading durumu
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
        <p className="mt-3">Blog yazısı yükleniyor...</p>
      </Container>
    );
  }

  // Hata durumu
  if (error || !blog) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger">
          {error || "Blog yazısı bulunamadı"}
        </div>
      </Container>
    );
  }

  return (
    <Container className="blog-detail-container">
      <Row className="blog-detail-row">
        <Col lg={8}>
          <Card className="blog-detail-card">
            {/* Resim en üstte */}
            {blog.image && (
              <div className="blog-image-container">
                <img 
                  src={`http://localhost:3001${blog.image}`}
                  alt={blog.title}
                  className="blog-image"
                />
              </div>
            )}
            
            {/* Başlık ve tarih bilgisi resmin altında */}
            <div className="blog-header">
              <h1 className="blog-title">{blog.title}</h1>
              <div className="blog-meta">
                <span className="blog-date">
                  <i className="far fa-calendar-alt"></i>
                  {formatDate(blog.created_at)}
                </span>
              </div>
            </div>
            
            {/* İçerik kısmı - custom hook ile formatlanmış */}
            <div className="blog-content">
              <div 
                className="blog-detail" 
                dangerouslySetInnerHTML={{ __html: formattedContent }} 
              />
            </div>
          </Card>
        </Col>
        
        <Col lg={4}>
          <div className="sidebar sticky-sidebar">
            <Card className="sidebar-card">
              <Card.Header>Son Eklenen Yazılar</Card.Header>
              <Card.Body>
                <ul className="recent-posts-list">
                  {recentBlogs.map(recentBlog => (
                    <li key={recentBlog._id} className="recent-post-item">
                      <Link to={`/blog/${recentBlog.slug}`} className="recent-post-link">
                        <div className="recent-post-img-container">
                          {recentBlog.image && (
                            <img 
                              src={`http://localhost:3001${recentBlog.image}`} 
                              alt={recentBlog.title}
                              className="recent-post-img" 
                            />
                          )}
                        </div>
                        <div className="recent-post-content">
                          <h6 className="recent-post-title">{recentBlog.title}</h6>
                          <span className="recent-post-date">
                            {formatDate(recentBlog.created_at)}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetailPage;