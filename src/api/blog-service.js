import axiosInstance from "../utils/axios-instance";

// API URL'ini dinamik olarak belirle
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Plesk subdomain kullanımı
const getAPIURL = () => {
  // Eğer API_URL'de port belirtilmemişse (muhtemelen production ortamı)
  if (!API_URL.includes("localhost") && !API_URL.includes(":")) {
    // apisi.domain.com şeklinde yapılandır
    if (window.location.hostname !== "localhost") {
      return `https://api.${window.location.hostname}`;
    }
  }
  return API_URL;
};

const FINAL_API_URL = getAPIURL();

// Hata ayıklama için API URL'ini konsola yazdır
console.log("API_URL:", FINAL_API_URL);

// Fallback veriler için statik JSON dosyaları
const FALLBACK_BLOGS_URL = "/api/blogs.json";

// Tüm blogları getir (sadece aktif olanlar)
export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/blogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs from API, using fallback:", error);
    try {
      // API'den veri alınamazsa statik JSON dosyasını kullan
      const fallbackResponse = await fetch(FALLBACK_BLOGS_URL);
      const fallbackData = await fallbackResponse.json();
      return fallbackData;
    } catch (fallbackError) {
      console.error("Error fetching fallback data:", fallbackError);
      return [];
    }
  }
};

// Tüm blogları getir (admin için)
export const getAllBlogs = async () => {
  try {
    const response = await axiosInstance.get("/api/admin/blogs");
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    // Fallback olarak normal blog listesini kullan
    try {
      const blogs = await getBlogs();
      return blogs;
    } catch (fallbackError) {
      console.error("Error fetching fallback data:", fallbackError);
      return [];
    }
  }
};

// Slug'e göre blog getir
export const getOneBlogBySlug = async (slug) => {
  try {
    const blogs = await getBlogs();
    return blogs.find((blog) => blog.slug === slug);
  } catch (error) {
    console.error("Error finding blog by slug:", error);
    return null;
  }
};

// ID'ye göre blog getir
export const getBlogById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    return null;
  }
};

// Blog oluştur
export const createBlog = async (blogData) => {
  try {
    const response = await axiosInstance.post("/api/blogs", blogData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error;
  }
};

// Blog güncelle
export const updateBlog = async (id, blogData) => {
  try {
    const response = await axiosInstance.put(`/api/blogs/${id}`, blogData);
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Blog sil
export const deleteBlog = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

// Blog durumunu değiştir
export const toggleBlogStatus = async (id, isActive) => {
  try {
    const response = await axiosInstance.put(`/api/blogs/${id}/toggle-status`, {
      isActive,
    });
    return response.data;
  } catch (error) {
    console.error("Error toggling blog status:", error);
    throw error;
  }
};
