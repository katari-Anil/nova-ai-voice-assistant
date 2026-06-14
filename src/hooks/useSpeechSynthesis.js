import { useState, useEffect, useCallback, useRef } from 'react'

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState([])
  const [speaking, setSpeaking] = useState(false)
  const [isSupported] = useState(typeof window !== 'undefined' && 'speechSynthesis' in window)
  const utteranceRef = useRef(null)

  useEffect(() => {
    if (!isSupported) return undefined

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices()
      if (available.length) setVoices(available)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [isSupported])

  const pickFemaleVoice = useCallback(
    (preferredName) => {
      if (!voices.length) return null
      if (preferredName) {
        const exact = voices.find((v) => v.name === preferredName)
        if (exact) return exact
      }
      const femaleHints = ['female', 'samantha', 'victoria', 'zira', 'google us english', 'karen', 'tessa', 'moira', 'fiona']
      const byHint = voices.find((v) => femaleHints.some((h) => v.name.toLowerCase().includes(h)))
      if (byHint) return byHint
      const enVoice = voices.find((v) => v.lang.startsWith('en'))
      return enVoice || voices[0]
    },
    [voices],
  )

  const speak = useCallback(
    (text, { rate = 1, pitch = 1.1, volume = 1, voiceName = '' } = {}) => {
      if (!isSupported || !text) return
      window.speechSynthesis.cancel()

      const utterance = new SpeechSynthesisUtterance(text)
      const voice = pickFemaleVoice(voiceName)
      if (voice) utterance.voice = voice
      utterance.rate = rate
      utterance.pitch = pitch
      utterance.volume = volume

      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => setSpeaking(false)
      utterance.onerror = () => setSpeaking(false)

      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
    },
    [isSupported, pickFemaleVoice],
  )

  const cancel = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [isSupported])

  return { voices, speak, cancel, speaking, isSupported, pickFemaleVoice }
}
