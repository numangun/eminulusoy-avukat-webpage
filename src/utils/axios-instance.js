import axios from "axios";

// API URL'ini dinamik olarak belirle
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Plesk subdomain kullanımı
const getAPIURL = () => {
  // Eğer API_URL'de port belirtilmemişse (muhtemelen production ortamı)
  if (!API_URL.includes("localhost") && !API_URL.includes(":")) {
    // api.domain.com şeklinde yapılandır
    if (window.location.hostname !== "localhost") {
      return `https://api.${window.location.hostname}`;
    }
  }
  return API_URL;
};

const FINAL_API_URL = getAPIURL();

// Hata ayıklama için API URL'ini konsola yazdır
console.log("API_URL:", FINAL_API_URL);

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: FINAL_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// İstek interceptor ekle
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`API Request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Yanıt interceptor ekle
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`API Response from: ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error("API Response Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
