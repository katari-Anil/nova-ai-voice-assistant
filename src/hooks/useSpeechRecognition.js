import { useState, useRef, useCallback, useEffect } from 'react'

const SpeechRecognitionAPI =
  typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null

export function useSpeechRecognition({ onResult, continuous = false } = {}) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState(null)
  const [isSupported] = useState(!!SpeechRecognitionAPI)
  const recognitionRef = useRef(null)
  const continuousRef = useRef(continuous)

  useEffect(() => {
    continuousRef.current = continuous
  }, [continuous])

  useEffect(() => {
    if (!SpeechRecognitionAPI) return undefined

    const recognition = new SpeechRecognitionAPI()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      let finalText = ''
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const res = event.results[i]
        if (res.isFinal) {
          finalText += res[0].transcript
        } else {
          interim += res[0].transcript
        }
      }
      if (interim) setInterimTranscript(interim)
      if (finalText) {
        setTranscript(finalText)
        setInterimTranscript('')
        onResult?.(finalText.trim())
      }
    }

    recognition.onerror = (event) => {
      setError(event.error)
      setIsListening(false)
    }

    recognition.onend = () => {
      if (continuousRef.current) {
        try {
          recognition.start()
        } catch {
          setIsListening(false)
        }
      } else {
        setIsListening(false)
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.onresult = null
      recognition.onerror = null
      recognition.onend = null
      try {
        recognition.stop()
      } catch {
        /* noop */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onResult])

  const start = useCallback(() => {
    if (!recognitionRef.current) {
      setError('not-supported')
      return
    }
    try {
      recognition_set_continuous(recognitionRef.current, continuousRef.current)
      recognitionRef.current.start()
      setIsListening(true)
      setError(null)
    } catch {
      /* already started */
    }
  }, [])

  const stop = useCallback(() => {
    if (!recognitionRef.current) return
    continuousRef.current = false
    try {
      recognitionRef.current.stop()
    } catch {
      /* noop */
    }
    setIsListening(false)
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
  }, [])

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    start,
    stop,
    resetTranscript,
  }
}

function recognition_set_continuous(recognition, continuous) {
  recognition.continuous = !!continuous
}
