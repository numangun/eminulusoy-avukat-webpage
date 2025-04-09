import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, updateBlog } from "../../../store/slices/blog-slice";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Alert, Image, Container, Card } from "react-bootstrap";

const NewBlogForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs.blogs);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    detail: "",
    image: null,
    isActive: true,
  });

  useEffect(() => {
    if (id) {
      const blog = blogs.find((b) => b._id === id);
      if (blog) {
        setFormData({
          title: blog.title,
          summary: blog.summary,
          detail: blog.detail,
          image: blog.image,
          isActive: blog.isActive,
        });
        // Eğer mevcut bir resim varsa preview'ı ayarla
        if (blog.image) {
          setImagePreview(`http://localhost:3001${blog.image}`);
        }
      }
    }
  }, [id, blogs]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
      // Seçilen resmin önizlemesini göster
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!formData.image && !id) {
      setError("Lütfen bir görsel seçiniz");
      return;
    }

    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("summary", formData.summary);
    blogData.append("detail", formData.detail);
    blogData.append("isActive", formData.isActive);

    // Resim kontrolü ve ekleme
    if (formData.image instanceof File) {
      blogData.append("image", formData.image);
    } else if (id && typeof formData.image === "string") {
      // Güncelleme durumunda ve resim değişmediyse mevcut resim yolunu gönder
      const imagePath = formData.image.startsWith("/")
        ? formData.image
        : `/${formData.image}`;
      blogData.append("image", imagePath);
    }

    const action = id
      ? updateBlog({ id, blog: blogData })
      : createBlog(blogData);

    dispatch(action)
      .unwrap()
      .then(() => {
        console.log("Blog işlemi başarılı");
        navigate("/admin/blog-yonetimi");
      })
      .catch((err) => {
        console.error("Blog işlemi hatası:", err);
        const errorMessage =
          typeof err === "string" ? err : err?.message || JSON.stringify(err);
        setError(`İşlem başarısız: ${errorMessage}`);
      });
  };

  return (
    <Container className="py-4">
      <Card>
        <Card.Header as="h4" className="bg-primary text-white">
          {id ? "Blog Yazısını Düzenle" : "Yeni Blog Yazısı Ekle"}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Başlık</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Blog başlığını giriniz"
              />
            </Form.Group>

            <Form.Group controlId="summary" className="mb-3">
              <Form.Label>Özet</Form.Label>
              <Form.Control
                type="text"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                required
                placeholder="Blog özetini giriniz"
              />
            </Form.Group>

            <Form.Group controlId="detail" className="mb-3">
              <Form.Label>Detay</Form.Label>
              <Form.Control
                as="textarea"
                name="detail"
                value={formData.detail}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Blog içeriğini giriniz"
              />
            </Form.Group>

            <Form.Group controlId="image" className="mb-3">
              <Form.Label className="d-block">
                Görsel {!id && <span className="text-danger">*</span>}
              </Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required={!id}
                className="mb-2"
              />
              {imagePreview && (
                <div className="mt-2 border p-2 rounded">
                  <p className="mb-2">Seçilen Görsel:</p>
                  <Image
                    src={imagePreview}
                    alt="Seçilen görsel"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                    }}
                    thumbnail
                  />
                </div>
              )}
            </Form.Group>

            <Form.Group controlId="isActive" className="mb-3">
              <Form.Check
                type="switch"
                name="isActive"
                label="Aktif"
                checked={formData.isActive}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => navigate("/admin/blog-yonetimi")}
              >
                İptal
              </Button>
              <Button variant="primary" type="submit">
                {id ? "Güncelle" : "Kaydet"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewBlogForm;
