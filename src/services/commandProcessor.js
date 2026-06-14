import { formatTime, formatDate, formatDay, openInNewTab, SITE_MAP } from '../utils/helpers.js'
import { getRandomJoke } from '../utils/jokes.js'
import { getRandomQuote } from '../utils/quotes.js'
import { getWeather } from './weatherService.js'
import { SUPPORTED_COMMANDS } from '../utils/constants.js'

const CALC_WORDS = {
  plus: '+',
  added: '+',
  add: '+',
  minus: '-',
  subtract: '-',
  subtracted: '-',
  times: '*',
  multiplied: '*',
  multiply: '*',
  'divided by': '/',
  divide: '/',
  divided: '/',
  'x': '*',
}

function tryCalculator(text) {
  let normalized = text.toLowerCase()
  for (const [word, symbol] of Object.entries(CALC_WORDS)) {
    normalized = normalized.replaceAll(word, ` ${symbol} `)
  }
  normalized = normalized.replace(/[^0-9+\-*/.\s]/g, ' ')
  const match = normalized.match(/(-?\d+(\.\d+)?)\s*([+\-*/])\s*(-?\d+(\.\d+)?)/)
  if (!match) return null

  const a = parseFloat(match[1])
  const op = match[3]
  const b = parseFloat(match[4])
  let result
  switch (op) {
    case '+':
      result = a + b
      break
    case '-':
      result = a - b
      break
    case '*':
      result = a * b
      break
    case '/':
      if (b === 0) return { text: "I can't divide by zero, Commander — that would create a singularity." }
      result = a / b
      break
    default:
      return null
  }

  const rounded = Math.round(result * 10000) / 10000
  return { text: `${a} ${op} ${b} equals ${rounded}.` }
}

function matchesAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase))
}

export async function processCommand(rawText) {
  const text = rawText.trim().toLowerCase()

  if (!text) {
    return { text: "I didn't catch that, Commander. Could you repeat it?", action: null }
  }

  // Greetings
  if (matchesAny(text, ['good morning'])) {
    return { text: 'Good morning, Commander. All systems are nominal and ready for the day.', action: null }
  }
  if (matchesAny(text, ['good evening'])) {
    return { text: 'Good evening, Commander. Hope your day went well. How can I assist?', action: null }
  }
  if (matchesAny(text, ['good night'])) {
    return { text: 'Goodnight, Commander. I will keep watch while systems idle.', action: null }
  }
  if (matchesAny(text, ['hello', 'hi nova', 'hey nova', 'hi there', "what's up"]) || text === 'hi' || text === 'hey') {
    return { text: 'Hello, Commander. NOVA online and ready to assist. What do you need?', action: null }
  }

  // Time
  if (matchesAny(text, ['what time', 'current time', 'tell me the time'])) {
    return { text: `The current time is ${formatTime()}.`, action: null }
  }

  // Date
  if (matchesAny(text, ["today's date", 'what is the date', 'what date', 'todays date'])) {
    return { text: `Today's date is ${formatDate()}.`, action: null }
  }

  // Day
  if (matchesAny(text, ['what day', 'which day', 'day is it', 'day today'])) {
    return { text: `Today is ${formatDay()}.`, action: null }
  }

  // Jokes
  if (matchesAny(text, ['joke', 'make me laugh', 'something funny'])) {
    return { text: getRandomJoke(), action: null }
  }

  // Motivation
  if (matchesAny(text, ['motivate', 'inspire', 'motivation', 'inspiration'])) {
    return { text: getRandomQuote(), action: null }
  }

  // Calculator
  const calc = tryCalculator(text)
  if (calc) return { text: calc.text, action: null }

  // Open websites
  if (matchesAny(text, ['open google'])) {
    openInNewTab(SITE_MAP.google)
    return { text: 'Opening Google for you, Commander.', action: 'website' }
  }
  if (matchesAny(text, ['open youtube'])) {
    openInNewTab(SITE_MAP.youtube)
    return { text: 'Launching YouTube now.', action: 'website' }
  }
  if (matchesAny(text, ['open github'])) {
    openInNewTab(SITE_MAP.github)
    return { text: 'Opening GitHub, Commander.', action: 'website' }
  }
  if (matchesAny(text, ['open linkedin'])) {
    openInNewTab(SITE_MAP.linkedin)
    return { text: 'Opening LinkedIn now.', action: 'website' }
  }
  if (matchesAny(text, ['open gmail'])) {
    openInNewTab(SITE_MAP.gmail)
    return { text: 'Opening Gmail, Commander.', action: 'website' }
  }

  // Weather
  if (matchesAny(text, ['weather'])) {
    let city = 'London'
    const inMatch = text.match(/weather\s+(?:in|for|at)\s+([a-zA-Z\s]+)/)
    if (inMatch) city = inMatch[1].trim()
    const weather = await getWeather(city)
    return { text: weather.message, action: 'weather' }
  }

  // Clear chat
  if (matchesAny(text, ['clear chat', 'clear the chat', 'clear conversation'])) {
    return { text: 'Clearing our conversation log now, Commander.', action: 'clear' }
  }

  // Help
  if (matchesAny(text, ['help', 'what commands', 'list commands'])) {
    const lines = SUPPORTED_COMMANDS.map((c) => `${c.category}: ${c.examples[0]}`).join('. ')
    return { text: `Here is what I can do. ${lines}.`, action: 'help' }
  }

  // About
  if (matchesAny(text, ['about nova', 'who are you', 'what are you'])) {
    return {
      text: "I am NOVA — a next-generation AI voice command center, built to assist with information, calculations, the web, and conversation. Think of me as your onboard intelligence system.",
      action: null,
    }
  }

  // Capabilities
  if (matchesAny(text, ['what can you do', 'your capabilities', 'your features'])) {
    return {
      text: 'I can tell time and date, perform calculations, share jokes and motivation, open websites, check weather, and hold a conversation. Just ask, Commander.',
      action: null,
    }
  }

  return { text: null, action: null }
}
