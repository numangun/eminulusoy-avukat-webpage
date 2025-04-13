/**
 * Türkçe karakterleri İngilizce karakterlere çevirir ve URL dostu bir slug oluşturur.
 * @param {string} text - Slug'a dönüştürülecek metin
 * @returns {string} - URL dostu slug
 */
export const slugify = (text) => {
  if (!text) return "";

  // Türkçe karakterleri İngilizce karakterlere çevir
  const trMap = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  // Türkçe karakterleri değiştir
  let textWithEnglishChars = text;

  for (const [trChar, enChar] of Object.entries(trMap)) {
    textWithEnglishChars = textWithEnglishChars.split(trChar).join(enChar);
  }

  // Küçük harfe çevir
  const lowercase = textWithEnglishChars.toLowerCase();

  // Alfanumerik olmayan karakterleri tire ile değiştir
  const alphanumeric = lowercase.replace(/[^a-z0-9]+/g, "-");

  // Baştaki ve sondaki tireleri kaldır
  const trimmed = alphanumeric.replace(/^-+|-+$/g, "");

  return trimmed;
};

/**
 * Verilen başlıktan doğrudan URL dostu bir slug oluşturur
 * @param {string} title - Blog başlığı
 * @returns {string} - Düzgün slug
 */
export const getTitleSlug = (title) => {
  if (!title) return "";
  return slugify(title);
};

/**
 * Backend'den gelen bir slug'ı temizler ve düzgün bir slug oluşturur
 * @param {string} title - Blog başlığı (zorunlu)
 * @returns {string} - Düzgün slug
 */
export const getBlogSlug = (title) => {
  if (!title) return "";
  return slugify(title);
};
