import { motion } from 'framer-motion'
import { AI_STATES } from '../utils/constants.js'

export default function VoiceVisualizer({ state = AI_STATES.IDLE, barCount = 24 }) {
  const isActive = state === AI_STATES.LISTENING || state === AI_STATES.SPEAKING
  const color =
    state === AI_STATES.LISTENING
      ? '#22d3ee'
      : state === AI_STATES.THINKING
      ? '#a855f7'
      : state === AI_STATES.SPEAKING
      ? '#60a5fa'
      : '#3b82f6'

  return (
    <div className="flex items-center justify-center gap-1 h-10 w-full" aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => {
        const base = 0.2 + (Math.sin(i / 2) + 1) * 0.15
        return (
          <motion.div
            key={i}
            className="w-1 md:w-1.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 6px ${color}`,
              height: '100%',
            }}
            animate={
              isActive
                ? { scaleY: [base, 1, base * 0.6, 0.9, base] }
                : state === AI_STATES.THINKING
                ? { scaleY: [0.3, 0.6, 0.3] }
                : { scaleY: 0.15 }
            }
            transition={{
              duration: isActive ? 0.6 + (i % 5) * 0.08 : 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.03,
            }}
          />
        )
      })}
    </div>
  )
}
