import axios from "axios";

// API URL'ini belirleyen fonksiyon
const getAPIURL = () => {
  // Öncelik sırası:
  // 1. .env'deki REACT_APP_API_URL değeri
  // 2. Ana domain ile aynı olan API URL (api.domain.com)
  // 3. Son çare olarak sabit bir URL

  // 1. .env'den gelen API URL
  const envApiUrl = process.env.REACT_APP_API_URL;
  if (envApiUrl) {
    console.log("Using API URL from env:", envApiUrl);
    return envApiUrl;
  }

  // 2. Mevcut domainin bir alt alanı olarak API URL
  if (window.location.hostname !== "localhost") {
    const apiSubdomain = `https://api.${window.location.hostname}`;
    console.log("Using API URL with subdomain:", apiSubdomain);
    return apiSubdomain;
  }

  // 3. Sabit adresler
  // Önce tam URL'i dene
  const primaryUrl = "https://eminulusoy.av.tr/api";
  console.log("Using fixed API URL:", primaryUrl);
  return primaryUrl;
};

const FINAL_API_URL = getAPIURL();

// Hata ayıklama için API URL'ini konsola yazdır
console.log("FINAL API_URL:", FINAL_API_URL);

// Axios instance oluştur
const axiosInstance = axios.create({
  baseURL: FINAL_API_URL,
  timeout: 15000, // Zaman aşımını uzattık
  headers: {
    "Content-Type": "application/json",
  },
});

// Hata yakalama ve retry işlevi
let retryCount = 0;
const MAX_RETRIES = 3;

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
    retryCount = 0; // Başarılı yanıtta reset
    return response;
  },
  async (error) => {
    if (retryCount < MAX_RETRIES && error.message.includes("timeout")) {
      retryCount++;
      console.log(`Retrying request (${retryCount}/${MAX_RETRIES})...`);
      return axiosInstance(error.config);
    }
    console.error("API Response Error:", error);
    return Promise.reject(error);
  }
);

// Ağ bağlantısı durumunu izleme
window.addEventListener("online", () => {
  console.log("Network is back online, refreshing API state...");
  // Burada sayfa yenilemesi veya durum güncelleme kodu eklenebilir
});

export default axiosInstance;
