import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllBlogs,
  deleteBlog,
  updateBlog,
} from "../../store/slices/blog-slice";
import { Table, Button, Form, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { tr } from "date-fns/locale/tr";

const BlogManagementPage = () => {
  const { blogs, loading } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm("Bu blog yazısını silmek istediğinizden emin misiniz?")
    ) {
      dispatch(deleteBlog(id));
    }
  };

  const handleToggleActive = (id, isActive) => {
    const updatedBlog = blogs.find((blog) => blog._id === id);
    if (updatedBlog) {
      dispatch(
        updateBlog({ id, blog: { ...updatedBlog, isActive: !isActive } })
      );
    }
  };

  const handleAddBlog = () => {
    navigate("/admin/blog-ekle");
  };

  const handleEditBlog = (id) => {
    navigate(`/admin/blog-ekle/${id}`);
  };

  // Blogları tarihe göre sırala - en yeniden eskiye
  const sortedBlogs = blogs
    ? [...blogs].sort((a, b) => {
        const dateA = a.created_at || a.createdAt || "";
        const dateB = b.created_at || b.createdAt || "";
        return new Date(dateB) - new Date(dateA);
      })
    : [];

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
        <Card>
          <Card.Body>
            <h4 className="text-center">Henüz blog yazısı bulunmamaktadır.</h4>
            <div className="text-center mt-3">
              <Button variant="primary" onClick={handleAddBlog}>
                Yeni Blog Ekle
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Card>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Blog Yönetimi</h4>
          <Button variant="primary" onClick={handleAddBlog}>
            Yeni Blog Ekle
          </Button>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Başlık</th>
                <th>Özet</th>
                <th>Görsel</th>
                <th>Oluşturulma Tarihi</th>
                <th>Aktif</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {sortedBlogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.summary}</td>
                  <td>
                    {blog.image && (
                      <img
                        src={`http://localhost:3001${blog.image}`}
                        alt={blog.title}
                        width="100"
                        className="img-thumbnail"
                      />
                    )}
                  </td>
                  <td>
                    {blog.created_at
                      ? format(new Date(blog.created_at), "dd MMMM yyyy", {
                          locale: tr,
                        })
                      : blog.createdAt
                      ? format(new Date(blog.createdAt), "dd MMMM yyyy", {
                          locale: tr,
                        })
                      : "-"}
                  </td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`active-switch-${blog._id}`}
                      checked={blog.isActive}
                      onChange={() =>
                        handleToggleActive(blog._id, blog.isActive)
                      }
                      label={blog.isActive ? "Aktif" : "Pasif"}
                    />
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => handleEditBlog(blog._id)}
                      >
                        Düzenle
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Sil
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogManagementPage;
