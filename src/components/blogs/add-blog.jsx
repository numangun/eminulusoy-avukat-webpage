import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, updateBlog } from "../../store/slices/blog-slice";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const AddBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs);
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
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", formData.title);
    blogData.append("summary", formData.summary);
    blogData.append("detail", formData.detail);
    blogData.append("isActive", formData.isActive ? "true" : "false");
    if (formData.image) {
      blogData.append("image", formData.image);
    }

    if (id) {
      dispatch(updateBlog({ id, blog: blogData })).then(() =>
        navigate("/admin/blog-yonetimi")
      );
    } else {
      dispatch(addBlog(blogData)).then(() => navigate("/admin/blog-yonetimi"));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Başlık</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="summary">
        <Form.Label>Özet</Form.Label>
        <Form.Control
          type="text"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="detail">
        <Form.Label>Detay</Form.Label>
        <Form.Control
          as="textarea"
          name="detail"
          value={formData.detail}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Görsel</Form.Label>
        <Form.Control type="file" name="image" onChange={handleFileChange} />
      </Form.Group>
      <Form.Group controlId="isActive">
        <Form.Check
          type="checkbox"
          name="isActive"
          label="Aktif"
          checked={formData.isActive}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {id ? "Güncelle" : "Ekle"}
      </Button>
    </Form>
  );
};

export default AddBlog;
