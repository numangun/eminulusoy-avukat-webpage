import { useMemo } from 'react';

/**
 * Blog içeriğini formatlayan özel hook
 * @param {string} content - Ham blog içeriği
 * @returns {string} - HTML formatlanmış blog içeriği
 */
const useFormatContent = (content) => {
  return useMemo(() => {
    // İçerik boşsa veya string değilse boş string döndür
    if (!content || typeof content !== 'string') return '';
    
    // İçerik zaten HTML içeriyorsa olduğu gibi döndür
    if (content.includes('<p>') || content.includes('<br>')) {
      return content;
    }
    
    // Paragrafları ve satır sonlarını dönüştür
    let formattedContent = '';
    
    // Paragrafları işle (boş satırla ayrılmış)
    const paragraphs = content.split(/\n\s*\n/);
    
    formattedContent = paragraphs
      .filter(p => p.trim() !== '') // Boş paragrafları atla
      .map(p => {
        // Satır başlarını <br> ile değiştir
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('\n');
    
    return formattedContent;
  }, [content]);
};

export default useFormatContent;