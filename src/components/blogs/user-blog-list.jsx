import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../store/slices/blog-slice";
import { Row, Col, Card, Container, Pagination } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { tr } from "date-fns/locale/tr";
import { getTitleSlug } from "../../utils/slugify";
import "./user-blog-list.scss"; // CSS dosyasını import edin

const UserBlogList = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(parseInt(pageNumber) || 1);
  const blogsPerPage = 9;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // URL page değişikliğini izle
  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber));
    }
  }, [pageNumber]);

  // Blogları tarihe göre en yeniden en eskiye sıralama
  const sortedBlogs = blogs
    ? [...blogs].sort((a, b) => {
        const dateA = a.created_at || a.createdAt || "";
        const dateB = b.created_at || b.createdAt || "";
        return new Date(dateB) - new Date(dateA);
      })
    : [];

  // Sayfalama için blogları böl
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs =
    sortedBlogs?.slice(indexOfFirstBlog, indexOfLastBlog) || [];
  const totalPages = Math.ceil((blogs?.length || 0) / blogsPerPage);

  // Son eklenen blogları al ve tarihe göre sırala
  const recentBlogs = blogs
    ? [...blogs]
        .sort((a, b) => {
          // Tarih alanlarını kontrol et
          const dateA = a.created_at || a.createdAt || "";
          const dateB = b.created_at || b.createdAt || "";
          // Yeni tarihten eskiye sırala
          return new Date(dateB) - new Date(dateA);
        })
        .slice(0, 7) // İlk 7 blog
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber === 1) {
      navigate(`/blog`); // İlk sayfa için sadece /blog
    } else {
      navigate(`/blog/sayfa/${pageNumber}`); // Diğer sayfalar için /blog/sayfa/2 gibi
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">Yükleniyor...</div>
      </Container>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <Container className="py-4">
        <div className="text-center">
          Daha sonra buraya blog yazılarımız eklenecektir.
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row className="blog-row">
        {/* Ana Blog Listesi */}
        <Col lg={9} className="main-content-column">
          <div lassName="blog-content-wrapper">
            <Row>
              {currentBlogs.map((blog) => (
                <Col md={4} key={blog._id} className="mb-4">
                  <Card className="blog-card h-100">
                    <div className="date-overlay">
                      <span className="day">
                        {blog.created_at
                          ? format(new Date(blog.created_at), "d")
                          : blog.createdAt
                          ? format(new Date(blog.createdAt), "d")
                          : format(new Date(), "d")}
                      </span>
                      <span className="month">
                        {blog.created_at
                          ? format(new Date(blog.created_at), "MMMM", {
                              locale: tr,
                            })
                              .toUpperCase()
                              .replace("I", "İ")
                          : blog.createdAt
                          ? format(new Date(blog.createdAt), "MMMM", {
                              locale: tr,
                            })
                              .toUpperCase()
                              .replace("I", "İ")
                          : format(new Date(), "MMMM", { locale: tr })
                              .toUpperCase()
                              .replace("I", "İ")}
                      </span>
                      <span className="year">
                        {blog.created_at
                          ? format(new Date(blog.created_at), "yyyy")
                          : blog.createdAt
                          ? format(new Date(blog.createdAt), "yyyy")
                          : format(new Date(), "yyyy")}
                      </span>
                    </div>
                    {blog.image && (
                      <Card.Img
                        variant="top"
                        src={`http://localhost:3001${blog.image}`}
                        alt={blog.title}
                        className="blog-image"
                      />
                    )}
                    <Card.Body>
                      <Card.Title>{blog.title}</Card.Title>
                      <Card.Text className="text-truncate-3">
                        {blog.summary}
                      </Card.Text>
                      <Link
                        to={`/blog/${getTitleSlug(blog.title)}`}
                        className="btn btn-primary"
                      >
                        Devamını Oku
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>

          {/* Sayfalama */}
          <div className="pagination-wrapper">
            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination>
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Pagination.Item>
                    )
                  )}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </Pagination>
              </div>
            )}
          </div>
        </Col>

        {/* Son Eklenen Blog Yazıları Sidebar */}
        <Col lg={3} className="d-none d-lg-block sidebar-column">
          <div className="sticky-sidebar">
            <Card className="mb-4 sidebar-card">
              <Card.Header className="bg-primary text-white">
                Son Eklenen Yazılar
              </Card.Header>
              <Card.Body>
                <ul className="list-unstyled recent-posts">
                  {recentBlogs.map((blog) => (
                    <li key={blog._id} className="mb-3">
                      <Link
                        to={`/blog/${getTitleSlug(blog.title)}`}
                        className="text-decoration-none"
                      >
                        <div className="d-flex align-items-center">
                          {blog.image && (
                            <img
                              src={`http://localhost:3001${blog.image}`}
                              alt={blog.title}
                              className="recent-post-image me-2"
                            />
                          )}
                          <div>
                            <h6 className="mb-0">{blog.title}</h6>
                            <small className="text-muted">
                              {blog.created_at
                                ? format(
                                    new Date(blog.created_at),
                                    "dd MMMM yyyy",
                                    {
                                      locale: tr,
                                    }
                                  )
                                : blog.createdAt
                                ? format(
                                    new Date(blog.createdAt),
                                    "dd MMMM yyyy",
                                    {
                                      locale: tr,
                                    }
                                  )
                                : ""}
                            </small>
                          </div>
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

export default UserBlogList;
