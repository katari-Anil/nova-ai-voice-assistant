import { motion } from 'framer-motion'

export default function GlassPanel({ children, className = '', title, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`glass-panel p-4 ${className}`}
    >
      {title && (
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-electric/20">
          {icon}
          <h3 className="font-display text-xs tracking-widest uppercase text-neon-cyan/80">
            {title}
          </h3>
        </div>
      )}
      {children}
    </motion.div>
  )
}
