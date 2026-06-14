import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_STEPS = [
  'AI Core Initializing',
  'Scanning Neural Matrix',
  'Voice Engine Loading',
  'Quantum Systems Online',
  'Command Center Ready',
]

export default function SplashScreen({ onComplete }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < BOOT_STEPS.length - 1 ? prev + 1 : prev))
    }, 650)

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 2, 100)
        if (next >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => setExiting(true), 400)
          setTimeout(() => onComplete?.(), 1100)
        }
        return next
      })
    }, 60)

    return () => {
      clearInterval(stepInterval)
      clearInterval(progressInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-space-black overflow-hidden"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute w-[60vmin] h-[60vmin] rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(59,130,246,0.12) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Logo reveal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="relative mb-6"
          >
            <motion.div
              className="w-32 h-32 rounded-full border-2 border-neon-cyan/60"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{ boxShadow: '0 0 30px rgba(34,211,238,0.5)' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-neon-purple/50"
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-6 h-6 rounded-full bg-white shadow-glow" />
            </motion.div>
          </motion.div>

          {/* NOVA title */}
          <motion.h1
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-display text-5xl md:text-7xl font-black text-gradient mb-2"
          >
            NOVA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-display text-xs md:text-sm tracking-[0.4em] text-neon-cyan/70 mb-10 uppercase"
          >
            AI Voice Command Center
          </motion.p>

          {/* Boot sequence steps */}
          <div className="h-6 mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={stepIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-display text-xs md:text-sm tracking-widest text-electric-light uppercase"
              >
                {BOOT_STEPS[stepIndex]}...
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Loading bar */}
          <div className="w-64 md:w-96 h-1.5 rounded-full bg-space-panel border border-electric/30 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-electric via-neon-cyan to-neon-purple"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p className="mt-2 font-display text-xs text-white/40 tracking-widest">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
