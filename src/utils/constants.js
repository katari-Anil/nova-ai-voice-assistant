export const NOVA_NAME = 'NOVA'

export const AI_STATES = {
  IDLE: 'idle',
  LISTENING: 'listening',
  THINKING: 'thinking',
  SPEAKING: 'speaking',
}

export const STORAGE_KEYS = {
  CHAT_HISTORY: 'nova_chat_history',
  SETTINGS: 'nova_settings',
}

export const DEFAULT_SETTINGS = {
  voiceEnabled: true,
  rate: 1,
  pitch: 1.1,
  volume: 1,
  continuousListening: false,
  voiceName: '',
}

export const QUICK_COMMANDS = [
  'What time is it?',
  "What's today's date?",
  'Tell me a joke',
  'Motivate me',
  'Open YouTube',
  'What can you do?',
  '45 plus 19',
  'Help',
]

export const SUPPORTED_COMMANDS = [
  { category: 'Time & Date', examples: ['what time is it', "what's today's date", 'what day is today'] },
  { category: 'Calculator', examples: ['45 plus 19', '100 divided by 5', '200 minus 30', '50 times 4'] },
  { category: 'Jokes', examples: ['tell me a joke', 'make me laugh'] },
  { category: 'Motivation', examples: ['motivate me', 'inspire me'] },
  { category: 'Greetings', examples: ['hello', 'good morning', 'good evening'] },
  { category: 'Web', examples: ['open google', 'open youtube', 'open github', 'open linkedin'] },
  { category: 'Weather', examples: ['what is the weather', 'weather in london'] },
  { category: 'System', examples: ['help', 'about nova', 'what can you do', 'clear chat'] },
]

export const ACTIVITY_TYPES = {
  VOICE_ON: 'Voice activated',
  VOICE_OFF: 'Listening stopped',
  LISTEN_START: 'Listening started',
  COMMAND: 'Command executed',
  RESPONSE: 'Response generated',
  WEBSITE: 'Website opened',
  WEATHER: 'Weather requested',
  CHAT_CLEARED: 'Chat cleared',
}
