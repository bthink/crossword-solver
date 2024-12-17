export const config = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  tesseractLang: 'eng',
  maxImageSize: 10 * 1024 * 1024 // 10MB
} 