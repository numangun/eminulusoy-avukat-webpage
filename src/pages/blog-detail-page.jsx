import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Image, Spinner } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import useFormatContent from "../hooks/use-format-content";
import RecentPostsSidebar from "../components/blogs/recent-posts-sidebar";
import { getTitleSlug } from "../utils/slugify";
import "./blog-detail-page.scss";
import MainMenu from "../components/common/main-menu";
import Footer from "../components/common/footer";
import PageHeader from "../components/common/page-header";
import { FaAngleRight } from "react-icons/fa";
import { getOneBlogBySlug } from "../api/blog-service";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
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

        // Tüm blogları gez ve başlıklarına göre slug oluştur
        const blogWithGeneratedSlugs = blogs.map((blog) => ({
          ...blog,
          generatedSlug: getTitleSlug(blog.title),
        }));

        // Hem backend slug'ı hem de generated slug ile karşılaştır
        const foundBlog = blogWithGeneratedSlugs.find(
          (blog) => blog.slug === slug || blog.generatedSlug === slug
        );

        if (!foundBlog) {
          setError("Blog yazısı bulunamadı");
        } else {
          setBlog(foundBlog);
          setBlogs(blogs);

          // Eğer blog bulunduysa ve URL, oluşturulan slug ile eşleşmiyorsa
          // doğru URL'ye yönlendir
          const correctSlug = getTitleSlug(foundBlog.title);
          if (slug !== correctSlug) {
            navigate(`/blog/${correctSlug}`, { replace: true });
          }
        }
      })
      .catch((error) => {
        console.error("Blog çekilirken hata oluştu!", error);
        setError(
          "Blog verileri yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, navigate]);

  // Tarih formatı güvenli fonksiyon
  const formatDate = (dateString) => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return format(date, "dd MMMM yyyy", { locale: tr });
    } catch (error) {
      console.error("Tarih format hatası:", error);
      return "";
    }
  };

  // Blog için tarih bilgisini alma
  const getBlogDate = (blog) => {
    if (blog.created_at) {
      return formatDate(blog.created_at);
    } else if (blog.createdAt) {
      return formatDate(blog.createdAt);
    }
    return "";
  };

  // SEO için description hazırlama
  const getMetaDescription = (blog) => {
    if (!blog) return "";

    // Özet varsa onu kullanalım
    if (blog.summary) return blog.summary;

    // Detay içeriğinden kısa bir özet oluşturalım (HTML etiketlerini temizleyerek)
    if (blog.detail) {
      const cleanDetail = blog.detail.replace(/<[^>]*>?/gm, "");
      // İlk 160 karakteri alıp sonuna üç nokta ekleyelim
      return cleanDetail.length > 160
        ? cleanDetail.substring(0, 157) + "..."
        : cleanDetail;
    }

    return `${blog.title} - Avukat Emin Ulusoy Hukuk Bürosu`;
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
    <>
      <Helmet>
        <title>{`${blog.title} - Avukat Emin Ulusoy`}</title>
        <meta name="description" content={getMetaDescription(blog)} />
        <meta
          name="keywords"
          content={`avukat, hukuk, istanbul avukat, emin ulusoy, ${blog.title.toLowerCase()}`}
        />
        <meta
          property="og:title"
          content={`${blog.title} - Avukat Emin Ulusoy`}
        />
        <meta property="og:description" content={getMetaDescription(blog)} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://www.eminulusoy.com/blog/${getTitleSlug(
            blog.title
          )}`}
        />
        {blog.image && (
          <meta
            property="og:image"
            content={`http://localhost:3001${blog.image}`}
          />
        )}
        <meta
          property="article:published_time"
          content={blog.created_at || blog.createdAt}
        />
        <link
          rel="canonical"
          href={`https://www.eminulusoy.com/blog/${getTitleSlug(blog.title)}`}
        />
      </Helmet>
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
                    {getBlogDate(blog)}
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

          <Col lg={4} className="sidebar">
            <div className="sticky-sidebar">
              <RecentPostsSidebar
                blogs={blogs}
                currentBlogSlug={slug}
                formatDate={formatDate}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogDetailPage;
