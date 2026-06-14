import { motion } from 'framer-motion'
import { AI_STATES } from '../utils/constants.js'

const STATE_CONFIG = {
  [AI_STATES.IDLE]: {
    ringColor: 'border-electric/40',
    coreColor: 'from-electric to-neon-cyan',
    glow: '0 0 40px rgba(59,130,246,0.4)',
    label: 'Idle',
  },
  [AI_STATES.LISTENING]: {
    ringColor: 'border-neon-cyan/70',
    coreColor: 'from-neon-cyan to-electric-light',
    glow: '0 0 60px rgba(34,211,238,0.6)',
    label: 'Listening',
  },
  [AI_STATES.THINKING]: {
    ringColor: 'border-neon-purple/70',
    coreColor: 'from-neon-purple to-electric',
    glow: '0 0 60px rgba(168,85,247,0.6)',
    label: 'Thinking',
  },
  [AI_STATES.SPEAKING]: {
    ringColor: 'border-neon-cyan/80',
    coreColor: 'from-white via-neon-cyan to-electric',
    glow: '0 0 80px rgba(34,211,238,0.8)',
    label: 'Speaking',
  },
}

export default function AICoreOrb({ state = AI_STATES.IDLE, size = 280 }) {
  const config = STATE_CONFIG[state] || STATE_CONFIG[AI_STATES.IDLE]

  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`NOVA AI core, currently ${config.label}`}
    >
      {/* Particle halo */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = size * 0.48
        return (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-neon-cyan"
            style={{
              left: '50%',
              top: '50%',
              boxShadow: '0 0 8px rgba(34,211,238,0.8)',
            }}
            animate={{
              x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI * 2) * radius],
              y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI * 2) * radius],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: state === AI_STATES.THINKING ? 6 : 14,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      })}

      {/* Outer ring */}
      <motion.div
        className={`absolute rounded-full border-2 ${config.ringColor}`}
        style={{ width: '100%', height: '100%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Middle ring */}
      <motion.div
        className={`absolute rounded-full border ${config.ringColor}`}
        style={{ width: '78%', height: '78%' }}
        animate={{ rotate: -360 }}
        transition={{
          duration: state === AI_STATES.THINKING ? 5 : 14,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner dashed ring */}
      <motion.div
        className={`absolute rounded-full border border-dashed ${config.ringColor}`}
        style={{ width: '60%', height: '60%' }}
        animate={{ rotate: 360 }}
        transition={{
          duration: state === AI_STATES.THINKING ? 4 : 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Energy pulse */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: '46%',
          height: '46%',
          background: `radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)`,
        }}
        animate={{
          scale: state === AI_STATES.SPEAKING ? [1, 1.5, 1] : [1, 1.2, 1],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: state === AI_STATES.SPEAKING ? 0.6 : 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core */}
      <motion.div
        className={`absolute rounded-full bg-gradient-to-br ${config.coreColor}`}
        style={{ width: '34%', height: '34%', boxShadow: config.glow }}
        animate={{
          scale:
            state === AI_STATES.SPEAKING
              ? [1, 1.18, 0.95, 1.1, 1]
              : [1, 1.06, 1],
        }}
        transition={{
          duration: state === AI_STATES.SPEAKING ? 0.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* State label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-display text-[10px] md:text-xs tracking-[0.3em] uppercase text-neon-cyan/70 whitespace-nowrap">
        {config.label}
      </div>
    </div>
  )
}
