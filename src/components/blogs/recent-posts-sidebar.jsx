import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { getTitleSlug } from "../../utils/slugify";
import "./recent-posts-sidebar.scss";

const RecentPostsSidebar = ({ blogs, currentBlogSlug, formatDate }) => {
  // Son eklenen 7 blog yazısını al ve tarihe göre sırala
  const recentBlogs = blogs
    .filter((blog) => blog.slug !== currentBlogSlug) // Mevcut blogu hariç tut
    .sort((a, b) => {
      // Tarih alanlarını kontrol et
      const dateA = a.created_at || a.createdAt || "";
      const dateB = b.created_at || b.createdAt || "";
      // Yeni tarihten eskiye sırala
      return new Date(dateB) - new Date(dateA);
    })
    .slice(0, 7); // İlk 7 blogu al

  // Tarih formatını güvenli hale getiren yardımcı fonksiyon
  const getFormattedDate = (blog) => {
    if (blog.created_at) {
      return formatDate(blog.created_at);
    } else if (blog.createdAt) {
      return formatDate(blog.createdAt);
    }
    return "";
  };

  return (
    <Card className="sidebar-card">
      <Card.Header>Son Eklenen Yazılar</Card.Header>
      <Card.Body>
        <ul className="recent-posts-list">
          {recentBlogs.map((blog) => (
            <li key={blog._id} className="recent-post-item">
              <Link
                to={`/blog/${getTitleSlug(blog.title)}`}
                className="recent-post-link"
              >
                <div className="recent-post-img-container">
                  {blog.image && (
                    <img
                      src={`http://localhost:3001${blog.image}`}
                      alt={blog.title}
                      className="recent-post-img"
                    />
                  )}
                </div>
                <div className="recent-post-content">
                  <h6 className="recent-post-title">{blog.title}</h6>
                  <div className="recent-post-date">
                    <i className="far fa-calendar-alt"></i>
                    {getFormattedDate(blog)}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default RecentPostsSidebar;
