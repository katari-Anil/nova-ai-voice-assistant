import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import SplashScreen from './components/SplashScreen.jsx'
import StarfieldBackground from './components/StarfieldBackground.jsx'
import CommandCenter from './components/CommandCenter.jsx'
import { useSpeechRecognition } from './hooks/useSpeechRecognition.js'
import { useSpeechSynthesis } from './hooks/useSpeechSynthesis.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { getAIResponse } from './services/aiService.js'
import { AI_STATES, STORAGE_KEYS, DEFAULT_SETTINGS, ACTIVITY_TYPES } from './utils/constants.js'
import { generateId } from './utils/helpers.js'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [aiState, setAiState] = useState(AI_STATES.IDLE)
  const [messages, setMessages] = useLocalStorage(STORAGE_KEYS.CHAT_HISTORY, [])
  const [inputValue, setInputValue] = useState('')
  const [activities, setActivities] = useState([])
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)

  const { speak, cancel, speaking, isSupported: synthSupported } = useSpeechSynthesis()

  const logActivity = useCallback((text) => {
    setActivities((prev) => [
      { id: generateId(), text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) },
      ...prev,
    ].slice(0, 30))
  }, [])

  const handleSend = useCallback(
    async (text) => {
      if (!text.trim()) return

      const userMessage = { id: generateId(), sender: 'user', text: text.trim(), timestamp: Date.now() }
      setMessages((prev) => [...prev, userMessage])
      setInputValue('')
      logActivity(`${ACTIVITY_TYPES.COMMAND}: "${text.trim().slice(0, 40)}"`)
      setAiState(AI_STATES.THINKING)

      const history = [...messages, userMessage]
      const result = await getAIResponse(text.trim(), history)

      const novaMessage = { id: generateId(), sender: 'nova', text: result.text, timestamp: Date.now() }
      setMessages((prev) => [...prev, novaMessage])
      logActivity(ACTIVITY_TYPES.RESPONSE)

      if (result.action === 'clear') {
        setMessages([])
      }
      if (result.action === 'website') {
        logActivity(ACTIVITY_TYPES.WEBSITE)
      }
      if (result.action === 'weather') {
        logActivity(ACTIVITY_TYPES.WEATHER)
      }

      if (settings.voiceEnabled && synthSupported) {
        setAiState(AI_STATES.SPEAKING)
        speak(result.text, {
          rate: settings.rate,
          pitch: settings.pitch,
          volume: settings.volume,
          voiceName: settings.voiceName,
        })
      } else {
        setAiState(AI_STATES.IDLE)
      }
    },
    [messages, settings, speak, synthSupported, setMessages, logActivity],
  )

  const handleSpeechResult = useCallback(
    (text) => {
      handleSend(text)
    },
    [handleSend],
  )

  const {
    isListening,
    interimTranscript,
    start: startListening,
    stop: stopListening,
    isSupported: voiceSupported,
  } = useSpeechRecognition({ onResult: handleSpeechResult, continuous: settings.continuousListening })

  useEffect(() => {
    if (!speaking && aiState === AI_STATES.SPEAKING) {
      setAiState(AI_STATES.IDLE)
    }
  }, [speaking, aiState])

  useEffect(() => {
    if (isListening) {
      setAiState(AI_STATES.LISTENING)
    } else if (aiState === AI_STATES.LISTENING) {
      setAiState(AI_STATES.IDLE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening])

  const handleToggleListening = useCallback(() => {
    if (isListening) {
      stopListening()
      logActivity(ACTIVITY_TYPES.VOICE_OFF)
    } else {
      cancel()
      startListening()
      logActivity(ACTIVITY_TYPES.LISTEN_START)
    }
  }, [isListening, startListening, stopListening, cancel, logActivity])

  const handleToggleVoice = useCallback(() => {
    setSettings((prev) => ({ ...prev, voiceEnabled: !prev.voiceEnabled }))
    if (settings.voiceEnabled) cancel()
  }, [setSettings, settings.voiceEnabled, cancel])

  const handleToggleContinuous = useCallback(() => {
    setSettings((prev) => ({ ...prev, continuousListening: !prev.continuousListening }))
  }, [setSettings])

  const handleClearChat = useCallback(() => {
    setMessages([])
    logActivity(ACTIVITY_TYPES.CHAT_CLEARED)
  }, [setMessages, logActivity])

  const handleUpdateSettings = useCallback(
    (partial) => {
      setSettings((prev) => ({ ...prev, ...partial }))
    },
    [setSettings],
  )

  if (!booted) {
    return <SplashScreen onComplete={() => setBooted(true)} />
  }

  return (
    <>
      <StarfieldBackground />
      <AnimatePresence>
        <CommandCenter
          aiState={aiState}
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSend={handleSend}
          onClear={handleClearChat}
          activities={activities}
          controls={{
            isListening,
            onToggleListening: handleToggleListening,
            onToggleVoice: handleToggleVoice,
            onToggleContinuous: handleToggleContinuous,
            onOpenSettings: () => setShowSettings(true),
          }}
          settings={settings}
          showSettings={showSettings}
          onCloseSettings={() => setShowSettings(false)}
          onUpdateSettings={handleUpdateSettings}
          voiceSupported={voiceSupported}
          synthSupported={synthSupported}
          liveTranscript={interimTranscript}
        />
      </AnimatePresence>
    </>
  )
}
