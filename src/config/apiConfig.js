export const API_CONFIG = {
  gemini: {
    key: import.meta.env.VITE_GEMINI_API_KEY || '',
    endpoint:
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
  },
  openrouter: {
    key: import.meta.env.VITE_OPENROUTER_API_KEY || '',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    model: 'meta-llama/llama-3.1-8b-instruct:free',
  },
  groq: {
    key: import.meta.env.VITE_GROQ_API_KEY || '',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama-3.1-8b-instant',
  },
  huggingface: {
    key: import.meta.env.VITE_HUGGINGFACE_API_KEY || '',
    endpoint: 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta',
  },
  openweather: {
    key: import.meta.env.VITE_OPENWEATHER_API_KEY || '',
    endpoint: 'https://api.openweathermap.org/data/2.5/weather',
  },
}

export function getActiveProvider() {
  if (API_CONFIG.gemini.key) return 'gemini'
  if (API_CONFIG.openrouter.key) return 'openrouter'
  if (API_CONFIG.groq.key) return 'groq'
  if (API_CONFIG.huggingface.key) return 'huggingface'
  return 'local'
}

export const NOVA_SYSTEM_PROMPT = `You are NOVA, an advanced AI voice assistant inspired by futuristic spacecraft operating systems.
You are warm, intelligent, professional, and slightly witty. You speak in concise sentences,
ideal for being read aloud. You refer to the user as "Commander" occasionally. Keep responses
under 60 words unless asked for detail.`
