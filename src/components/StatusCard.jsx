import { motion } from 'framer-motion'

export default function StatusCard({ label, value, active = true, icon }) {
  return (
    <div className="flex items-center justify-between py-2 px-1 border-b border-white/5 last:border-b-0">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs md:text-sm text-white/70 font-body">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs md:text-sm font-display tracking-wider text-white/90">{value}</span>
        <motion.span
          className={`w-2 h-2 rounded-full ${active ? 'bg-neon-cyan' : 'bg-white/20'}`}
          style={active ? { boxShadow: '0 0 8px rgba(34,211,238,0.8)' } : {}}
          animate={active ? { opacity: [0.4, 1, 0.4] } : {}}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
