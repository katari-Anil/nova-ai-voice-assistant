import { AnimatePresence, motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function ActivityFeed({ activities }) {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin space-y-2 max-h-48 md:max-h-none pr-1">
      <AnimatePresence initial={false}>
        {activities.length === 0 && (
          <p className="text-xs text-white/30 text-center py-4">No activity yet.</p>
        )}
        {activities.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-start gap-2 text-xs text-white/60 border-l-2 border-neon-cyan/30 pl-2 py-1"
          >
            <Activity size={12} className="text-neon-cyan mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white/80">{item.text}</p>
              <p className="text-[10px] text-white/30 font-display tracking-wider">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
