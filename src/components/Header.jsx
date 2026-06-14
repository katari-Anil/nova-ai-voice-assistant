import { motion } from 'framer-motion'
import { Radio } from 'lucide-react'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel flex items-center justify-between px-4 md:px-6 py-3 mb-4"
    >
      <div className="flex items-center gap-3">
        <motion.div
          className="w-9 h-9 rounded-full border-2 border-neon-cyan/60 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ boxShadow: '0 0 16px rgba(34,211,238,0.5)' }}
        >
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-neon-cyan to-electric" />
        </motion.div>
        <div>
          <h1 className="font-display text-lg md:text-2xl font-bold text-gradient tracking-[0.2em]">
            NOVA
          </h1>
          <p className="hidden md:block text-[10px] text-white/40 tracking-[0.3em] uppercase -mt-1">
            AI Voice Command Center
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-space-panel/60 border border-neon-cyan/20">
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <Radio size={14} className="text-neon-cyan" />
        </motion.span>
        <span className="font-display text-[10px] md:text-xs tracking-widest uppercase text-neon-cyan/80">
          Online
        </span>
      </div>
    </motion.header>
  )
}
