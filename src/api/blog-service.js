import axios from "axios";

// API URL'ini dinamik olarak belirle
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Tüm blogları getir (sadece aktif olanlar)
export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/api/blogs`);
  return response.data;
};

// Tüm blogları getir (admin için)
export const getAllBlogs = async () => {
  const response = await axios.get(`${API_URL}/api/admin/blogs`);
  return response.data;
};

// Slug'e göre blog getir
export const getOneBlogBySlug = async (slug) => {
  const blogs = await getBlogs();
  return blogs.find((blog) => blog.slug === slug);
};

// ID'ye göre blog getir
export const getBlogById = async (id) => {
  const response = await axios.get(`${API_URL}/api/blogs/${id}`);
  return response.data;
};

// Blog oluştur
export const createBlog = async (blogData) => {
  const response = await axios.post(`${API_URL}/api/blogs`, blogData);
  return response.data;
};

// Blog güncelle
export const updateBlog = async (id, blogData) => {
  const response = await axios.put(`${API_URL}/api/blogs/${id}`, blogData);
  return response.data;
};

// Blog sil
export const deleteBlog = async (id) => {
  const response = await axios.delete(`${API_URL}/api/blogs/${id}`);
  return response.data;
};

// Blog durumunu değiştir
export const toggleBlogStatus = async (id, isActive) => {
  const response = await axios.put(`${API_URL}/api/blogs/${id}/toggle-status`, {
    isActive,
  });
  return response.data;
};
