import { API_CONFIG, getActiveProvider, NOVA_SYSTEM_PROMPT } from '../config/apiConfig.js'
import { processCommand } from './commandProcessor.js'

const LOCAL_RESPONSES = [
  "I'm currently operating in Local Intelligence Mode, Commander. I can still help with time, dates, calculations, jokes, motivation, weather, and opening websites.",
  "My deep-space link to external AI cores isn't configured, but my onboard systems are fully operational. Try asking me to do a calculation or tell a joke.",
  "Local AI Mode engaged. Ask me about the time, date, weather, or say 'help' to see what I can do.",
  "I don't have a connection to an external language model right now, but I'm still here and ready to assist with onboard functions.",
]

function pickLocalFallback() {
  return LOCAL_RESPONSES[Math.floor(Math.random() * LOCAL_RESPONSES.length)]
}

async function callGemini(message, history) {
  const { key, endpoint } = API_CONFIG.gemini
  const contents = [
    ...history.slice(-6).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    })),
    { role: 'user', parts: [{ text: message }] },
  ]

  const response = await fetch(`${endpoint}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: NOVA_SYSTEM_PROMPT }] },
    }),
  })

  if (!response.ok) throw new Error(`Gemini error ${response.status}`)
  const data = await response.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text || pickLocalFallback()
}

async function callOpenAICompatible(provider, message, history) {
  const { key, endpoint, model } = API_CONFIG[provider]
  const messages = [
    { role: 'system', content: NOVA_SYSTEM_PROMPT },
    ...history.slice(-6).map((m) => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    })),
    { role: 'user', content: message },
  ]

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, messages, max_tokens: 200 }),
  })

  if (!response.ok) throw new Error(`${provider} error ${response.status}`)
  const data = await response.json()
  return data.choices?.[0]?.message?.content || pickLocalFallback()
}

async function callHuggingFace(message) {
  const { key, endpoint } = API_CONFIG.huggingface
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ inputs: `${NOVA_SYSTEM_PROMPT}\nUser: ${message}\nNOVA:` }),
  })

  if (!response.ok) throw new Error(`HuggingFace error ${response.status}`)
  const data = await response.json()
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text.split('NOVA:').pop().trim()
  }
  return pickLocalFallback()
}

export async function getAIResponse(message, history = []) {
  // First, try local command processing for deterministic commands
  const local = await processCommand(message)
  if (local.text) {
    return { text: local.text, action: local.action, provider: 'local-command' }
  }

  const provider = getActiveProvider()

  try {
    let text
    switch (provider) {
      case 'gemini':
        text = await callGemini(message, history)
        break
      case 'openrouter':
        text = await callOpenAICompatible('openrouter', message, history)
        break
      case 'groq':
        text = await callOpenAICompatible('groq', message, history)
        break
      case 'huggingface':
        text = await callHuggingFace(message)
        break
      default:
        text = pickLocalFallback()
    }
    return { text, action: null, provider }
  } catch (error) {
    return {
      text: `I encountered an issue reaching my AI core (${error.message}). Falling back to local systems: ${pickLocalFallback()}`,
      action: null,
      provider: 'local-fallback',
    }
  }
}

export { getActiveProvider }
